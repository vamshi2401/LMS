require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/db');
const authroutes=require('./routes/auth');
const protectedroutes=require('./routes/protected');
const { connect } = require('mongoose');
const userRoutes=require('./routes/userRoutes');
const courseRoutes=require('./routes/CourseRoutes');
const path=require('path');

const app=express()

app.use(express.json());

app.use(cors());

connectDB();

app.use('/api/auth', authroutes);
app.use('/api/protected', protectedroutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/users',userRoutes);
app.use('/api/courses', courseRoutes);

const PORT=process.env.PORT;

app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
});


