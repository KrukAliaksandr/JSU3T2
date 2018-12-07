const rp = require('request-promise-native');
const uri = 'https://rickandmortyapi.com/api/character/';
const isResultAJsonOjbect = true;

const getPageCount = function () {
  return new Promise(resolve => {
    rp({
      method: 'GET',
      uri: `${uri}?page=${1}`,
      json: isResultAJsonOjbect
    }).then(reqResult => {
      console.log(`pages to download ${reqResult.info.pages}`);
      resolve(reqResult.info.pages);
    });
  });
};

module.exports = {
  getPageCount
};
