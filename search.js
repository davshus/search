'use strict';
const readline = require('readline');
const chalk = require('chalk');
var unique = (input) => input.toLowerCase().split("").reduce((a, b) => a + (a.indexOf(b) == -1 ? b : ""), "");
module.exports = {
  _list: [],
  register: function(input) {
    this._list.push(input);
  },
  query: function(regex) {
    let direct = regex;
    let loose = regex.toLowerCase()
      .split("")
      .reduce((a, b) => a == '' ? '(' + b + ')' : a + '[^' + b + ']*(' + b + ')', '') + '.*';
    let directMatches = [], looseMatches = [];
    for (let i = 0; i < this._list.length; i++) {
      let directMatch = this._list[i].match(direct), looseMatch = this._list[i].match(loose);
      if (directMatch) {
        directMatches.push(this._list[i].substring(0, directMatch.index)
          + chalk.green.bold(this._list[i].substring(directMatch.index, directMatch.index + directMatch[0].length))
          + this._list[i].substring(directMatch.index + directMatch[0].length));
      } else if (looseMatch) {
        if (!looseMatch) continue;
        let looseMatchLetterInd = 1, matchBuilder = '';
        for (let j = looseMatch.index; j < this._list[i].length; j++) {
          if (this._list[i][j] == looseMatch[looseMatchLetterInd]) {
            matchBuilder += chalk.green.bold(this._list[i][j]);
            looseMatchLetterInd++;
            if (looseMatchLetterInd == looseMatch.length) {
              matchBuilder += this._list[i].substring(j + 1);
              break;
            }
          } else matchBuilder += this._list[i][j];
        }
        looseMatches.push(matchBuilder);
      }
    }
    let returnMatches = directMatches;
    returnMatches.push.apply(returnMatches, looseMatches);
    return returnMatches;
  },
  clear: function () {
    this._list = [];
  }
};
