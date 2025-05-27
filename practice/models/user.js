const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  email: {type:String, required:true, unique:true},
  password: {type: String, required: true, unique:true},
  profilePic: {type: String},
  role: {type:String, role: {type: String, enum: ['Student','Tutor']}, required:true, default: 'user'},
},{timestamps:true});

module.exports=mongoose.model('User',UserSchema);


