import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses } from '../features/userAPI';

{/*const storeduser=JSON.parse(localStorage.getItem('user'));*/}


const initialState = {
  isAuthenticated: false,
  user: null,
  courses:
    [], 
  loading: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.courses = []
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false
      })
  },
})

export const {login, logout} = authSlice.actions 
export default authSlice.reducer; 