import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', totalPaid: 1500, courses: ['Introduction to React', 'Advanced JavaScript'], group: 'Group 1' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', totalPaid: 2250, courses: ['UI/UX Design Basics', 'Advanced JavaScript'], group: 'Group 1' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', totalPaid: 1800, courses: ['Python for Beginners', 'Data Science Fundamentals'], group: 'Group 2' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', totalPaid: 900, courses: ['Introduction to React'], group: 'Group 2' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', totalPaid: 3200, courses: ['Data Science Fundamentals', 'Advanced JavaScript', 'UI/UX Design Basics'], group: 'Group 3' },
];

const CustomersPage = () => {
  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      
      <div className="mb-6 flex gap-4">
        <Input placeholder="Search customers..." className="max-w-sm" />
        <Button>Search</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Total Paid</th>
                  <th className="text-left p-2">Courses</th>
                  <th className="text-left p-2">Group</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="p-2">{customer.name}</td>
                    <td className="p-2">{customer.email}</td>
                    <td className="p-2">${customer.totalPaid.toFixed(2)}</td>
                    <td className="p-2">{customer.courses.join(', ')}</td>
                    <td className="p-2">{customer.group}</td>
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