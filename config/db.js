const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try { 
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to mongodb Database ${mongoose.connection.host}`.bgGreen.white)
    } catch (e) {
        console.log(`Mongodb Database Error ${e}`.bgRed.white)
    }
}
module.exports = connectDB

