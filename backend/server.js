require('dotenv').config({ quiet: true });
require('colors');

const express = require('express');
const connectDB = require('./config/databaseConfig');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Environment Variables
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zen-talk';
const NODE_ENV = process.env.NODE_ENV || 'development';

// ================= MIDDLEWARE =================

// CORS
app.use(cors());

// Logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================

// Health check route
app.get('/', (_, res) => {
  res.status(200).json({
    success: true,
    message: 'ZenTalk API is running 🚀',
  });
});


// API routes
app.use("/api/auth", authRoutes);


// ================= 404 HANDLER =================

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ================= GLOBAL ERROR HANDLER =================

app.use((err, _, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  console.error('🔥 Server Error:', err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ================= SERVER START =================

(async () => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => {
        console.log(`> Server is up and running on: http://localhost:${PORT}`.green.bgWhite.underline.red.bold);
        
    });
  } catch (error) {
    console.error(`Failed to start the server: ${error.message}`.underline.red);
  }
})();
