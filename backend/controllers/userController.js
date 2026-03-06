const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const getProfile = asyncHandler(async (req, res) => {
  res.json(await User.findById(req.user._id).populate('wishlist'));
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;
  res.json(await user.save());
});

const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const pid = req.params.productId;
  const idx = user.wishlist.indexOf(pid);
  if (idx > -1) user.wishlist.splice(idx, 1);
  else user.wishlist.push(pid);
  await user.save();
  res.json({ wishlist: user.wishlist });
});

const getAllUsers = asyncHandler(async (req, res) => {
  res.json(await User.find({}).select('-password'));
});

module.exports = { getProfile, updateProfile, toggleWishlist, getAllUsers };