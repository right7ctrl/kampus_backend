
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema(
    {
        id: {
            type: Number,
            min: 1,
            max: 99999999999,
            default: 1
        },
        name: {
            type: String,
            min: 3,
            required: true
        },
        username: {
            type: String,
            min: 6,
            max: 32,
            required: true
        },
        mail: {
            type: String,
            max: 100,
            min: 5,
            required: true
        },
        password: {
            type: String,
            min: 8,
            max: 32,
            required: true
        },
        phone: {
            type: String,
            min: 9,
            max: 15
        },
        school: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            max: 400
        },
        avatar: {
            type: String
        },
        token: {
            type: String
        }
    },
    {
        timestamps: true
    });

let Chat = mongoose.model("user", chatSchema);
module.exports = Chat;
