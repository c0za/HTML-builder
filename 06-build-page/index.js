const fs = require('fs');
const path = require('path');
const { readdir, rm, mkdir, readFile, writeFile, copyFile } = require('fs/promises');

const startBuild = async () => {

  try {
    // Create project-dist directory

    const folderCopy = path.join(__dirname, 'project-dist');

    await rm(folderCopy, { recursive: true, force: true }, (err) => {
      if (err) throw err;
    });

    await mkdir(folderCopy, { recursive: true }, (err) => {
      if (err) throw err;
    });

    // Copy css files in style.css

    const folderPath = path.join(__dirname, 'styles');
    const bundle = path.join(__dirname, 'project-dist', 'style.css');
    const writeStream = fs.createWriteStream(bundle, 'utf8');

    const cssFiles = await readdir(folderPath, { withFileTypes: true }, (err) => {
      if (err) throw err;
    });

    cssFiles.forEach(file => {
      if (file.isFile() && path.extname(file.name).slice(1) === 'css') {
        const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');
        readStream.on('data', data => {
          writeStream.write(`${data} \n`);
        });
      }
    });

    // Change template.html

    const folderComponents = path.join(__dirname, 'components');
    const index = path.join(__dirname, 'project-dist', 'index.html');
    let resultHtml = await readFile(path.join(__dirname, 'template.html'), 'utf8');

    const components = await readdir(folderComponents, { withFileTypes: true }, (err) => {
      if (err) throw err;
    });

    components.forEach(async (file) => {
      if (file.isFile() && path.extname(file.name).slice(1) === 'html') {
        let name = path.parse(file.name).name;
        let current = await readFile(path.join(__dirname, 'components', file.name), 'utf8');
        resultHtml = resultHtml.replace(`{{${name}}}`, current);
        await writeFile(index, resultHtml);
      }
    });

    // Copy Assets 

    const folderAssets = path.join(__dirname, 'assets');
    const folderAssetsCopy = path.join(__dirname, 'project-dist', 'assets');

    const copyFolders = async (src, dest) => {

      try {

        const assets = await readdir(src, { withFileTypes: true }, (err) => {
          if (err) throw err;
        });

        await mkdir(dest, { recursive: true }, (err) => {
          if (err) throw err;
        });

        assets.forEach(async (file) => {
          if (file.isDirectory()) {
            await copyFolders(path.join(src, file.name), path.join(dest, file.name));
          } else {
            await copyFile(path.join(src, file.name), path.join(dest, file.name));
          }
        });
      } catch (err) {
        console.error(err);
      }
    }

    copyFolders(folderAssets, folderAssetsCopy);

  } catch (err) {
    console.error(err);
  }
}

startBuild();

