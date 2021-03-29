const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const fileToWrite = './csv/file.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(fileToWrite);

readStream.on("error", (err) => {
    console.log('file read error');
});
writeStream.on("error", (err) => {
    console.log('file write error');
});

csv({ checkType: true })
    .fromStream(readStream)
    .subscribe(
        (json) => {
            delete json['Amount'];
            const map = new Map();
            for (const [key, value] of Object.entries(json)) {
                map.set(key.toLowerCase(), value);
            }
            writeStream.write(`${JSON.stringify(Object.fromEntries(map))}\n`);
        },
        (err) => {
            if (err) {
                console.error('Pipeline failed.', err);
            } else {
                console.log('Pipeline succeeded.');
            }
        }
    );
