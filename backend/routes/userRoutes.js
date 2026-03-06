const router = require('express').Router();
const { getProfile, updateProfile, toggleWishlist, getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.put('/wishlist/:productId', protect, toggleWishlist);
router.get('/', protect, admin, getAllUsers);

module.exports = router;