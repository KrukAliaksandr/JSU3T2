const fs = require('fs');

const createAndWriteFile = function (path, contents) {
  if (!fs.existsSync(`./Data/${path}.json`)) {
    console.log(`file ${path} does not exist. Created new file with same name`);
  }
  fs.writeFileSync(`./Data/${path}.json`, JSON.stringify(contents, null, '\t'), 'utf8');
};

const createDirectory = () => {
  if (!fs.existsSync('./Data')) {
    fs.mkdirSync('./Data');
  }
};

module.exports = {
  createAndWriteFile,
  createDirectory
};
