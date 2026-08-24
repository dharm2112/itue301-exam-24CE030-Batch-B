const express = require('express');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.post('/', authGuard, createOrder);
router.get('/', authGuard, getOrders);
router.patch('/:id/status', authGuard, updateOrderStatus);

module.exports = router;
