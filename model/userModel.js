const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken : {
            type : String,
            required : false
        }
    },
    {
        collection: "users"
    }
);

module.exports = mongoose.model("users",userSchema);