import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { fullName, emailId, phoneNumber, instituteName } = req.body;

  if (!fullName || !emailId || !phoneNumber || !instituteName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
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

    res.status(201).json({ message: 'Onboarding successful', data: result });
  } catch (error) {
    console.error('Error inserting data: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
