import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileinputRef = useRef(null);



  const handleCourseCreation = async (e) => {
    e.preventDefault();


    if (!title || !description || !materials) {
      setError('Enter details to create course');
      return;
    }

    setError("");

    const formdata = new FormData();

    formdata.append('title', title);
    formdata.append('description', description);
    materials.forEach((file) => {
      formdata.append('materials', file)
    })


    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/courses/create', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('course created successfully')
      setSubmitted(true);
      setTitle('');
      setDescription('');
      setMaterials([]);
      fileinputRef.current.value = '';


    } catch (err) {
      console.log(err)
      setError('Error encountered')
    }
  };

  const handleFilechange = (e) => {
    const filesarr = Array.from(e.target.files);
    setMaterials(filesarr);

  };




  return (
    <section className="min-h-screen py-10 px-6 bg-blue-100">
      <div className="bg-purple-300 p-14 rounded-xl shadow-lg max-w-md mx-auto flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-5 text-center">Create Course</h2>
        <form className="flex-col max-w-md" onSubmit={handleCourseCreation}>
          <div className="p-2">
            <label htmlFor="title">Title</label><br />
            <input
              type="text"
              placeholder="Enter Title of Course"
              onChange={(e) => setTitle((e.target.value))}
              className="w-full p-2 border rounded" /></div>
          <div className="p-2">
            <label htmlFor="description">Description</label><br />
            <input
              type="textarea"
              placeholder="Enter description of Course"
              onChange={(e) => setDescription((e.target.value))}
              className="w-full p-2 border rounded" /></div>
          <div className="p-2">
            <label htmlFor="materials">Materials (Use 'Ctrl' for multiple files)</label><br />
            <input
              ref={fileinputRef}
              type="file"
              id="materials"
              multiple
              onChange={handleFilechange}
              className="p-1 text-sm border rounded w-44" /></div>
          <button type="submit" className="p-2 bg-purple-500 cursor-pointer rounded text-center">Create Course</button>
          {submitted && <p className="p-2 bg-green-300 mt-2 rounded text bg-center">Course Created</p>}
          {error && <p className="bg-red-700">{error}</p>}
        </form>

      </div>
    </section>
  )

};


export default CreateCourse;