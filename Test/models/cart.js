const mongoose=require("mongoose")
const Product=require('./product')

const CartSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productDetails: [
    {
      _product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
      },
      sellingPrice: {type:Number,required:true}, // per product selling price
      quantity: { type: Number, required: true } // how many product to be added
    }
  ],

  totalPrice: {type:Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
    