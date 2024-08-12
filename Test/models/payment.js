const mongoose=require("mongoose")

const paymentSchema = new Schema({
  _orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  paymentMethod: { type: String, enum: ['credit card', 'PayPal'], required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['successful', 'failed'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
