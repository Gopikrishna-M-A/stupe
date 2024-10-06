import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { createDocumentForCollection } from '../../../lib/collectionHelpers';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  const { collection } = params;

  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db('main');
    const dbCollection = db.collection(collection);

    const document = createDocumentForCollection(collection, data);
    const result = await dbCollection.insertOne(document);

    return NextResponse.json({ message: 'Data inserted successfully', data: result }, { status: 201 });
  } catch (error) {
    console.error('Error inserting data: ', error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET(req, { params }) {
  const { collection } = params;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;

  if (!collection) {
    return NextResponse.json({ message: 'Collection name is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('main');
    const dbCollection = db.collection(collection);

    let query = {};
    if (id) {
      query = { _id: new ObjectId(id) };
    }

    const skip = (page - 1) * limit;
    const data = await dbCollection.find(query).skip(skip).limit(limit).toArray();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error reading data: ', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
