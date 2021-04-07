const bcrypt = require('bcrypt');

// const hashPassword = async (pw) => {
//   const salt = await bcrypt.genSalt(12);
//   const hash = await bcrypt.hash(pw, salt);
//   console.log(hash);
// }

const hashPassword = async (pw) => {
  const hash = await bcrypt.hash(pw, 12);
  console.log(hash);
}

const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
    return console.log('Successfully logged in');
  }
  console.log('Failed');
}

hashPassword('monkey');
//login('monkey!', '$2b$12$nn3/kJMRn7yhzGz88SNJVOpgEDwmqLlS70k6nz6oSds/s3I0iv6m6');
