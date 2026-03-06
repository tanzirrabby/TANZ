const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  emoji:    { type: String },
  price:    { type: Number, required: true },
  qty:      { type: Number, required: true },
  size:     { type: String },
  image:    { type: String }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems:     [orderItemSchema],
  shippingAddress: {
    name:    String,
    email:   String,
    phone:   String,
    street:  String,
    city:    String,
    zip:     String,
    country: String
  },
  paymentMethod:  { type: String, default: 'Stripe' },
  paymentResult:  { id: String, status: String, update_time: String, email: String },
  itemsPrice:     { type: Number, required: true },
  shippingPrice:  { type: Number, required: true },
  totalPrice:     { type: Number, required: true },
  isPaid:         { type: Boolean, default: false },
  paidAt:         Date,
  isDelivered:    { type: Boolean, default: false },
  deliveredAt:    Date,
  status: {
    type: String,
    enum: ['processing','confirmed','shipped','delivered','cancelled'],
    default: 'processing'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);