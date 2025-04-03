const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const user = new Schema({
    email: {
        type: String,
        unique: true,
        validate: function(value){
            return /.+@.+/.test(value);
        }
    },
    password: String,
    roles: Array
});

const User = mongoose.model('User',user);

module.exports = User;