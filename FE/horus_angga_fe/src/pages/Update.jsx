import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { userId } = useParams();
  const [formData, setFormData] = useState({ username: '', password: '', email: '', name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
        setFormData({
          username: response.data.username || '',
          password: response.data.password || '',
          email: response.data.email || '',
          name: response.data.name || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [userId]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

      await axios.put(`http://127.0.0.1:8000/api/users/${userId}`, formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="bg-slate-900 h-screen w-full flex justify-center items-center">
      <div className="bg-white w-96 h-3/4 rounded-lg">
        <h1 className='font-semibold text-[2rem] text-center mt-2'>Update Data</h1>
        <form onSubmit={handleUpdate} className="w-full p-4 flex flex-col">
          <div className="mb-4">
            <button onClick={handleBack} className='bg-red-500 text-white px-4 py-1.5 rounded-lg shadow-lg transition-all transform hover:scale-95 duration-300'>Kembali</button>
          </div>
          <label className='font-medium'>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan username..' required />
          <label className='font-medium'>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='Isi jika ingin merubah password' />
          <label className='font-medium'>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan email..' required />
          <label className='font-medium'>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan name..' required />
          <button type='submit' className='bottom-0 bg-blue-500 shadow-xl text-white font-semibold py-2 rounded-xl transition-all transform hover:scale-95 duration-300'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
