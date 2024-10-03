import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection: any = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://pavankumarkrn:kris770297@cluster0.l3mwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log(`MongoDB Connected: ${connection?.connection?.host}`);
    } catch (error: any) {
        console.log(`error ---> ${error?.message}`);
        process.exit(1);
    }
}