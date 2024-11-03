import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleToRegister = () => {
    navigate('/register');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { username, password });
      // Simpan token ke localStorage atau state
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirect ke halaman utama setelah login berhasil
    } catch (error) {
      setError('Login gagal: ' + (error.response?.data?.message || 'Server tidak merespons'));
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-slate-900 flex justify-center items-center">
        <div className="bg-white w-80 h-2/5 rounded-lg shadow-md">
          <h1 className="text-center font-bold text-[2rem] mt-2">Login</h1>
          <div className="grid grid-cols-1 p-4">
            <label>username</label>
            <input
              type="text"
              className="border-black border-2 rounded-lg px-2 py-1 mb-4"
              placeholder="masukkan username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>password</label>
            <input
              type="password"
              className="border-black border-2 rounded-lg px-2 py-1 mb-4"
              placeholder="masukkan password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="py-1 w-full rounded-lg text-white font-bold bg-sky-500 mb-3 transition-all transform hover:scale-95 duration-300"
              >
                Login
              </button>
            </div>
            <div className="mt-auto flex justify-end">
              <button onClick={handleToRegister} className="text-blue-500 hover:underline">
                belum punya akun?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
