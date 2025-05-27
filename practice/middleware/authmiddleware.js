const jwt = require('jsonwebtoken');

const authenticate = (req, res, next)=>{

  const authHeader=req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message: 'access denied, no token provided'})
   }

  const token=authHeader.split(' ')[1];
  

  if (!token) return res.status(403).json({message: 'Access denied'})

  try {
    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    
    req.user=decoded;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Invalid token'});
  }
  
};


const authorizeRole=(role)=>(req,res,next)=>{
  if (req.user.role!=role ) return res.status(403).json({message:"unauthorized"});
  next();
};

module.exports={authenticate,authorizeRole};