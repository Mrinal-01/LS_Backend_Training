const mongoose=require("mongoose")


const orderItemSchema = new mongoose.Schema({
  _orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  _productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);