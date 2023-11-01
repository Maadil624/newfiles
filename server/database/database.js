import mongoose from "mongoose";
let conn
const connectDB = async () => {
    try {
        conn = await mongoose.connect('mongodb+srv://maadil624:Mad1234@cluster0.ioujzvf.mongodb.net/?retryWrites=true&w=majority')
        console.log("connected to mongoDB.....")
    }
    catch (err) {
        console.log(`mongoDB err : ${err}`)
    }
}
export const dbname = conn;
export default connectDB