import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const transactions = [
  {
    id: 1,
    studentName: "John Doe",
    amount: 500,
    status: "Completed",
    date: "2024-10-01",
    course: "Introduction to React",
    group: "Group 1",
  },
  {
    id: 2,
    studentName: "Jane Smith",
    amount: 750,
    status: "Pending",
    date: "2024-10-02",
    course: "Advanced JavaScript",
    group: "Group 1",
  },
  {
    id: 3,
    studentName: "Bob Johnson",
    amount: 600,
    status: "Completed",
    date: "2024-10-03",
    course: "UI/UX Design Basics",
    group: "Group 2",
  },
  {
    id: 4,
    studentName: "Alice Brown",
    amount: 450,
    status: "Completed",
    date: "2024-10-04",
    course: "Python for Beginners",
    group: "Group 2",
  },
  {
    id: 5,
    studentName: "Charlie Davis",
    amount: 800,
    status: "Pending",
    date: "2024-10-05",
    course: "Data Science Fundamentals",
    group: "Group 3",
  },
]

const TransactionsPage = () => {
  return (
    <div className='p-6 w-full'>
      <h1 className='text-3xl font-bold mb-6'>Transactions</h1>

      <div className='mb-6 flex gap-4'>
        <Input placeholder='Search transactions...' className='max-w-sm' />

        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value='completed'>Completed</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
          </SelectContent>
        </Select>
        <Button>Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left p-2'>Student Name</th>
                  <th className='text-left p-2'>Amount</th>
                  <th className='text-left p-2'>Status</th>
                  <th className='text-left p-2'>Date</th>
                  <th className='text-left p-2'>Course</th>
                  <th className='text-left p-2'>Group</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className='border-b'>
                    <td className='p-2'>{transaction.studentName}</td>
                    <td className='p-2'>₹{transaction.amount.toFixed(2)}</td>
                    <td className='p-2'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ₹{
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className='p-2'>{transaction.date}</td>
                    <td className='p-2'>{transaction.course}</td>
                    <td className='p-2'>{transaction.group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage
