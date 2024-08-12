const express=require("express")
const router=express.Router();
const Category=require("../models/category")

// router.post("/",async(req,res)=>{
//   try{
//     const category=new Category(req.body);
//     const savedCategory=await category.save();
//     res.status(201).json(savedCategory);
//   }catch(err){
//     res.status(400).json({message:err.message})
//   }
// });



router.post('/', async (req, res) => {
  const categories = req.body;

    try {
        if (Array.isArray(categories)) {
            // Insert multiple categories
            const newCategories = await Category.insertMany(categories);
            res.status(201).json(newCategories);
        } else {
            // Insert a single category
            const newCategory = new Category(categories);
            await newCategory.save();
            res.status(201).json(newCategory);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




router.get('/',async(req,res)=>{
  try{
    const categories=await Category.find();
    res.json(categories)
  }catch(err){
    res.status(500).json({message:err.message});
  }
})

router.get("/:id",async(req,res)=>{
  try{
    const category=await Category.findById(req.params.id);
    if(category){
      res.json(category)
    }else{
      res.status(404).json({message:"Category not found"})
    }
  }catch(err){
    res.status(500).json({message:err.message})
  }
})

router.put('/:id',async (req,res)=>{
  try{
    const updatedCategory=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updatedCategory);
  }catch(err){
    res.status(400).json({message:err.message})
  }
})

router.delete('/:id',async(req,res)=>{
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await Category.deleteOne({ _id: req.params.id });
      res.json({message:"category deleted"})
    }else{
      res.status(404).json({message:"category not found"})
    }
  }catch(err){
      res.status(500).json({message:err.message})
  }
})
module.exports=router;