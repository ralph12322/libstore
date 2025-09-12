"use server";
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://dwanerz:Nezuko17%3F@cluster0.d62d0.mongodb.net';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not defined');
}

let isConnected = false;

export const connectDb = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
  dbName: 'tracktag',
});

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};
