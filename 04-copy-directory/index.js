const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

fs.mkdir(folderCopy, { recursive: true }, (err) => {
  if (err) {
    return console.log(err);
  }
});

fs.readdir(folderCopy, (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach(file => {
    fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
      if (err) {
        return console.log(err);
      }
    });
  });
});

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach(file => {
    if (file.isFile()) {
      const fileSrc = path.join(__dirname, 'files', file.name);
      const fileDest = path.join(__dirname, 'files-copy', file.name);
      fs.copyFile(fileSrc, fileDest, (err) => {
        if (err) {
          return console.log(err);
        }
      });
    }
  });
});

console.log('All files were copied');
