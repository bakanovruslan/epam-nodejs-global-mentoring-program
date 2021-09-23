import process from 'process';

process.stdin.on('data', function (data) {
    process.stdout.write(`${data.reverse().toString()}\n\n`);
});