import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
export const fetchCourses = createAsyncThunk('Courses', async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:3000/api/viewcourses',{ headers: { Authorization: `Bearer ${token}` } });
  console.log(response.data);
  return response.data;
}
);