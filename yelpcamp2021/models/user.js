const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
})
userSchema.plugin(passportLocalMongoose); // adding userSchema to passport // magic :)))

module.exports = mongoose.model('User', userSchema);