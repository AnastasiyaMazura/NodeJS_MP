const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const fileToWrite = './csv/file.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeSyream = fs.createWriteStream(fileToWrite);

readStream.on("error", (err) => {
    console.log('file read error');
});
writeSyream.on("error", (err) => {
    console.log('file write error');
});

pipeline(
    readStream,
    csv(),
    writeSyream,
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
