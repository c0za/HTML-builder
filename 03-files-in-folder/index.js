const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach(file => {
    if (file.isFile()) {
      const filePath = path.join(__dirname, 'secret-folder', file.name);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return console.log(err);
        }
        const fileSize = (stats.size / 1024).toFixed(3);
        const name = path.parse(file.name).name;
        const ext = path.extname(file.name).slice(1);
        console.log(name + ' - ' + ext + ' - ' + fileSize + 'kb');
      });
    }
  });
});
