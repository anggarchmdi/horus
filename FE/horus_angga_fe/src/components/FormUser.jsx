import React from 'react'
import { useNavigate } from 'react-router-dom'

function FormUser() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }
  return (
   <>
   <div className="bg-white w-96 h-3/4 rounded-lg">
    <h1 className='font-semibold text-[2rem] text-center mt-2'>Update Data</h1>
    <div className="w-full p-4 flex flex-col">
    <div className="mb-4">
        <button onClick={handleBack} className='bg-red-500 text-white px-4 py-1.5 rounded-lg shadow-lg transition-all transform hover:scale-95 duration-300'>Kembali</button>
    </div>
    <label htmlFor="" className='font-medium'>username</label>
    <input type="text" className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan username..' />
    <label htmlFor="" className='font-medium'>password</label>
    <input type="text" className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan password..' />
    <label htmlFor="" className='font-medium'>email</label>
    <input type="text" className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan email..' />
    <label htmlFor="" className='font-medium'>name</label>
    <input type="text" className='border-2 rounded-lg px-2 border-black py-2 mb-4' placeholder='masukkan name..' />
    <button type='submit' className='bottom-0 bg-blue-500 shadow-xl text-white font-semibold py-2 rounded-xl transition-all transform hover:scale-95 duration-300'>Update</button>
    </div>
   </div>
   </>
  )
}

export default FormUser