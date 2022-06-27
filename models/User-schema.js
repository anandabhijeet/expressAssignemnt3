'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;



const user_schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String
      },
    phone:{
        type: String,
        required: true,
    }
}) 

user_schema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };

module.exports = mongoose.model("Users", user_schema);