import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import '../App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [error, setError] = useState(null);*/
  /*const handleLoginClick = () => {
    navigate('/api/auth/login');
  };

  const handleregister = () => {
    navigate('/api/auth/register');
  };*/

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      
      <h1 className="text-3xl font-bold text-center text-blue-500">DASHBOARD</h1>
      <p className='mt-5 text-cyan-800 text-2xl text-center'>Welcome to the Learning Management Platform</p>
      <p className='mt-5 font-bold text-emerald-800 text-2xl text-center'>Login to access the platform</p>
      

      
    
      
  

      




    </div>
  );
}
