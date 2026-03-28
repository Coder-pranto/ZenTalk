require('dotenv').config({ quiet: true });
require('colors');

const express = require('express');
const path = require('path');
const connectDB = require('./config/databaseConfig');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoute');
const userRoutes = require('./routes/userRoutes');
const { app, server} = require('./socket/socketConfig');

// Environment Variables
const PORT = process.env.PORT || 5001;
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zen-talk';
const NODE_ENV = process.env.NODE_ENV || 'development';

// ================= MIDDLEWARE =================

// Logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsers
app.use(express.json());
app.use(cookieParser());

// ================= ROUTES =================

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use('/api/users', userRoutes);

// ================= PRODUCTION SETUP =================

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/zen_talk/dist'))); 

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/zen_talk/dist/index.html')); 
  });
}

// ================= 404 HANDLER =================

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ================= GLOBAL ERROR HANDLER =================

app.use(errorMiddleware);

// ================= SERVER START =================

(async () => {
  try {
    await connectDB(URI);
    server.listen(PORT, () => {
        console.log(`> Server is up and running on port :${PORT}`.green.bgWhite.underline.red.bold);
        
    });
  } catch (error) {
    console.error(`Failed to start the server: ${error.message}`.underline.red);
  }
})();
