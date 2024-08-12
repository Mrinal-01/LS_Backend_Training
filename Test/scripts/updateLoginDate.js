const mongoose=require("mongoose")
const User=require("../models/user")


mongoose.connect('mongodb://localhost:27017/ShoppingCart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addFieldToExistingDocument=async()=>{
  try{
    const currentDate=new Date()
    await User.updateMany({$or:[{currentLoginDate:{$exists:false}}, {lastLoginDate:{$exists:false}}]},
    {$set:{currentLoginDate:currentDate,lastLoginDate:currentDate}})

    console.log("All documents updated");
    mongoose.connection.close();
  }catch(err){
    console.log("Error occure",err.message)
  }
}

addFieldToExistingDocument()