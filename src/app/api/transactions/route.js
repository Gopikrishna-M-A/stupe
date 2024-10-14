import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const transaction = await Transaction.findById(id)
      .populate('memberId', 'name')
      .populate('groupId', 'name')
      .sort({ transactionDate: -1 })
      return NextResponse.json(transaction);
    } else {
      const transactions = await Transaction.find({})
      .populate('memberId', 'name')
      .populate('groupId', 'groupName')
      .sort({ transactionDate: -1 })
      return NextResponse.json(transactions);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newTransaction = await Transaction.create(body);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}