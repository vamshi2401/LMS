const express=require('express');
const {authenticate, authorizeRole}=require('../middleware/authmiddleware');


const {getUserProfile} =require('../controllers/userController');

const router= express.Router();


router.get('/details', authenticate, getUserProfile);

module.exports =router;