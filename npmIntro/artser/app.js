const figlet = require('figlet');
const colors = require('colors');

figlet('Hello World!', (err, data) => {
  if (err) {
    console.dir(err);
    return;
  }
  console.log(data);
})
