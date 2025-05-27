const multer= require('multer');
const path=require('path');


const profilepicStorage=multer.diskStorage({
  destination: './uploads/ProfilePic',
  filename: (req,file,cb)=>{
    cb(null, `profile_${Date.now()}${path.extname(file.originalname)}`)

  },

});

const courseMaterialStorage=multer.diskStorage({
  destination: './uploads/CourseMaterials',
  filename: (req,file,cb)=>{
    cb(null, `materials${Date.now()}${path.extname(file.originalname)}`)

  },

});


const uploadCoursematerial=multer({storage: courseMaterialStorage});

const uploadProfilePic=multer({storage: profilepicStorage});
module.exports= {uploadCoursematerial,uploadProfilePic};



