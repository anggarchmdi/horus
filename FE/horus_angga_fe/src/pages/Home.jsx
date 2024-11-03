import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      
      navigate('/');
    }
  }, [navigate]);

 

  return (
    <>
      <div className="w-full h-screen overflow-y-hidden bg-slate-900 container mx-auto p-12">
        <h1 className='text-white font-semibold text-[2rem]'>Data user</h1>
        <div className="text-white table w-full">
          <UserList />
        </div>
      </div>
    </>
  );
}

export default Home;
