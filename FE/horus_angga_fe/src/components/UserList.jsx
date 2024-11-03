import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use navigate hook here, at the top level
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users');
        setData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div className="cursor-wait"></div>;
  if (error) return <div className="">Error fetching data</div>;

  // Update handleEdit to use navigate without conditionally rendering hooks
  const handleEdit = (userId) => {
    navigate(`/update/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/users/${userId}`);
      setData(data.filter((user) => user.id !== userId));
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <thead className='bg-blue-500'>
        <tr>
          <th className='py-2 px-4 text-center'>NO</th>
          <th className='py-2 px-4 text-center'>Username</th>
          <th className='py-2 px-4 text-center'>Email</th>
          <th className='py-2 px-4 text-center'>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id} className='odd:bg-slate-800 even:bg-transparent'>
            <td className='py-2 px-4 text-center'>{user.id}</td>
            <td className='py-2 px-4 text-center'>{user.username}</td>
            <td className='py-2 px-4 text-center'>{user.email}</td>
            <td className='py-2 px-4 text-center'>{user.name}</td>
            <td className='py-2 px-4 text-center'>
              <button onClick={() => handleEdit(user.id)} className='px-4 py-1 bg-yellow-500 rounded-lg'>Edit</button>
              <button onClick={() => handleDelete(user.id)} className='px-4 py-1 bg-red-500 rounded-lg'>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default UserList;
