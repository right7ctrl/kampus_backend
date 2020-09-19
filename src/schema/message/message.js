
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema(
    {
        id: {
            type: Number,
            min: 1,
            max: 99999999999,
            required: true
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
