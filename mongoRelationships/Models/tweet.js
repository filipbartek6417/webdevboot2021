const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/mongoRelationship', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch(err => {
    console.log("Mongo error");
    console.log(err);
  })


const userSchema = new Schema({
  username: String,
  age: Number,
})

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
})


const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)

// const makeTweet = async() => {
//   const u2 = await User.findOne({ username: 'whatever' });
//   const t2 = new Tweet({text:'dsgfdgfs sgfdgfhtgrsefdb', likes:0});
//   t2.user = u2;
//   u2.save();
//   t2.save();
// }
//
// makeTweet();

const findTweets = async() => {
  const t = await Tweet.findOne({}).populate('user', 'username');
  console.log(t);
}

findTweets();
