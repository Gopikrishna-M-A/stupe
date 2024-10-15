import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const instituteId = searchParams.get('instituteId');

  if (!instituteId) {
    return NextResponse.json({ error: 'Institute ID is required' }, { status: 400 });
  }

  try {
    const transactions = await Transaction.find({ instituteId: instituteId });
    
    const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalTransactions = transactions.length;
    const averageTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // Monthly data with month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.transactionDate);
      const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { revenue: 0, transactions: 0 };
      }
      monthlyData[monthYear].revenue += transaction.amount;
      monthlyData[monthYear].transactions += 1;
    });

    // Sort monthly data by date
    const sortedMonthlyData = Object.entries(monthlyData)
      .sort(([a], [b]) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        return new Date(`${monthA} 1, ${yearA}`) - new Date(`${monthB} 1, ${yearB}`);
      })
      .map(([name, data]) => ({ name, ...data }));

    // Top 5 groups
    const groupRevenue = {};
    transactions.forEach(transaction => {
      if (!groupRevenue[transaction.groupId]) {
        groupRevenue[transaction.groupId] = 0;
      }
      groupRevenue[transaction.groupId] += transaction.amount;
    });

    const topGroups = await Promise.all(
      Object.entries(groupRevenue)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(async ([groupId, revenue]) => {
          const group = await Transaction.findOne({ groupId }).populate('groupId', 'groupName');
          return {
            groupName: group?.groupId?.groupName || 'Unknown Group',
            totalRevenue: revenue
          };
        })
    );

    return NextResponse.json({
      totalRevenue,
      totalTransactions,
      averageTransactionValue,
      monthlyData: sortedMonthlyData,
      topGroups
    });
  } catch (error) {
    console.error("Error in analytics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}