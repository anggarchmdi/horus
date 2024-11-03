import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchImg from '../assets/icons/search.png';

function UserList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (userId) => {
    navigate(`/update/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

      await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);
      setData(data.filter((user) => user.id !== userId));
    } catch (error) {
      setError(true);
      console.error('Error deleting user:', error);
    }
  };

  const handleAddData = () => {
    navigate('/add-data');
  };

  if (isLoading) return <div className="cursor-wait"></div>;
  if (error) return <div className="">Error fetching data</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <button onClick={handleAddData} className='text-white px-4 py-2 bg-green-500 mt-4 font-semibold rounded-lg transition-all transform hover:scale-95 duration-300 shadow-md'>+ Tambah data</button>
        <div className="flex">
          <img src={searchImg} className='w-8 h-8 absolute translate-y-1 translate-x-1' alt="" />
          <input 
            type="text" 
            className='w-80 h-10 text-black rounded-lg px-10 shadow-lg' 
            placeholder='Penelusuran data...' 
            value={searchTerm} 
            onChange={handleSearch} 
          />
        </div>
      </div>

      <table className='min-w-full divide-y divide-gray-200'>
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
          {filteredData.map((user) => (
            <tr key={user.id} className='odd:bg-slate-800 even:bg-transparent'>
              <td className='py-2 px-4 text-center'>{user.id}</td>
              <td className='py-2 px-4 text-center'>{user.username}</td>
              <td className='py-2 px-4 text-center'>{user.email}</td>
              <td className='py-2 px-4 text-center'>{user.name}</td>
              <td className='py-2 px-4 text-center translate-x-3'>
                <button onClick={() => handleEdit(user.id)} className='px-4 py-1 bg-yellow-500 rounded-lg mr-4 transition-all transform hover:scale-95 duration-300'>Edit</button>
                <button onClick={() => handleDelete(user.id)} className='px-4 py-1 bg-red-500 rounded-lg transition-all transform hover:scale-95 duration-300'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserList;
