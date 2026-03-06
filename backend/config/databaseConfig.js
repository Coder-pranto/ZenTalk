const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);

    console.log(
      `
  🎉 ${'MongoDB Connected'.rainbow}
  📡 Host     : ${conn.connection.host.brightBlue}
  📂 Database : ${conn.connection.name.magenta}
  `.bgCyan.bold,
    );
  } catch (error) {
    console.error(` MongoDB Error : ${error.message} `.white.bgRed.bold);
    process.exit();
  }
};

module.exports = connectDB;
