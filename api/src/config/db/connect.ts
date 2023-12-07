import mongoose from "mongoose";

export const dbConnection= async () => {
  try {
    await mongoose.connect(process.env.DB_URI!); 
    console.log("***** DATABASE connected... *****");
  } catch (error) {
    console.log("***** DATABASE connection error... *****",  error);
  }
};


