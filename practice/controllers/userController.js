const User=require('../models/User');
const path= require('path');
const {authenticate}=require('../middleware/authmiddleware');

exports.uploadProfilePic = async(req,res)=>{
  try {
    const username = req.user.username;
    const profilePic=req.file.path;

    const user= new User({username, profilePic});
    await user.save();
    res.status(201).json({message: "user profile created", user})
  } catch(err){
    res.status(500).json({error: err.message})
  }
};

exports.getUserProfile= async (req,res)=> {
  try {
    const user=await User.findById(req.user.id);
    if (!user) return res.status(404).json({error: "user not found"})
    const { password, ...userData } = user._doc;
    
    res.json(userData);
  } catch (err) {
    res.status(500).json({error: err.message})
  }
};