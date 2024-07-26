const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const [compName = 'demo'] = args;

let compPath = args[1];

/** 模版目录 */
const templateDirPath = path.resolve(__dirname, './lib/__template__');
/** 输出目录 */
const outputDirPath = path.resolve(__dirname, './lib');

if (!compName) {
  console.error('[ Error ]: Please check args[1]');
  process.exit(1);
}

if (compName && !compPath) {
  compPath = compName;
}

const replacements = {
  COMP_NAME: compName.length > 1 ? capitalizeFirstLetter(compName) : 'Template',
  COMP_PATH: compPath || 'template',
  compName,
};

async function getAllFilePathsByDirPath(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, fileNames) => {
      if (err) {
        reject(err);
        return;
      }
      const allFiles = [];
      (async function processFiles() {
        for (const fileName of fileNames) {
          const fullPath = path.join(dirPath, fileName);
          const stat = await fs.promises.stat(fullPath);
          if (stat.isDirectory()) {
            /** 暂时不处理子文件夹中的文件 */
            const nestedFiles = await getAllFilePathsByDirPath(fullPath);
            allFiles.push(...nestedFiles);
          } else {
            allFiles.push({
              fileName,
              fullPath,
            });
          }
        }
        resolve(allFiles);
      })();
    });
  });
}

async function replaceFile(filePaths) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePaths, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        data = data.replace(regex, value);
      }
      resolve(data);
    });
  });
}

function clearAllOnDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = `${dirPath}/${file}`;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      clearAllOnDir(filePath);
    } else {
      fs.unlinkSync(filePath);
      console.log(`[ Log ]: Success delete ${file} file`);
    }
  });
}

async function initConvertAllFiles(allFilePaths) {
  if (!Array.isArray(allFilePaths) || !allFilePaths.length) return;

  const isCreatedDir = await createDir(outputDirPath, compPath);
  if (!isCreatedDir) return;

  for (let i = 0; i < allFilePaths.length; i++) {
    const { fileName, fullPath } = allFilePaths[i];
    const content = await replaceFile(fullPath);
    const name = convertReallyFileName(fileName, compPath);

    const outputFullPath = path.join(outputDirPath, compPath, name);

    fs.writeFile(outputFullPath, content, 'utf-8', (err) => {
      if (err) {
        console.log(`[ Error ]: ${err}`);
      }
    });
  }
}

async function createDir(folderPath, folderName) {
  return new Promise(async (resolve, reject) => {
    const fullPath = path.join(folderPath, folderName);
    try {
      if (!fs.existsSync(fullPath)) {
        fs.mkdir(path.join(folderPath, folderName), (err) => {
          if (err) {
            console.error(`[ Error ]: Error creating folder: ${err}`);
            reject(err);
            return;
          }
          console.log(
            `[ Log ]: Folder created successfully at ${path.join(folderPath, folderName)}`,
          );
          resolve(1);
        });
      } else {
        clearAllOnDir(fullPath);
        console.log(`[ Log ]: Directory already exists: ${path.join(folderPath, folderName)}`);
        resolve(1);
      }
    } catch (err) {
      reject(err);
    }
  });
}

function capitalizeFirstLetter(str) {
  return str.replace(/(^\w)/, (match) => match.toUpperCase());
}

function convertReallyFileName(fileName, compPath) {
  const name = fileName
    .replace(/(^[a-zA-Z]+)\./, (match) => (match === 'index.' ? 'index.' : `${compPath}.`))
    .replace(/(\.template$)/, '');
  console.log(`[ Log ]: Rename file "${fileName}" to "${name}"`);
  return name;
}

(async function () {
  const allFilePaths = await getAllFilePathsByDirPath(templateDirPath);

  if (!allFilePaths.length) {
    console.log('[ Error ]: File list is empty');
    return;
  }

  await initConvertAllFiles(allFilePaths);
})();
