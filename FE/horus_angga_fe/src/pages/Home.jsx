import { useNavigate } from 'react-router-dom';
import UserList from '../components/userList';
import searchImg from '../assets/icons/search.png'

function Home() {
  const navigate = useNavigate();

const token = localStorage.getItem('token');
if (!token) {
  // Redirect ke halaman login jika belum login
  navigate('/login');
}

const handleAddData = () => {
  navigate('/add-data')
};

  return (
    <>
    <div className="w-full h-screen overflow-y-hidden bg-slate-900 container mx-auto p-12">
      <h1 className='text-white font-semibold text-[2rem]'>Data user</h1>
      <div className="flex justify-between items-center">
        <button onClick={handleAddData} className='text-white px-4 py-2 bg-green-500 mt-4 font-semibold rounded-lg transistion-all transform hover:scale-95 duration-300 shadow-md'>+ Tambah data</button>
        <div className="flex">
        <img src={searchImg} className='w-8 h-8 absolute translate-y-1 translate-x-1' alt="" />
        <input type="text" className='w-80 h-10 rounded-lg px-10 shadow-lg' placeholder='Penelusuran data...' />
        </div>
      </div>
      <div className="text-white table w-full mt-8">
       <UserList />
      </div>
    </div>
    </>
  )
}

export default Home