const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoRelationship', { useNewUrlParser: true, useUrlEncoded: true })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch(err => {
    console.log("Mongo error");
    console.log(err);
  })

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  address: [
    {
      street: String,
      city: String,
      state: String,
      country: String
    }
  ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
  const u = new User({
    first: 'Ron',
    last: 'Weasley'
  })
  u.address.push({
    _id: { id: false },
    street: 'Privet Drive',
    city: 'Surrey',
    state: 'Yorkshire',
    country: 'United Kingdom'
  })
  const res = await u.save();
  console.log(res);
}

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.address.push({
    street: 'Zellova 67',
    city: 'Trnava',
    state: 'Zahori',
    country: 'Slovakia'
  })
  const res = await user.save()
  console.log(res);
}

makeUser();
//addAddress(); //won't work for now
