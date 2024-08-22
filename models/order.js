const mongoose=require("mongoose")


const orderSchema=new mongoose.Schema({
  _userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  orderStatus: { type: String, enum: ['pending', 'completed', 'shipped'], default: 'pending' },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model("Order",orderSchema)