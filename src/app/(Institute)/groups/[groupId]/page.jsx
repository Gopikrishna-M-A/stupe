'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BookUser, CircleX, Ellipsis, Loader2, Mail, User, UserPlus } from "lucide-react";

export default function GroupPage({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const { groupId } = params;
  const [groupData, setGroupData] = useState(null);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMember, setNewMember] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    feeAmount: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSendingReminders, setIsSendingReminders] = useState(false);

  useEffect(() => {
    fetchGroupData();
  }, [groupId]);

  const fetchGroupData = async () => {
    setIsLoading(true);
    try {
      const [groupResponse, membersResponse] = await Promise.all([
        axios.get(`/api/groups?id=${groupId}`),
        axios.get(`/api/members?groupId=${groupId}`),
      ]);

      setGroupData(groupResponse.data);
      setMembers(membersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch group data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async () => {
    try {
      const response = await axios.post(`/api/members`, {
        ...newMember,
        groupId,
      });
      setMembers([...members, response.data]);
      setNewMember({ name: "", phoneNumber: "", email: "", feeAmount: "" });
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "New member added successfully.",
      });
    } catch (error) {
      console.error("Error adding member:", error);
      toast({
        title: "Error",
        description: "Failed to add new member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveMember = async (membershipId) => {
    try {
      await axios.delete(`/api/members?id=${membershipId}`);
      setMembers(
        members.filter((member) => member.membership._id !== membershipId)
      );
      toast({
        title: "Success",
        description: "Member removed successfully.",
      });
    } catch (error) {
      console.error("Error removing member:", error);
      toast({
        title: "Error",
        description: "Failed to remove member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendFeeReminders = async () => {
    setIsSendingReminders(true);
    try {
      const response = await axios.post("/api/send-fee-reminder", { groupId });
      toast({
        title: "Success",
        description: `Reminders sent to ${response.data.remindersSent.length} members.`,
      });
    } catch (error) {
      console.error("Error sending reminders:", error);
      toast({
        title: "Error",
        description: "Failed to send reminders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingReminders(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!groupData) {
    return (
      <div className="max-w-6xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Group not found</h1>
        <Button variant="outline" onClick={() => router.push("/groups")}>
          Back to Groups
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{groupData.groupName}</h1>
      <p className="text-gray-600 mb-6">{groupData.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Students" value={members.length} />
        <StatCard
          title="Collected Fees"
          value={`₹${groupData.collectedFees.toFixed(2)}`}
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Students</h2>
          <div className="space-x-2">
            <AddMemberDialog
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              newMember={newMember}
              setNewMember={setNewMember}
              onAddMember={handleAddMember}
            />
            <Button
              onClick={handleSendFeeReminders}
              disabled={isSendingReminders}
            >
              {isSendingReminders ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Mail className="h-4 w-4 md:mr-2" />
              )}
              <p className="hidden md:block">Send Fee Reminders</p>
            </Button>
          </div>
        </div>
        <StudentsTable students={members} onRemoveMember={handleRemoveMember} />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/groups")}>
          Back to Groups
        </Button>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function AddMemberDialog({
  isOpen,
  onOpenChange,
  newMember,
  setNewMember,
  onAddMember,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={() => onOpenChange(true)}>
        <UserPlus className="h-4 w-4 md:mr-2" />
         <p className="hidden md:block">Add Member</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              value={newMember.phoneNumber}
              onChange={(e) =>
                setNewMember({ ...newMember, phoneNumber: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="feeAmount" className="text-right">
              Fee Amount
            </Label>
            <Input
              id="feeAmount"
              type="number"
              value={newMember.feeAmount}
              onChange={(e) =>
                setNewMember({ ...newMember, feeAmount: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={onAddMember}>Add Member</Button>
      </DialogContent>
    </Dialog>
  );
}

function StudentsTable({ students, onRemoveMember }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className='hidden md:table-cell'>Phone Number</TableHead>
          <TableHead className='md:hidden'>Phone</TableHead>
          <TableHead className='hidden md:table-cell'>Email</TableHead>
          <TableHead className='hidden md:table-cell'>Fee Status</TableHead>
          <TableHead className='hidden md:table-cell'>Fee Amount</TableHead>
          <TableHead ></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.membership._id}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.phoneNumber || "N/A"}</TableCell>
            <TableCell className='hidden md:table-cell'>{student.email || "N/A"}</TableCell>
            <TableCell className='hidden md:table-cell'>{student.membership.feeStatus}</TableCell>
            <TableCell className='hidden md:table-cell'>₹{student.membership.feeAmount}</TableCell>
            <TableCell >
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => {/* Implement edit functionality */}}
              >
                <Ellipsis className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveMember(student.membership._id)}
              >
                <CircleX className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}