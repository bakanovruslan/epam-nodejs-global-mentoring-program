const fs = require('fs');
const csv = require('csvtojson');

const readStream = fs.createReadStream('./csv/addresses.csv');
readStream.on('error', (error) => {
    console.log(error.toString());
});

const writeStream = fs.createWriteStream('./output.txt');
writeStream.on('error', (error) => {
    console.log(error.toString());
});

readStream.pipe(csv()).pipe(writeStream);