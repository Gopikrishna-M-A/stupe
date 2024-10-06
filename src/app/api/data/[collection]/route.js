import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { createDocumentForCollection } from '../../lib/collectionHelpers';

export default async function handler(req, res) {
  const { collection } = req.query;
  if (req.method === 'POST') {
    return await writeToCollection(req, res, collection);
  } else if (req.method === 'GET') {
    return await readFromCollection(req, res, collection);
  } else {
    return res.status(405).json({ message: 'Only GET and POST requests are allowed' });
  }
}

async function writeToCollection(req, res, collectionName) {
  try {
    const client = await clientPromise;
    const db = client.db('main');
    const collection = db.collection(collectionName);

    let document = createDocumentForCollection(collectionName, req.body);
    const result = await collection.insertOne(document);

    res.status(201).json({ message: 'Data inserted successfully', data: result });
  } catch (error) {
    console.error('Error inserting data: ', error.message);
    res.status(400).json({ message: error.message });
  }
}

async function readFromCollection(req, res, collectionName) {
  const { id, page = 1, limit = 10 } = req.query;

  if (!collectionName) {
    return res.status(400).json({ message: 'Collection name is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('main');
    const collection = db.collection(collectionName);

    let query = {};
    if (id) {
      query = { _id: new ObjectId(id) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const data = await collection.find(query).skip(skip).limit(parseInt(limit)).toArray();

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error reading data: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
