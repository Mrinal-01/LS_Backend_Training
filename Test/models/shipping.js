const mongoose=require("mongoose")

const shippingSchema = new Schema({
  _orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  shippingAddress: String,
  shippingMethod: String,
  trackingNumber: String,
  shippingStatus: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipping', shippingSchema);

