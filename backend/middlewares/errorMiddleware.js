const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  console.error('🔥 Server Error:', err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorMiddleware;
