"use strict";

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.string.split.js");

process.stdin.setEncoding('utf8');
process.stdin.resume();
process.stdin.on('data', inputData => {
  return process.stdout.write(inputData.split('').reverse().join('') + '\n\n');
});