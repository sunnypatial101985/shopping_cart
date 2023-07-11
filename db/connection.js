import mongoose from 'mongoose'
const connectDb = async(URL, Db) => {
    try {
        await mongoose.connect(URL + Db);
        console.log("Database connected.")
    } catch (error) {
        console.log(error)
    }
}
export default connectDb