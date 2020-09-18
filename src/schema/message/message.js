
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema(
    {
        message: {
            type: Number
        },
        sender: {
            type: String
        }
    },
    {
        timestamps: true
    });

let Chat = mongoose.model("message", chatSchema);
module.exports = Chat;
