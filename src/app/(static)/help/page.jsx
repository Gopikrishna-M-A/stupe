import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const helpCategories = [
  {
    title: "Getting Started",
    items: ["Creating an Account", "Setting Up Your Institution", "Adding Student Information"]
  },
  {
    title: "Managing Payments",
    items: ["Setting Up Fee Structures", "Collecting Payments", "Handling Refunds"]
  },
  {
    title: "Reports and Analytics",
    items: ["Generating Financial Reports", "Understanding Dashboard Analytics", "Exporting Data"]
  },
  {
    title: "Account Management",
    items: ["Updating Institution Details", "Managing User Roles", "Security Settings"]
  },
  {
    title: "Troubleshooting",
    items: ["Common Issues", "Error Messages", "Contacting Support"]
  }
];

export default function HelpCenterPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How can we help you today?</h2>
        <div className="flex gap-4">
          <Input type="text" placeholder="Search for help articles..." className="flex-grow" />
          <Button>Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="mb-2">
                    <a href="#" className="text-blue-600 hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <p className="mb-4">Our support team is ready to assist you with any questions or issues you may have.</p>
        <Button>Contact Support</Button>
      </div>
    </div>
  );
}