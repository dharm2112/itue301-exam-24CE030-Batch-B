const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Connect to Database
connectDB();

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'QuickBite API is running'
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/orders', orderRoutes);

// Global Error Handler Middleware (Must be defined last after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
