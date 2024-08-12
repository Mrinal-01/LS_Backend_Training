// const express = require('express');
// const router = express.Router();
// const Cart = require('../models/cart')
// const CartItems = require('../models/CartItem')
// const Order = require('../models/Order');
// const OrderItem = require('../models/OrderItems');


// // Get order details for a user
// // Get order details for a user
// router.get('/:userId/orders', async (req, res) => {
//   try {
//     // Find orders for the user
//     const orders = await Order.find({ _userId: req.params.userId });

//     // Check if no orders found
//     if (!orders || orders.length === 0) {
//       return res.status(404).send({ message: 'No orders found for this user.' });
//     }

//     // Prepare response data
//     const orderDetails = await Promise.all(orders.map(async order => {
//       const orderItems = await OrderItem.find({ _orderId: order._id }).populate('_productId');
      
//       const items = orderItems.map(item => ({
//         product: item._productId,
//         quantity: item.quantity,
//         priceAtPurchase: item.priceAtPurchase,
//         itemTotal: item.quantity * item._productId.sellPrice // Calculate item total
//       }));

//       const totalAmount = items.reduce((total, item) => total + item.itemTotal, 0); // Calculate order total

//       return {
//         orderId: order._id,
//         orderStatus: order.orderStatus,
//         createdAt: order.createdAt,
//         updatedAt: order.updatedAt,
//         items,
//         totalAmount
//       };
//     }));

//     res.status(200).send(orderDetails);
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// });

// // Checkout and create an order from the cart
// router.post('/:userId/checkout', async (req, res) => {

//   const { userId } = req.params;
//   try {
    
    
//     const cart = await Cart.findOne({ _userId: userId });
    
  
//     if (!cart) {
//       return res.status(404).send({ message: 'Cart not found' });
//     }
    
//     const cartItems = await CartItems.find({ _cartId: cart._id }).populate('productId');
    
  
//     const order = new Order({
//       _userId: userId,
//       orderStatus: 'pending',
//       totalAmount: cartItems.reduce((total, item) => total + item.quantity * item.productId.sellPrice, 0)
//     });
    
//     let abc = await order.save();
//     // console.log("dekhi ki ache", order)
//     console.log(cartItems);
    
    
//     const orderItems = cartItems.map(cartItem => ({
//       _orderId: order._id,
//       _productId: cartItem.productId._id,
//       quantity: cartItem.quantity,
//       priceAtPurchase: cartItem.productId.sellPrice
//     }));
  
//     await OrderItem.insertMany(orderItems);

//     await CartItem.deleteMany({ _cartId: cart._id });
//     await Cart.deleteOne({ _id: cart._id });
//     console.log(abc);
    
//     // res.status(200).send(abc);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// module.exports = router;
