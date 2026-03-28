import mongoose from "mongoose";


const connecDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected success");
  } catch (error) {
    console.log("while connected database", error);
  }
};

export default connecDB