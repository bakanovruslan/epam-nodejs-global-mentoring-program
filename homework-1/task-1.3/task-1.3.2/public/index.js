"use strict";

var _fs = require("fs");

var _csvtojson = _interopRequireDefault(require("csvtojson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var readStream = (0, _fs.createReadStream)('./csv/addresses.csv');
readStream.on('error', function (error) {
  console.log(error.toString());
});
var writeStream = (0, _fs.createWriteStream)('./output.txt');
writeStream.on('error', function (error) {
  console.log(error.toString());
});
readStream.pipe((0, _csvtojson["default"])()).pipe(writeStream);