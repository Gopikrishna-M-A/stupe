"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useUserContext } from "@/contexts/UserContext"
import { Loader2 } from "lucide-react"
import axios from "axios"

const AnalyticsPage = () => {
  const { instituteData } = useUserContext()
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!instituteData?._id) return;
      
      try {
        setLoading(true)
        const response = await axios.get(
          `/api/analytics?instituteId=${instituteData._id}`
        )
        setAnalyticsData(response.data)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [instituteData])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    )
  }

  if (error)
    return <div className='text-red-500 text-center'>Error: {error}</div>
  if (!analyticsData)
    return <div className='text-center'>No data available</div>

  return (
    <div className='p-6 w-full h-full overflow-y-auto'>
      <h1 className='text-3xl font-bold mb-6'>Analytics</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              ₹{analyticsData.totalRevenue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {analyticsData.totalTransactions}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Transaction Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              ₹{analyticsData.averageTransactionValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Monthly Revenue and Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={analyticsData.monthlyData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
              <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId='left'
                dataKey='revenue'
                fill='#005180'
                name='Revenue (₹)'
              />
              <Bar
                yAxisId='right'
                dataKey='transactions'
                fill='#022539'
                name='Transactions'
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Performing Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {analyticsData.topGroups.map((group, index) => (
              <li key={index} className='flex justify-between items-center'>
                <span>{group.groupName}</span>
                <span className='font-bold'>
                  ₹{group.totalRevenue.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsPage