const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Import the model

// POST route to add a new user
router.post("/", async (req, res) => {
  const { email, userName, isAdmin,name, password, image, coin, streak } = req.body;

  // Create a new user instance
  const newUser = new User({
    email,
    userName,
    isAdmin,
    name,
    password,
    image,
    coin,
    streak
  });

  try {
    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding user to the database" });
  }
});



// POST route to add multiple users
router.post("/multiple", async (req, res) => {
  const users = req.body; // Expecting an array of user objects

  try {
    // Insert multiple users into the database
    const savedUsers = await User.insertMany(users);
    res.status(201).json(savedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding users to the database" });
  }
});


// Get All the Users:-
router.get("/getAll",async(req,res)=>{
 try{
  const userList=await User.find();
  res.send(userList)
 }catch(err){
  console.log(err.message);
  res.status(500).json({error:"Error fetching all user"})
 }
})


// Get individual User:-
router.get("/:id",async (req,res)=>{
  try{
    const user=await User.findOne({_id:req.params.id});
    res.send(user);
  }catch(err){
    console.log(err.message);
    res.status(500).json({error:`User with id=${req.params.id} is not available!!`})
  }
})

//Updating a data in database. We will use PATCH

router.patch("/:id",async(req,res)=>{
  try{
    const user=await User.findOne({_id:req.params.id})

    if(req.body.isAdmin){
      user.isAdmin=req.body.isAdmin
    }
    await user.save()
    res.send(user)
  }catch(err){
    res.status(404).send({error:"User Doesn't exits"})
  }
})



router.delete("/delete/:id", async(req,res)=>{
  try{
    await User.deleteOne({_id:req.params.id})
  }catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
 }
})

module.exports = router;
