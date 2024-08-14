const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const user=require("./models/user")

const hashPassword=async (req,res,next)=>{
  const {password}=req.body
  if(password===null) return res.status(400).json({error:"Password is required"})

  try{
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    // console.log(salt);
    
    next()
  }catch(err){
    res.status(500).send("Server error")
  }
}



const jwtAuthMiddleware = (req,res,next)=>{
  
  const token=req.headers.authorization.split(' ')[1];
  
  if(!token) return res.status(401).json({error:"Unauthorized"})
    // console.log(token);
  console.log("inside auth middleware");
  
    
  try{
    const decoded=jwt.verify(token, process.env.SECRET)
    console.log(decoded);
    
    req.user=decoded
    next()
  }catch(err){
      res.status(401).json({error:err.message})
  }
}


// const generateToken=(userData)=>{
//   return jwt.sign(userData,process.env.SECRET,{expiresIn:time})
// }

module.exports={jwtAuthMiddleware,hashPassword}