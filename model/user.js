const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    mobile: Number,
    name: String,
    password: String,
    status: Boolean
},
    { timestamps: true }
);
const user = mongoose.model("User", userSchema);
module.exports = user