function getConsoleArguments() {
  return process.argv.slice(2);
}

function getArgumentOrExitWithErrorAndIndex(errorString, index){
  const arguments = getConsoleArguments();
  let arg;
  if (arguments[index]) {
    arg = arguments[index]
  } else {
    console.error(errorString);
    process.exit()
  }
  return arg;
}

function getOptionalArgumentWithIndex(index){
  const arguments = getConsoleArguments();
  return arguments[index];
}

function readFileDataWithUrl(inputUrl) {
  let fileData;
  try {
    fileData = fileSystem.readFileSync(inputUrl, 'utf8');
  } catch (error) {
    console.log('errore nella lettura del file\n', error.message);
    process.exit();
  }
  return fileData;
}


const fileSystem = require('fs');

const inputUrl = getArgumentOrExitWithErrorAndIdex("devi inserire l'input url", 0);

const outputUrl = getArgumentOrExitWithErrorAndIndex("devi inserire l'output url", 1);

let searchWord = getOptionalArgumentWithIndex(2);

let fileData = readFileDataWithUrl(inputUrl);


const charNumber = fileData.length;
console.log('numero di caratteri: ', charNumber);


const noSpacesData = fileData.replaceAll(' ', '');
const noSpacesCharNumber = noSpacesData.length;
console.log('numero di caratteri spazi esclusi: ', noSpacesCharNumber);

const cleanData = fileData.replaceAll("'", ' ')
                          .replaceAll('.', '')
                          .replaceAll(',', '')
                          .replaceAll('!', '');

const wordArray = cleanData.split(' ');
const wordNumber = wordArray.length;

console.log('numero di parole: ', wordNumber);


let occurrenceString = '';
if (searchWord) {

  let occurence = 0;
  for (const word of wordArray) {
    if (word.toLowerCase() === searchWord.toLowerCase()) {
      occurence++;
    }
  }

  console.log('la parola "' + searchWord + '" appare ' + occurence + (occurence === 1 ? ' volta' : ' volte'));
  occurrenceString = 'la parola "' + searchWord + '" appare ' + occurence + (occurence === 1 ? ' volta' : ' volte');
}


const newFileData = fileData + 
                    '\n' +
                    '\n' +
                    'numero di caratteri: ' + charNumber + '\n' +
                    'numero di caratteri spazi esclusi: ' + noSpacesCharNumber + '\n' +
                    'numero di parole: ' + wordNumber + '\n' +
                    occurrenceString;


try {
  fileSystem.writeFileSync(outputUrl, newFileData);
} catch (error) {
  console.log('errore nella scrittura del file\n', error.message);
  process.exit();
}

