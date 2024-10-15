"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useUserContext } from '@/contexts/UserContext';
import { Loader2 } from 'lucide-react';

export default function GroupsListPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [groups, setGroups] = useState([])
  const [newGroup, setNewGroup] = useState({ groupName: "", description: "" })
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { instituteData } = useUserContext();

  useEffect(() => {
    fetchGroups()
  }, [instituteData])

  const fetchGroups = async () => {
    if (!instituteData?._id) return;
    setIsLoading(true)
    try {
      const response = await axios.get("/api/groups", {
        params: { instituteId: instituteData._id }
      })
      setGroups(response.data)
    } catch (error) {
      console.error("Error fetching groups:", error)
      toast({
        title: "Error",
        description: "Failed to fetch groups. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddGroup = async () => {
    try {
      const groupData = {
        ...newGroup,
        institute: instituteData._id,
      }
      const response = await axios.post("/api/groups", groupData)
      setGroups([...groups, response.data])
      setNewGroup({ groupName: "", description: "" })
      setIsDialogOpen(false)
      toast({
        title: "Success",
        description: "New group added successfully.",
      })
    } catch (error) {
      console.error("Error adding group:", error)
      toast({
        title: "Error",
        description: "Failed to add new group. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className='w-full mx-auto p-6 h-full overflow-y-scroll'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Groups</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='groupName' className='text-right'>
                  Group Name
                </Label>
                <Input
                  id='groupName'
                  value={newGroup.groupName}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, groupName: e.target.value })
                  }
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-right'>
                  Description
                </Label>
                <Input
                  id='description'
                  value={newGroup.description}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, description: e.target.value })
                  }
                  className='col-span-3'
                />
              </div>
            </div>
            <Button onClick={handleAddGroup}>Add Group</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {groups.map((group) => (
          <Card
            key={group._id}
            className='cursor-pointer hover:shadow-lg transition-shadow'
            onClick={() => router.push(`/groups/${group._id}`)}>
            <CardHeader>
              <CardTitle>{group.groupName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600'>{group.description}</p>
              <p className='mt-2'>Members: {group.memberCount}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {groups.length === 0 && (
        <p className='text-center text-gray-500 mt-8'>
          No groups found. Create a new group to get started!
        </p>
      )}
    </div>
  )
}