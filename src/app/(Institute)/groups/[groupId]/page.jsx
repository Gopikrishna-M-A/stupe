'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This is a mock function to simulate fetching group data
// In a real application, you would fetch this data from your API
const fetchGroupData = (groupId) => {
  return {
    id: groupId,
    name: 'Class 10A',
    description: 'Secondary education class for the academic year 2023-2024',
    studentCount: 30,
    totalFees: 150000,
    collectedFees: 120000,
    pendingFees: 30000,
    students: [
      { id: 1, name: 'John Doe', feeStatus: 'Paid' },
      { id: 2, name: 'Jane Smith', feeStatus: 'Partial' },
      { id: 3, name: 'Alice Johnson', feeStatus: 'Pending' },
      // ... more students
    ]
  };
};

export default function GroupPage() {
  const params = useParams();
  const groupId = params.groupId;
  const groupData = fetchGroupData(groupId);

  return (
    <div className="max-w-6xl w-full mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6">{groupData.name}</h1>
      
      <p className="text-gray-600 mb-6">{groupData.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{groupData.studentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{groupData.totalFees.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collected Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{groupData.collectedFees.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Students</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Fee Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupData.students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.feeStatus}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between">
        <Button variant="outline">Back to Groups</Button>
        <Button>Send Fee Reminder</Button>
      </div>
    </div>
  );
}