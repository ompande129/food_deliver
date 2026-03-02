// schema for user collection in database, also contains methods for hashing password, comparing password and generating auth token
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [2, "First name must be at least 2 characters long"],
        },
        lastname : {
            type : String,
            minlength : [3, "Last name must be at least 3 characters long"],
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength : [5, "Email must be atleast 5 character long"]
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    socketId : {
        type : String,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : "24h"});
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;