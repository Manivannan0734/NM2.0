// pages/api/getTasks.js

import { connectToDatabase } from '../../db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectToDatabase();
    const collection = client.db().collection('col'); // Replace with your collection name

    try {
      const tasks = await collection.find({}).toArray();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
