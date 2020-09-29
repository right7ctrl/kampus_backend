
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
            type: String,
            required: true
        },
        receiver_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

let Chat = mongoose.model("message", chatSchema);
module.exports = Chat;
