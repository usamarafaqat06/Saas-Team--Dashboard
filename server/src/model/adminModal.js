const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
}, {timestamps: true});

const Admin =  new mongoose.model("Admin", adminSchema)
module.exports = Admin