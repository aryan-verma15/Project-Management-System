import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connection Successfull");
    } catch (error) {
        console.error("MondoDB Connection Error");
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
