const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const rand = Math.random();
    setTimeout(() => {
      if (rand < 0.5) {
        resolve('success');
      }
      reject('failure');
    }, 1000)
  })
}

// fakeRequest('/hey/dogs')
// .then((data) => {
//    console.log(data);
// })
// .catch((data) => {
//   console.log(data);
// })

const delayedColorChange = (color, delay) => {
  return new Promise(function(resolve, reject) {
     setTimeout(() => {
       document.body.style.backgroundColor = color;
       resolve();
     }, delay)
     if (color === 'indigo'){
       reject();
     }
  });
}

// delayedColorChange('red', 1000)
// .then(() => delayedColorChange('orange', 1000))
// .then(() => delayedColorChange('yellow', 1000))
// .then(() => delayedColorChange('green', 1000))
// .then(() => delayedColorChange('blue', 1000))
// .then(() => delayedColorChange('violet', 1000))
// .catch(() => console.log("oopsie daisie"))

const login = async (pass, username) => {
  if (!username || !pass) throw 'Missing Credentials'
  if (pass === 'corgifeetarecute') return 'Welcome'
  throw 'Invalid password'
}

login('corgifeetarecute','safdgfhjf')
.then(msg => console.log(msg))
.catch(msg => console.log(msg))


async function rainbow(delay) {
  while (true) {
    await delayedColorChange('red', delay)
    await delayedColorChange('orange', delay)
    await delayedColorChange('yellow', delay)
    await delayedColorChange('green', delay)
    await delayedColorChange('blue', delay)
    await delayedColorChange('violet', delay)
  }
}

async function makeTwoRequests() {
  try {
      let data = await fakeRequest('/url')
      let data2 = await fakeRequest('/url')
      console.log(data, data2);
  } catch (e) {
    console.log(e);
  }
}
