import mongoose from "mongoose";

let isConnected: boolean = false; 

export const connectToDB = async (): Promise<void> => {

  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "share_prompt"
    });

    isConnected = true; 
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};
