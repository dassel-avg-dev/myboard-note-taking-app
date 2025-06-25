import mongoose from 'mongoose'
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected succesfully");
    }
    catch(error) {
        console.error("Error: Connecting to MongoDB", error);
        process.exit(1);
    }
}