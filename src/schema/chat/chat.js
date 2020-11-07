
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const message = require('../message/message');
const Schema = mongoose.Schema;
const chatsSchema = new Schema(
    {
        receiver_id: {
            type: ObjectId,
            required: true
        },
        sender_id: {
            type: ObjectId,
            required: true
        },
        messages: {
            type: Array,
            min: 0
        },
    },
    {
        timestamps: true
    });

let Chats = mongoose.model("chats", chatsSchema);
module.exports = Chats;
