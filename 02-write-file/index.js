const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const readline = require('readline')
const rl = readline.createInterface(stdin, stdout);
const file = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(file, 'utf8');

stdout.write('Введите текстовое сообщение: \n');
rl.on('line', data => {
  if (data === 'exit') {
    process.exit();
  }
  writeStream.write(`${data} \n`);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Увидимся, Student 1..))'));