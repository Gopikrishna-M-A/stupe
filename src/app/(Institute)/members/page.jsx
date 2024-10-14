"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { useUserContext } from '@/contexts/UserContext';

const CustomersPage = () => {
  const { instituteData } = useUserContext();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/members?instituteId=${instituteData._id}`);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        title: "Error",
        description: "Failed to fetch members. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Members</h1>
      
      <div className="mb-6 flex gap-4">
        <Input 
          placeholder="Search members..." 
          className="max-w-sm" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2 hidden md:table-cell">Email</th>
                  <th className="text-left p-2">Phone Number</th>
                  <th className="text-left p-2 hidden md:table-cell">Group</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member._id} className="border-b">
                    <td className="p-2">{member.name}</td>
                    <td className="p-2 hidden md:table-cell">{member.email}</td>
                    <td className="p-2">{member.phoneNumber}</td>
                    <td className="p-2 hidden md:table-cell">
                      {member.groupId ? (
                          <div>{member.groupId.groupName}</div>
                      ) : 'No Group'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;