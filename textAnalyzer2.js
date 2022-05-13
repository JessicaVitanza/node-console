
const textUtilities = require('./textUtilities.js');

const inputOutputUtilities = require('./inputOutputUtilities.js');

const cosnoleUtilities = require('./consoleUtilities.js')

const inputUrl = cosnoleUtilities.getArgumentOrExitWithErrorAndIndex("devi inserire l'input url", 0);

const outputUrl = cosnoleUtilities.getArgumentOrExitWithErrorAndIndex("devi inserire l'output url", 1);

let searchWord = cosnoleUtilities.getOptionArgumetWithIndex(2);

let fileData = inputOutputUtilities.readFileDataWithUrl(inputUrl);

const charNumber = textUtilities.getCharNumber(fileData);
console.log('numero di caratteri: ', charNumber);

const noSpacesCharNumber = textUtilities.getCharNumberWithOutSpaces(fileData);
console.log('numero di caratteri spazi esclusi: ', noSpacesCharNumber);

const wordNumber = textUtilities.getWordNumberFromString(fileData);
console.log('numero di parole: ', wordNumber);

let occurrence = -1;
if (searchWord) {
    occurrence = textUtilities.getOccourenceOfWordInString(searchWord ,fileData);
}

if (occurrence >= 0){
    console.log('la parola "' + searchWord + '" appare ' + occurrence + (occurrence === 1 ? ' volta' : ' volte'));
}

const report = textUtilities.createReportString(fileData, searchWord, charNumber, noSpacesCharNumber, wordNumber, occurrence);

inputOutputUtilities.writeReportInFile(outputUrl ,report);

//creare occurrence per ogni parola del testo, ordinarli per il numero di ripetizioni e la percentuale rispetto al testo



