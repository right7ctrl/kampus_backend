
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            min: 0,
            max: 255
        },
        sender_id: {
            type: Number,
            required: true,
            min: 1,
            max: 9999999999
        },
        receiver_id: {
            type: Number,
            required: true,
            min: 1,
            max: 9999999999
        }
    },
    {
        timestamps: true
    });

let Chat = mongoose.model("message", chatSchema);
module.exports = Chat;
