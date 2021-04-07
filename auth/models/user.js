const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Fill in username']
  },
  password: {
    type: String,
    required: [true, 'Fill in password']
  }
})

userSchema.statics.findAndValidate = async function (username, password) {
  const user = await this.findOne({username});
  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? foundUser : false;
}

userSchema.pre('save', async function(next){
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

module.exports = mongoose.model('User', userSchema);
