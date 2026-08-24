const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
