import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ViewCourses() {
  const [coursedata, setCoursedata] = useState([]);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const role = user?.role;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/courses/viewcourses`, { headers: { Authorization: `Bearer ${token}` } });
        setCoursedata(response.data);
        
      } catch (err) {
        setError('Error fetching data');
        console.log(err);
      }
    }
    fetchData();
  }, [isAuthenticated, user])




  return (
    <section className="min-h-screen bg-blue-50 py-10 px-6">
      <h2 className="font-bold text-3xl text-center mb-4">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {error && <p className="text-red-600">{error}</p>}
        {coursedata.map((course) => (
          <div key={course._id} className="rounded-lg bg-purple-200 shadow p-4 my-2 mx-2 w-auto">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="mb-2">{course.description}</p>
            <div>
              <strong>Materials:</strong>
              <ul className="list-disc ml-6">
                {course.materials.map((file, index) => (
                  <li key={index}>
                    <a
                      href={`http://localhost:3000/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Material {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
              {role === 'Tutor' && (
                <>
                  <p>Enrolled users</p>
                  {course.enrolledUsers.map((users, index) => (
                    <p key={index}>user id:  {users}</p>
                  ))}
                </>
              )}

            </div>
          </div>
        ))}

      </div>
    </section>
  )
}