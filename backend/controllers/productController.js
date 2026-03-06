const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, featured, page = 1, limit = 12 } = req.query;
  const query = {};
  if (category && category !== 'All') query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  if (featured === 'true') query.isFeatured = true;

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .sort({ createdAt: -1 });

  res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
});

// @GET /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  res.json(product);
});

// @POST /api/products (admin)
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @PUT /api/products/:id (admin)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) { res.status(404); throw new Error('Product not found'); }
  res.json(product);
});

// @DELETE /api/products/:id (admin)
const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product removed' });
});

// @POST /api/products/:id/reviews
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) { res.status(400); throw new Error('Already reviewed'); }
  product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
  product.calcRating();
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct, addReview };
