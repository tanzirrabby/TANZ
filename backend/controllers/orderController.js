const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @POST /api/orders
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
  if (!orderItems?.length) { res.status(400); throw new Error('No order items'); }
  const order = await Order.create({
    user: req.user._id, orderItems, shippingAddress,
    paymentMethod, itemsPrice, shippingPrice, totalPrice
  });
  res.status(201).json(order);
});

// @POST /api/orders/payment-intent
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    automatic_payment_methods: { enabled: true }
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

// @GET /api/orders/mine
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @GET /api/orders/:id
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) { res.status(404); throw new Error('Order not found'); }
  res.json(order);
});

// @PUT /api/orders/:id/pay
const payOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Order not found'); }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.status = 'confirmed';
  order.paymentResult = { id: req.body.id, status: req.body.status, update_time: req.body.update_time, email: req.body.payer?.email_address };
  await order.save();
  res.json(order);
});

// @GET /api/orders (admin)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

// @PUT /api/orders/:id/status (admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(order);
});

module.exports = { createOrder, createPaymentIntent, getMyOrders, getOrder, payOrder, getAllOrders, updateOrderStatus };

