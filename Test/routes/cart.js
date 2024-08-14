const express = require("express");
const router = express.Router();
const User=require("../models/user.js")
const Cart = require("../models/cart.js");
const Product = require("../models/product.js");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtAuthMiddleware} = require("../jwt");

// 1st we need userId,productId and also check if the product already available or not
// Add product to cart
router.post("/add/to-cart",jwtAuthMiddleware, async (req, res) => {
  console.log("Inside add to cart");
  
  const { productId, quantity, userId } = req.body;
  try {
    let cart = await Cart.findOne({ _userId: userId }).exec(); //find in the Cart schema if cart for the particular user available or not
    const product = await Product.findOne({ _id: productId }).exec(); //Getting the product from the Product schema using the productId Sent in the body
    if (product === null) throw new Error("Product not found!"); //If product not available it will through error

    console.log("product -> ", product.sellPrice);

    if (cart === null) {
      if (quantity === -1) throw new Error("Quantity cannot be negetive!"); //Cart is null means create new cart but if u sent -1 quantity through error
       //Below code will create a new cart Item with the below fields
      cart = Cart.create({
        _userId: userId,
        productDetails: [
          {
            _product: productId,
            sellingPrice: product.sellPrice,
            quantity: 1,
          },
        ],
        totalPrice: product.sellPrice,
      });
    } else {
      if (Array.isArray(cart.productDetails)) {     //If cart is not empty check if its array or not
        if (cart.productDetails.length === 0) {
          if (quantity === -1) throw new Error("Quantity cannot be negetive!");
          cart.productDetails.push({
            _product: productId,
            sellingPrice: product.sellPrice,
            quantity: 1,
          });
          cart.totalPrice = product.sellPrice;
          await cart.save();
        } else {
          const index = cart.productDetails.findIndex(
            (el) => String(el._product) === String(productId)
          );
          console.log("index -> ", index);
          let totalProductPrice = 0;
          let productDetailsArray = [];
          if (index === -1) {
            if (quantity === -1)
              throw new Error("Quantity cannot be negetive!");
            productDetailsArray = cart.productDetails;

            productDetailsArray.push({
              _product: productId,
              sellingPrice: product.sellPrice,
              quantity: 1,
            });

            productDetailsArray.forEach((elm) => {
              totalProductPrice += elm.quantity * elm.sellingPrice;
            });
            cart.productDetails = productDetailsArray;
            cart.totalPrice = totalProductPrice;
          } else {
            productDetailsArray = cart.productDetails;
            if (quantity === -1 && productDetailsArray[index].quantity === 1) {
              await Cart.updateOne(
                {
                  _userId: userId,
                },
                {
                  $pull: {
                    productDetails: {
                      _product: productId,
                    },
                  },
                }
              ).exec();
              cart = await Cart.findOne({ _userId: userId }).exec();
              cart.productDetails.forEach((elm) => {
                totalProductPrice += elm.quantity * elm.sellingPrice;
              });
              cart.totalPrice = totalProductPrice;
            } else {
              productDetailsArray[index].sellingPrice = product.sellPrice;
              productDetailsArray[index].quantity += quantity;
              productDetailsArray.forEach((elm) => {
                totalProductPrice += elm.quantity * elm.sellingPrice;
              });
              cart.productDetails = productDetailsArray;
              cart.totalPrice = totalProductPrice;
            }
          }
          await cart.save();
        }
      }
    }
    res.status(200).json({error: false,cart});
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update product quantity in cart
router.post("/:userId/update", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ _userId: userId });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    let cartItem = await CartItem.findOne({ _cartId: cart._id, productId });

    if (cartItem) {
      if (quantity <= 0) {
        await CartItem.deleteOne({ _id: cartItem._id });
      } else {
        cartItem.quantity = quantity;
        await cartItem.save();
      }
    } else {
      return res.status(404).send({ message: "Cart item not found" });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Remove product from cart
router.post("/:userId/remove", async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ _userId: userId });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    await CartItem.deleteOne({ _cartId: cart._id, productId });

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get cart for a user
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ _userId: req.params.userId }).populate('_userId','name')
    .populate('productDetails._product','name').exec();

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    const response={
      userId:cart._userId.id,
      name:cart._userId.name,
      products:cart.productDetails.map(e=>({
        ProductName:e._product.name,
        Price: e.sellingPrice,
        Quantity:e.quantity
      })),
      TotalPrice:cart.totalPrice
    }
    console.log(response);
    
    res.status(200).send({ response});
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
