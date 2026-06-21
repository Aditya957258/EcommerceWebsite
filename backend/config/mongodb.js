import mongoose from "mongoose"

const connectDB = async () => {

    try {

        // =====================================
        // MONGOOSE STRICT MODE
        // =====================================

        mongoose.set("strictQuery", true)

        // =====================================
        // CONNECTION EVENTS
        // =====================================

        mongoose.connection.on("connected", () => {
            console.log("MongoDB Connected Successfully ✅")
        })

        mongoose.connection.on("error", (error) => {
            console.log("MongoDB Connection Error ❌")
            console.log(error.message)
        })

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB Disconnected ⚠️")
        })

        // =====================================
        // DATABASE CONNECTION
        // =====================================

        await mongoose.connect(process.env.MONGODB_URI, {

            dbName: "stylentra",

            autoIndex: true,

            serverSelectionTimeoutMS: 5000,

            socketTimeoutMS: 45000,
        })

    } catch (error) {

        console.log("Database Connection Failed ❌")

        console.log(error.message)

        process.exit(1)
    }
}

export default connectDB