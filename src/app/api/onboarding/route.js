import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { fullName, emailId, phoneNumber, instituteName } = await req.json();

    if (!fullName || !emailId || !phoneNumber || !instituteName) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('main');
    const collection = db.collection('institutes');

    const result = await collection.insertOne({
      fullName,
      emailId,
      phoneNumber,
      instituteName,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Onboarding successful', data: result }, { status: 201 });
  } catch (error) {
    console.error('Error inserting data: ', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

