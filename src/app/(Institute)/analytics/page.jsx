'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { name: 'Jan', revenue: 4000, transactions: 240 },
  { name: 'Feb', revenue: 3000, transactions: 198 },
  { name: 'Mar', revenue: 5000, transactions: 281 },
  { name: 'Apr', revenue: 4500, transactions: 252 },
  { name: 'May', revenue: 3500, transactions: 210 },
  { name: 'Jun', revenue: 4200, transactions: 265 },
];

const AnalyticsPage = () => {
  return (
    <div className="p-6 w-full h-full overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹24,200</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,446</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Transaction Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹16.74</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Monthly Revenue and Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue (₹)" />
              <Bar yAxisId="right" dataKey="transactions" fill="#82ca9d" name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Introduction to React</span>
              <span className="font-bold">₹5,200</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Advanced JavaScript</span>
              <span className="font-bold">₹4,800</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Data Science Fundamentals</span>
              <span className="font-bold">₹4,500</span>
            </li>
            <li className="flex justify-between items-center">
              <span>UI/UX Design Basics</span>
              <span className="font-bold">₹3,900</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Python for Beginners</span>
              <span className="font-bold">₹3,600</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;