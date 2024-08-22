const mongoose=require("mongoose")

const restaurantSchema=new mongoose.Schema({
  name:{type:String,required:true},
  location:{
    type:{
      location:{
        type:{
          type:String,
          enum:['Point'],
          required:true
        },
        coordinates:{
          type:[Number],
          required:true,
          index:'2dsphere'
        }
      }
    }
  }
})

module.exports=mongoose.model('Restaurant',restaurantSchema);