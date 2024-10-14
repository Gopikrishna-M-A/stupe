'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserContext } from '@/contexts/UserContext';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { instituteData } = useUserContext();
  const [groups, setGroups] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (instituteData) {
      fetchData();
    }
  }, [instituteData]);

  const fetchData = async () => {
    try {
      const [groupsResponse, transactionsResponse] = await Promise.all([
        axios.get(`/api/groups?instituteId=${instituteData._id}`),
        axios.get(`/api/transactions?instituteId=${instituteData._id}`)
      ]);
      setGroups(groupsResponse.data);
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalCollected = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalStudents = groups.reduce((sum, group) => sum + group.memberCount, 0);
  const pendingPayments = transactions.filter(t => t.status === 'Pending').length;

  const chartData = groups.map(group => ({
    name: group.groupName,
    students: group.memberCount,
    fees: group.collectedFees
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }


  return (
    <div className="p-6 w-full h-full overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{totalCollected.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingPayments}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Groups Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="students" stackId="1" stroke="#8884d8" fill="#8884d8" name="Students" />
              <Area type="monotone" dataKey="fees" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Collected Fees" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Transactions</h2>
       <Link href='/transactions'> <Button>View All</Button></Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="pl-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="hidden md:table-cell md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="hidden md:table-cell md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions?.slice(0, 5).map((transaction) => (
              <tr key={transaction?._id}>
                <td className="pl-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction?.memberId?.name}</td>
                <td className="md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{transaction?.amount?.toFixed(2)}</td>
                <td className="md:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction?.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction?.status}
                  </span>
                </td>
                <td className="hidden md:table-cell md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction?.transactionDate).toLocaleDateString()}
                </td>
                <td className="hidden md:table-cell md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction?.groupId?.groupName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;