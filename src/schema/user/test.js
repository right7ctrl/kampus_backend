
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
        }
    },
    {
        timestamps: true
    });

let User = mongoose.model("user", userSchema);
module.exports = User;
