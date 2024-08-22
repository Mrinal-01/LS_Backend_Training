const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  price:{
    type:Number,
    required:true
  },
  sellPrice:{
    type:Number,
    required:true
  },
  stockQuantity:{
    type:Number,
    required:true,
    default:0
  },
  _categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category' 
  },
  image:{
    type:String,
    required:true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
})

module.exports=mongoose.model("Product" ,ProductSchema)
