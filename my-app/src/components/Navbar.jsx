import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;


  return (
    <nav className="bg-purple-500 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="text-white text-2xl font-semibold">
          <Link to="/">LMS</Link>
        </div>


        <div className="flex space-x-6">
          <Link to="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link>

          <Link to="/api/users/details" className="text-white hover:text-gray-200">Profile</Link>

          {role === 'Tutor' && (
            <>
              <Link to="/api/courses/create" className="text-white hover:text-gray-200">Courses</Link>
              <Link to="/api/viewcourses" className="text-white hover:text-gray-200">View Courses</Link>
            </>
          )}

          {role === 'Student' && (
            <>
              <Link to="/api/courses/enroll" className="text-white hover:text-gray-200">Enroll course</Link>
              <Link to="/api/viewcourses" className="text-white hover:text-gray-200">View Courses</Link>
            </>
          )}

        </div>



        {!isAuthenticated ? (
          <div className="flex space-x-6">
            <Link to="/api/auth/login" className="text-white hover:text-gray-200">Login</Link>
            <Link to="/api/auth/register" className="text-white hover:text-gray-200">Register</Link>
          </div>
        ) : (
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
