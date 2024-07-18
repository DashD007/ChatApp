import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`).then(() => {console.log("connection successfull")})
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;