'use strict'
const readline = require('readline');
const chalk = require('chalk');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
var list = [];
var action = "compose";
var unique = (input) => input.toLowerCase().split("").reduce((a, b) => a + (a.indexOf(b) == -1 ? b : ""), "");
var funcs = {
  compose: function(input) {
    list.push(input);
  },
  search: function(regex) {
    let direct = regex;
    let loose = regex.toLowerCase()
      .split("")
      .reduce((a, b) => a == "" ? b : a + '[^' + b + ']*' + b, "") +'.*';
    list.forEach((curr, ind, arr) => {
      if (curr.match(loose)) console.log(curr.split('').map(k => regex.toLowerCase().indexOf(k) != -1 ? chalk.green.bold(k) : k).join(''));
    });
    // let directMatches = [], looseMatches = [];
    // list.forEach((curr, ind, arr) => {
    //   if (curr.match(direct)) directMatches.push(curr);
    //   else if (curr.match(loose)) looseMatches.push(curr);
    // });
  }
};
funcs.compose('bubbles');
funcs.compose('bubbleskl');
funcs.compose('bjufdfbbkjles');
console.log(funcs.search('bubbles'));
// rl.on('line', (input) => {
//   switch (action) {
//     case "compose":
//   }
// });
