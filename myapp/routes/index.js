var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user', function(req, res, next) {
  const {
    email,name
  } =req.query
  
  console.log(email);
  res.render('index', { title: 'Express',company:'Logic Square', email,name });
});

router.get('/details', function(req, res, next) {
  res.json({error:false,response:'successful'})
});


router.get('/login',(req,res)=>{
  res.render('login')
})
router.get('/ma',(req,res)=>{
  console.log("This is main");
  res.render('main',{username:"Mrinal Bera",email:'mbera829@gmail.com',image:"/images/ProfilePic.jpeg"})
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
