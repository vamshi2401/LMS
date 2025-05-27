import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ViewCourses from './pages/ViewCourses';
import PrivateRoute from './components/Privateroute';
import CreateCourse from './pages/Createcourse';
import { useSelector } from 'react-redux';
import "./App.css";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="api/auth/login" element={<Login />} />
        <Route path="api/auth/register" element={<Register />} />

        {/*<Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />*/}
        <Route path="/api/courses/create" element={<PrivateRoute><CreateCourse /></PrivateRoute>} />
        <Route path="/api/users/details" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/api/viewcourses" element={<PrivateRoute><ViewCourses /></PrivateRoute>} />
        <Route path="/api/courses/enroll" element={<PrivateRoute><Courses /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
