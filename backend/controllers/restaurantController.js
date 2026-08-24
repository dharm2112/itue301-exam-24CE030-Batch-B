const Restaurant = require('../models/Restaurant');

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      success: true,
      restaurants
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRestaurants };
