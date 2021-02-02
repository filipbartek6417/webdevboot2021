// // function makeColor(r,g,b) {
// //   const color = {};
// //   color.r = r;
// //   color.g = g;
// //   color.b = b;
// //   color.rgb = function () {
// //     const { r, g, b } = this;
// //     return `rgb(${r}, ${g}, ${b})`;
// //   };
// //   color.hex = function () {
// //     const { r, g, b } = this;
// //     return (
// //       '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
// //     );
// //   };
// //   return color;
// // }
// //
// // const firstColor = makeColor(35, 22, 220);
//
// function Color(r,g,b) {
//   this.r = r;
//   this.g = g;
//   this.b = b;
// }
//
// Color.prototype.rgb = function () {
//   const {r,g,b} = this;
//   return `rgb(${r},${g},${b})`;
// }
//
// Color.prototype.hex = function () {
//   const {r,g,b} = this;
//   return ('#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
// };
//
// Color.prototype.rgba = function (a=1) {
//   const {r,g,b} = this;
//   return `rgba(${r},${g},${b},${a})`;
// };
//
// const newColor = new Color(100,25,244);

class Color {
  constructor(r,g,b,name){
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
  }
  rgb(){
    const {r,g,b} = this;
    return `rgb(${r},${g},${b})`;
  }
  hex(){
    const {r,g,b} = this;
    return ('#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
  }
  hsl(){
    const {h,s,l} = this;
    return `hsl(${h},${s}%,${l}%)`;
  }
  calcHSL(){
    let {r,g,b} = this;
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r){
      h = ((g - b) / delta) % 6;
    }
    else if (cmax == g){
      h = (b - r) / delta + 2;
    }
    else if (cmax == b){
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s*100).toFixed(1);
    l = +(l*100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;
  }
}

const r1 = new Color(123, 254, 8, 'neon green');

class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat(){
    return `${this.name} is eating!`;
  }
}

class Cat extends Animal{
  constructor(name, age, livesLeft){
    super(name, age);
    this.livesLeft = livesLeft;
  }
  meow(){
    return `Meow!`;
  }
  lives(){
    return `This cat has ${this.livesLeft}`;
  }
}

let cat1 = new Cat('mia', 4, 9);

// class Dog {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   eat(){
//     return `${this.name} is eating!`;
//   }
// }
