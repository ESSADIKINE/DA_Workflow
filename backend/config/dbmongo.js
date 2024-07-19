import mongoose from 'mongoose';
import config from './config.js';

const connectMongo = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    throw new Error('MongoDB connection error');
  }
};

export default connectMongo;
