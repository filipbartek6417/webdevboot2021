const franc = require('franc');
const langs = require('langs');
const colors = require('colors');

const input = langs.where('2', franc(process.argv[2]));

if (input != undefined) {
  console.log(input.name.green);
} else {
  console.log("We couldn't recognize that language".red);
}
