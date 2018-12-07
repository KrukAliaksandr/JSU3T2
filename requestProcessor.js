const rp = require('request-promise-native');
const fs = require('fs');
const uri = 'https://rickandmortyapi.com/api/character/';
const isResultAJsonOjbect = true;

// const getCharactersMatchingConditions = function (args) {
//   getPageCount().then((pageCount) => processTheResults(args, pageCount)).then((sortedResults) => createAndWriteFile(args.path, sortedResults));
// };

const sortParams = function (consoleArgs) {
  const searchParams = {
    name: consoleArgs.name,
    id: consoleArgs.id,
    status: consoleArgs.status,
    species: consoleArgs.species,
    type: consoleArgs.type,
    gender: consoleArgs.gender,
    origin: consoleArgs.origin,
    location: consoleArgs.location
  };

  Object.keys(searchParams
  ).forEach(key => {
    if (typeof searchParams[key] === 'undefined') {
      delete searchParams[key];
    }
  });
  return searchParams;
};

const processTheResults = async function (args, pageCount) {
  const searchParams = sortParams(args);
  let arrayOfPromises = [];
  let pageNumberCounter = 1;
  while (pageNumberCounter <= pageCount) {
    arrayOfPromises.push(getPage(searchParams, pageNumberCounter));
    pageNumberCounter++;
  }
  const sortedResults = await Promise.all(arrayOfPromises).then(resultArray => {
    return resultArray.reduce((a, b) => [...a, ...b]);
  });
  return sortedResults;
};

const getPage = function (searchParams, pageNumberCounter) {
  return new Promise(resolve => {
    rp({
      method: 'GET',
      uri: `${uri}?page=${pageNumberCounter}`,
      json: isResultAJsonOjbect
    }).then(requestResult => {
      const sortedResults = sortResults(requestResult, searchParams);
      resolve(sortedResults);
    });
  });
};

const sortResults = function (requestResult, searchParams) {
  const results = requestResult.results.filter(characterObj => {
    let res = true;
    for (let parameter in searchParams) {
      switch (parameter) {
        case 'origin':
        case 'location':
          if ((characterObj[parameter].name !== searchParams[parameter])) res = false;
          break;
        case 'name':
          // search for substring in character name. Approve only if the substring is situated at the start.
          if (!(characterObj.name.includes(searchParams.name)) && !(characterObj.name.indexOf(searchParams.name) === 0)) res = false;
          break;
        default:
          if (searchParams[parameter] !== characterObj[parameter]) res = false;
      }
    }
    return res;
  });
  return results;
};

module.exports = {
  processTheResults,
  getPage,
  sortParams,
  sortResults
};
