const express=require('express');
const {authenticate, authorizeRole}=require('../middleware/authmiddleware');

const router=express.Router();
router.get('/Tutor', authenticate, authorizeRole('Tutor'), (req,res)=>{
  res.json({message: "welcome Tutor"})
});

router.get('/Student',authenticate, (req,res)=>{
  res.json({message: "welcome, Student"})
});


module.exports = router;