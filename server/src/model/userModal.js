const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_online: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, {timestamps: true});

const User =  new mongoose.model("User", usersSchema)
module.exports = User