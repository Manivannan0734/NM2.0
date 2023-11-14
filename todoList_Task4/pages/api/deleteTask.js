// pages/api/deleteTask.js

import { connectToDatabase } from '../../db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'POST') {
    const { taskId } = req.body;

    const client = await connectToDatabase();
    const collection = client.db().collection('col'); // Replace with your collection name

    try {
      const result = await collection.deleteOne({ _id: taskId });
      if (result.deletedCount === 1) {
        console.log('Task deleted successfully');
        res.status(200).json({ message: 'Task deleted successfully' });
      } else {
        console.error('Task not found');
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
      res.status(500).json({ error: 'Error deleting task' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
