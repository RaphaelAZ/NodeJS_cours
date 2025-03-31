const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const user = new Schema({
    email: String,
    password: String
});

const User = mongoose.model('User',user);

module.exports = User;