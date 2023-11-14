// pages/api/saveData.js

import { connectToDatabase } from '../../db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'POST') {
    const { data } = req.body;

    const client = await connectToDatabase();
    const collection = client.db().collection('col'); // Replace with your collection name

    try {
      const result = await collection.insertOne({ data });
      console.log('Data saved successfully');
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error.message);
      res.status(500).json({ error: 'Error saving data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
