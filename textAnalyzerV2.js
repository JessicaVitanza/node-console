
const textUtlities = require('./textUtilities.js');
const inputOutput = require('./inputOutputUtilities.js');
const consoleUtilities = require('./consoleUtilities.js');

const inputUrl = consoleUtilities.getArgumentOrExitWithErrorAndIndex("devi inserire l'input url", 0);

const outputUrl = consoleUtilities.getArgumentOrExitWithErrorAndIndex("devi inserire l'output url", 1);

let searchWord = consoleUtilities.getOptionalArgumentWithIndex(2);

let fileData = inputOutput.readFileDataWithUrl(inputUrl);

const charNumber = textUtlities.getCharNumber(fileData)
console.log('numero di caratteri: ', charNumber);

const noSpacesCharNumber = textUtlities.getCharNumberWithOutSpaces(fileData);
console.log('numero di caratteri spazi esclusi: ', noSpacesCharNumber);

const wordNumber = textUtlities.getWordNumberFromString(fileData);
console.log('numero di parole: ', wordNumber);

let occurrence = -1;
if (searchWord) {
  occurrence = textUtlities.getOccurenceOfWordInString(searchWord, fileData)
}

if (occurrence >= 0) {
  console.log('la parola "' + searchWord + '" appare ' + occurrence + (occurrence === 1 ? ' volta' : ' volte'));
}

const report = textUtlities.createReportString(fileData, searchWord, charNumber, noSpacesCharNumber, wordNumber, occurrence);

inputOutput.writeReportInFile(outputUrl, report);


