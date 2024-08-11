import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/todo`
    );
    console.log(
      `Mongo DB connected At Db host ${ConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongo Db connection error", error);
    process.exit(1);
  }
};

export default connectDB;
