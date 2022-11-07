const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(bundle, 'utf8');


fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name).slice(1) === 'css') {
      const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');
        readStream.on('data', data => {
          writeStream.write(`${data} \n`);
        });
      }
    });
});

