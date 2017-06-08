'use strict';
const readline = require('readline');
const chalk = require('chalk');
const search = require('./search');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.setPrompt(chalk.magenta.dim('Enter a search item: '));
var getQuery = false;
console.log(chalk.blue('Enter \'\\\' to search.'));
rl.prompt();
rl.on('line', (input) => {
  if (getQuery) {
    search.query(input).forEach((i) => console.log(chalk.blue.bold('RESULT:'), i));
    rl.setPrompt(chalk.magenta.dim('Enter a search item: '));
    getQuery = false;
    search.clear();
  } else if (input == '\\') {
    getQuery = true;
    rl.setPrompt(chalk.magenta.dim('Enter a search query: '));
  } else {
    search.register(input);
  }
  rl.prompt();
});
