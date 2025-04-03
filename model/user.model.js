const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const user = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: function(v) {
            return /.+@.+/.test(v);
        }
    },
    password: String
});

const User = mongoose.model('User',user);

module.exports = User;