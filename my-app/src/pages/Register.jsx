import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!email || !password || !username) {
      setError("All the fields are neccessary");
      return;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('profilePic', profilePic);


    try {
      await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      localStorage.setItem("username", username);
      navigate('/api/auth/login');

    } catch (error) {
      setError("Registration failed! enter valid data")
    }




  };

  const handleFilechange = (e) => {
    setProfilePic(e.target.files[0]);

  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-500  to-purple-500">
      <div className="bg-opacity-30 backdrop-blur-m p-8 rounded-lg shadow-xl w-full border border-white max-w-md mx-auto text-white">
        <h2 className="text-3xl mb-5 text-center">Register</h2>
        <form  onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" />
          </div>

          <div className="mb-4">
            <label htmlFor="Email" className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" />
          </div>

          <div className="mb-4">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="profilePic" className="block mb-2">Profile Picture</label>

            <input
              type="file"
              id="profilePic"
              onChange={handleFilechange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4"> Register</button>
          {error && <p className="bg-red-700">{error}</p>}
        </form>
      </div>
    </section>
  )


};


export default Register;