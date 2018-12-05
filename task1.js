/* eslint-disable no-console */
/* eslint-disable indent */
// import { XMLHttpRequest as xml } from "xmlhttprequest";
const rp = require('request-promise-native');
const todo = require('yargs');
const fs = require('fs');
const uri = 'https://rickandmortyapi.com/api/character/';
const isResultAJsonOjbect = true;

// eslint-disable-next-line no-unused-expressions
todo.command('Request', 'https://rickandmortyapi.com/api/character/" ', function (yargs) {
    return yargs.options({
        'id': {
            alias: 'i',
            describe: 'id of character',
            demandOption: false
        },
        'name': {
            alias: 'n',
            describe: 'name of character',
            demandOption: false
        }
    });
},
    function (argv) {
        processTheResults(argv, 25).then(results => { console.log(results); });
    }).help()
    .argv;

async function processTheResults (args, pageCount) {
    const searchParams = sortParams(args);
    let arrayOfPromises = [];
    let pageNumberCounter = 1;
    while (pageNumberCounter <= pageCount) {
        arrayOfPromises.push(getPage(searchParams, pageNumberCounter));
        pageNumberCounter++;
    }
    const arrayofPages = await Promise.all(arrayOfPromises).then(body => {
        let characters = body.reduce((prev, current) => {
            return { results: (prev).concat(current) };
        });
        return characters;
    });
    writeDataToFile(arrayofPages, args.outputFormat);
}

function getPage (searchParams, pageNumberCounter) {
    return new Promise(resolve => {
        rp({
            method: 'GET',
            uri: `${uri}?page=${pageNumberCounter}`,
            json: isResultAJsonOjbect
        }).then(requestResult => {
            resolve(sortResults(requestResult, searchParams));
        }).catch(err => {
            console.log(err.message);
        });
    });
}

function writeDataToFile (results) {
        fs.writeFileSync('Results.json', JSON.stringify(results, null, '\t'));
}

function sortParams (consoleArgs) {
    const searchParams = {
        name: consoleArgs.f,
        id: consoleArgs.f
    };
    Object.keys(searchParams
    ).forEach(key => {
        if (typeof searchParams[key] === 'undefined') {
            delete searchParams[key];
        }
    });
   return searchParams;
}

function sortResults (requestResult, searchParams) {
    const results = requestResult.results.filter(characterObj => {
        let res = true;
        for (let parameter in searchParams) {
            if (searchParams[parameter] !== characterObj[parameter]) {
                res = false;
            }
        }
        return res;
    });
    return results;
}

function sumEs6Style (prom) {
    let res = prom.then(body => {
        let characters = body.reduce((prev, current) => {
            return { results: prev.results.concat(current.results) };
        });
    });
    resolve(res);
}