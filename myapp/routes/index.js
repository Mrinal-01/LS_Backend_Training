var express = require('express');
var router = express.Router();
const User = require("../models/user")


/* GET home page. */
router.get('/user/', function(req, res, next) {
  const {
    email,name
  } =req.query
  
  console.log(email);
  res.render('index', { title: 'Express',company:'Logic Square', email,name });
});

router.get('/details', function(req, res, next) {
  res.json({error:false,response:'successful'})
});


router.get('/login', (req,res)=>{
  res.render('login')
})
router.get('/ma',(req,res)=>{
  // const data = req.body
  // console.log("This is main", data);
  // if (data.work !== undefined || data.work === "Done") {
  //   console.log("Work Done")
  // }
  // return res.status(200).json({username:"Mrinal Bera",email:'mbera829@gmail.co',image:"/images/ProfilePic.jpeg"})
  res.render('main',{username:"Mrinal Bera",email:'mbera829@gmail.co',image:"/images/ProfilePic.jpeg"})
})
router.get('/ronaldo',(req,res)=>{
  res.render('ronaldo')
})
router.get('/TrafficLight',(req,res)=>{
  res.render('TrafficLight')
})
router.get('/colorswap',(req,res)=>{
  res.render('colorswap')
})
router.get('/scratch',(req,res)=>{
  res.render('scratch')
})


router.post('/',function(req,res){
  // const userdata=req.body
  console.log(req.body);
  res.json({error:false,userdata: req.body})
})



module.exports = router;
