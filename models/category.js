const mongoose=require("mongoose")

const categorySchema=new mongoose.Schema({
  categoryName: { type: String, required: true },
  _parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model("Category",categorySchema)