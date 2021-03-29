process.stdin.setEncoding('utf8');

process.stdin.resume();
process.stdin.on('data', (inputData) => {
    return process.stdout.write(inputData.split('').reverse().join('') + '\n\n');
});