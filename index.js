/* eslint-disable no-console */
/* eslint-disable indent */
// import { XMLHttpRequest as xml } from "xmlhttprequest";
const todo = require('yargs');
const mainFunctionality = require('./requestProcessor');
const pageCountRequest = require('./pageCountRequest');
const dirAndFileChecker = require('./dirAndFileChecker');

// eslint-disable-next-line no-unused-expressions
todo.command('Request', 'https://rickandmortyapi.com/api/character/" ', function (yargs) {
    return yargs.options({
        'path': {
            alias: 'p',
            describe: 'path to file',
            demandOption: true
        },
        'id': {
            alias: 'i',
            describe: 'id of character',
            demandOption: false
        },
        'name': {
            alias: 'n',
            describe: 'name of character',
            demandOption: false
        },
        'status': {
            alias: 's',
            describe: 'status, can be dead or alive',
            demandOption: false
        },
        'spieces': {
            alias: 'c',
            describe: 'spieces of character',
            demandOption: false
        },
        'gender': {
            alias: 'g',
            describe: 'gender of character',
            demandOption: false
        },
        'type': {
            alias: 't',
            describe: 'type of character',
            demandOption: false
        },
        'origin': {
            alias: 'o',
            describe: 'origin of character',
            demandOption: false
        },
        'location': {
            alias: 'l',
            describe: 'location of character',
            demandOption: false
        }
    });
},
    function (argv) {
        dirAndFileChecker.createDirectory();
        pageCountRequest.getPageCount().then((pageCount) => mainFunctionality.processTheResults(argv, pageCount)).then((sortedResults) => dirAndFileChecker.createAndWriteFile(argv.path, sortedResults));
    }).help()
    .demandCommand(1, 'You need at least one command before moving on')
    .argv;
