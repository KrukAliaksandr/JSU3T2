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
    return yargs.positional(
        'outputFormat', {
            alias: 'f',
            describe: 'output format of recieved data',
            demandOption: true
        });
},
    function (argv) {
        const searchParameters = getSortArguments(argv);
        sortResults([{
            name: argv.f,
            id: argv.f
        }], searchParameters);
    }).help()
    .argv;

function getSortArguments(consoleArgs) {
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
    const results = requestResult.filter(characterObj => {
        let res = true;
        for (let parameter in searchParams) {
            if (searchParams[parameter] !== characterObj[parameter]) {
                res = false;
            }
        }
        return res;
    });
    console.log(results);
}
