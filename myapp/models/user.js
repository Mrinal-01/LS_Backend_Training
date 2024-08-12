const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
  email:{
    type:String,
    lowercase:true,
    unique:true
  },
  name:{
    type:String,
    required:true,
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  password:{
    type:String,
    required:true
  },
  image:{
    type:String
  },
  coin:{
    type:Number,
    default:0
  },
  streak:{
    default:0
  }
})


module.exports=mongoose.model("RegisteredUser",userSchema)