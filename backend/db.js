const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("Database Connection Error:", err);
  }
};

connectDB();