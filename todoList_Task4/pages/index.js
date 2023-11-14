// pages/index.js

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState('');

  useEffect(() => {
    // Fetch tasks from your MongoDB collection
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getTasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.post('/api/deleteTask', { taskId });
      
      if (response.status === 200) {
        console.log('Task deleted successfully');
        // Remove the deleted task from the local state
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/saveData', { data: formData });
      
      if (response.status === 201) {
        console.log('Data saved successfully');
        // Fetch and update the task list
        const fetchResponse = await axios.get('/api/getTasks');
        setTasks(fetchResponse.data);
      } else {
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Data to save"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button type="submit">Save Data</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.data}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
