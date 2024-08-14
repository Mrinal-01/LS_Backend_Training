const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
require('dotenv').config()

// Middleware
app.use(bodyParser.json());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect("mongodb://localhost:27017/ShoppinCart", {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Import routes
// const loginRoutes=require("./routes/login")
const userRoutes = require("./routes");
// const userRoutes = require("./routes/user");
// const categoryRoutes=require("./routes/category")
// const productRoutes=require("./routes/product")
// const cartRoutes = require('./routes/cart');
// // const orderRoutes=require("./routes/order")
// const loginRoutes=require('./routes/login')

// Use routes
app.use("/api", userRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/categories",categoryRoutes)
// app.use('/api/products',productRoutes)
// app.use('/api/carts', cartRoutes)
// // app.use('/api/orders',orderRoutes)
// app.use('/api/auth',loginRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
