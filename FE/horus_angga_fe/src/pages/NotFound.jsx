import React from 'react';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Oops! Halaman Tidak Ditemukan</h2>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:scale-95 transition-all transform duration-300">
        Kembali ke Beranda
      </a>
    </div>
  );
}

export default NotFound;
