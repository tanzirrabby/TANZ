const router = require('express').Router();
const { createOrder, createPaymentIntent, getMyOrders, getOrder, payOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.post('/payment-intent', protect, createPaymentIntent);
router.get('/mine', protect, getMyOrders);
router.route('/:id').get(protect, getOrder);
router.put('/:id/pay', protect, payOrder);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;