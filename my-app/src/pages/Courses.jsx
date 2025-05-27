import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/userAPI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Courses() {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [enrollingcourse, setEnrollingcourse] = useState(null);
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();





  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found");
        const response = await axios.get(`http://localhost:3000/api/courses/viewcourses`, { headers: { Authorization: `Bearer ${token}` } });
        setData(response.data);
        
      } catch (err) {
        setError('Error fetching data');
        console.log(err);
      }
    }
    fetchData();
  }, [isAuthenticated, user])

  const handleEnroll = async (courseId) => {
    try {
      setEnrollingcourse(courseId);
      setError("");
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:3000/api/courses/enroll',
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      alert("Course enrolled succesfully");
      setEnrollingcourse(null);
    } catch (err) {
      setError(err.response?.data?.error || "enrollement failed");
      setEnrollingcourse(null);

    }
  };

  return (
    <section className='min-h-screen bg-blue-50 py-10 px-6'>
      <div className=''>
        <h1 className='font-bold text-3xl text-center mb-4'>Available Courses</h1>
        <div className=''> 
          {loading ? (
            <p>Loading courses...</p>
          ) : (
            <>
              {error && <p className="mb-2 text-green-600">{error}</p>}

              <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((course) => (
                  <li key={course._id} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-medium">{course.title}</h2>
                    <p>{course.description}</p>
                    <button
                      onClick={() => handleEnroll(course._id)}
                      disabled={enrollingcourse === course._id}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      {enrollingcourse === course._id ? 'Enrolling...' : 'Enroll'}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
