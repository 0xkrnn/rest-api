const mongoose = require("mongoose");
const { error } = require("node:console");
require("dotenv").config();
const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
    try {

        mongoose.connect(MONGODB_URL);
        const connection = mongoose.connection;
        connection.once("open", () => console.log("connected to DB"));
        connection.on("error", () => {
            console.log(error);
        })

    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;