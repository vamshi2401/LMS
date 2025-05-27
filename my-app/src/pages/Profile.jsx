import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated) {
        setError("User not logged in")
        navigate('/dashboard');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/users/details`, { headers: { Authorization: `Bearer ${token}` } });
        setData(response.data)
        console.log(response.data);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      }

    }
    fetchData();
  }, [isAuthenticated, user, navigate]);







  return (
    <section className="min-h-screen py-10 px-6 bg-blue-50">
      <div className="max-w-md mx-auto bg-purple-300 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>

        <div className="flex flex-col items-center gap-4">
          <img
            className="w-64 h-64 rounded-full border-4 border-purple-500 object-cover"
            src={`http://localhost:3000/${data.profilePic}`}
            alt="Profile"
          />

          <div className="text-gray-700 w-full">
            <div className="mb-2">
              <span className="font-semibold">ID:</span> <span>{data._id}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Username:</span> <span>{data.username}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Email ID:</span> <span>{data.email}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Role:</span> <span className="capitalize">{data.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}