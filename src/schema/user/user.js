
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {   
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
        email: {
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
            type: String,
            default: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.png"
        },
        token: {
            type: String
        },
        isOnline: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    });

let schema = mongoose.model("user", userSchema);
module.exports = schema;
