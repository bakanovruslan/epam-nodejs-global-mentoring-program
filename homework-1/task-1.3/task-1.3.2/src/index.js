import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';

const readStream = createReadStream('./csv/addresses.csv');
readStream.on('error', (error) => {
    console.log(error.toString());
});

const writeStream = createWriteStream('./output.txt');
writeStream.on('error', (error) => {
    console.log(error.toString());
});

readStream.pipe(csv()).pipe(writeStream);