const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
