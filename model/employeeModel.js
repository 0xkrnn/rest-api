const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        department : {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        }
    },
    {
        collection : "employee"
    }
);

module.exports = mongoose.model('employee',employeeSchema)
