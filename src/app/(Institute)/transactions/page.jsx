'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/transactions')
      console.log("response",response);
      
      setTransactions(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch transactions')
      setLoading(false)
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleStatusChange = (value) => {
    setStatusFilter(value)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.memberId.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='p-6 w-full'>
      <h1 className='text-3xl font-bold mb-6'>Transactions</h1>

      <div className='mb-6 flex gap-4'>
        <Input 
          placeholder='Search transactions...' 
          className='max-w-sm' 
          value={searchTerm}
          onChange={handleSearch}
        />

        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value='completed'>Completed</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='failed'>Failed</SelectItem>
          </SelectContent>
        </Select>
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
                  <th className='text-left p-2'>Group</th>
                  <th className='text-left p-2'>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className='border-b'>
                    <td className='p-2'>{transaction.memberId.name}</td>
                    <td className='p-2'>₹{transaction.amount.toFixed(2)}</td>
                    <td className='p-2'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className='p-2'>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                    <td className='p-2'>{transaction.groupId.groupName}</td>
                    <td className='p-2'>{transaction.paymentMethod}</td>
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