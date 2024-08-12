const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require("bcryptjs")
const bodyParser=require('body-parser')

const app=express();
const port=3000

app.use(bodyParser.json())

const users=[]

const SECRET_KEY="your-256-bit-secret";

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
      return res.status(400).send('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);        // Hash the password

  // Store user in "database"
  users.push({ username, password: hashedPassword });

  res.send({message:'User registered successfully',users});
});
app.post('/login',async (req,res)=>{
  const {username,password}=req.body
  const user=users.find(user=>user.username===username);
  if(!user) return res.status(400).send("User not found")

  const isPasswordValid=await bcrypt.compare(password,user.password)      // Compare the password
  if(!isPasswordValid){
    return res.status(401).send("Invalid Password")
  }
  
  const token=jwt.sign({username},SECRET_KEY,{expiresIn:'5m'})     // Create a JWT token

  res.json({token})

})


// Protected endpoint
app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
      return res.status(401).send('Access denied');
  }

  try {
      // Verify the token
      const decoded = jwt.verify(token, SECRET_KEY);
      res.json({ message: 'Access granted', decoded });
  } catch (error) {
      res.status(401).send('Invalid token');
  }
});











app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`);
  
})