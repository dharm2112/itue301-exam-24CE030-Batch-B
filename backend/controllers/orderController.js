const Order = require('../models/Order');

const createOrder = async (req, res, next) => {
  try {
    const { restaurantId, items, totalAmount } = req.body;

    const order = await Order.create({
      customerId: req.user.id,
      restaurantId,
      items,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user.id })
      .populate('customerId', 'name email')
      .populate('restaurantId', 'name cuisine');

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus
};
