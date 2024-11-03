import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddData() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
  });
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/users', formData, {
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
      });
      navigate('/'); // Redirect after successful addition
    } catch (error) {
      console.error('Error adding user:', error);
    }
};

  return (
    <div className="bg-slate-900 h-screen w-full flex justify-center items-center">
      <div className="bg-white w-96 h-3/4 rounded-lg">
        <h1 className='font-semibold text-[2rem] text-center mt-2'>Tambah Data</h1>
        <form onSubmit={handleSubmit} className="w-full p-4 flex flex-col">
          <div className="mb-4">
            <button onClick={handleBack} className='bg-red-500 text-white px-4 py-1.5 rounded-lg shadow-lg transition-all transform hover:scale-95 duration-300'>Kembali</button>
          </div>
          <label className='font-medium'>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan username..' required />
          <label className='font-medium'>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan password..' required />
          <label className='font-medium'>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan email..' required />
          <label className='font-medium'>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan name..' required />
          <button type='submit' className='bottom-0 bg-blue-500 shadow-xl text-white font-semibold py-2 rounded-xl transition-all transform hover:scale-95 duration-300'>Tambah</button>
        </form>
      </div>
    </div>
  );
}

export default AddData;
