"use strict";

process.stdin.on('data', function (data) {
  process.stdout.write("".concat(data.reverse().toString(), "\n\n"));
});