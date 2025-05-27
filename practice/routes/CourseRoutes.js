const express=  require('express');
const {authenticate, authorizeRole}=require('../middleware/authmiddleware');

const {uploadCoursematerial}=require('../middleware/upload');

const {createCourse, enrollUser, viewcourses}=require('../controllers/courseController');


const router=express.Router();
router.post('/create', authenticate, authorizeRole('Tutor'), uploadCoursematerial.array('materials', 10), createCourse);
router.post('/enroll',  authenticate, authorizeRole('Student'),enrollUser);
router.get('/viewcourses', authenticate, viewcourses);

module.exports=router;

