import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

export async function setupMongo(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('✅ DB already connected.');
      return;
    }
    

    // Escolhe a URL correta com base no ambiente
    const mongoUri =
      process.env.MONGO_URL === 'production'
        ? process.env.MONGO_URL
        : process.env.MONGO_LOCAL_URL;

    if (!mongoUri) {
      throw new Error('❌ MongoDB connection string is missing.');
    }

    console.log(`🎲 Connecting to ${process.env.MONGO_URL} database...`);
    await mongoose.connect(mongoUri);

    console.log('✅ DB Connected Successfully!');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw new Error('DB connection failed.');
  }
}
