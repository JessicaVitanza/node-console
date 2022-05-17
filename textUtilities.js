function getCharNumber(string) {
  return string.length;
}

function getCharNumberWithOutSpaces(string) {
  let stringWithoutSpaces = string.replaceAll(' ', '');
  return getCharNumber(stringWithoutSpaces);
}

function cleanString(string) {
  const cleanedString = string.replaceAll("'", ' ')
    .replaceAll('.', '')
    .replaceAll(',', '')
    .replaceAll('!', '');
  return cleanedString;
}

function createArrayOfWordsFromString(string) {
  const cleanedString = cleanString(string);
  const lines = cleanedString.split(/\r?\n/);
  const joinedLines = lines.join(' ');
  const words = joinedLines.split(' ');

  //["ciao mi chiamo giovanni", "Oggi non sono andato a scuola"]
  //"ciao mi chiamo giovanni Oggi non sono andato a scuola"
  //["ciao", "mi", "chiamo", "giovanni", "Oggi", "non", "sono", "andato", "a", "scuola",]


  return words;
}

function getWordNumberFromString(string) {
  const wordArray = createArrayOfWordsFromString(string);
  return wordArray.length;
}

function getOccurenceOfWordInString(searchWord, string) {
  let occurence = 0;
  const wordArray = createArrayOfWordsFromString(string)
  for (const word of wordArray) {
    if (word.toLowerCase() === searchWord.toLowerCase()) {
      occurence++;
    }
  }
  return occurence;
}


function createReportString(originalText, searchWord, charNumber, noSpacesCharNumber, wordNumber, occurence, frequencyData) {
  let occurrenceString = '';
  if (occurence >= 0) {
    occurrenceString = 'la parola "' + searchWord + '" appare ' + occurence + (occurence === 1 ? ' volta' : ' volte')
  }

  const report = originalText +
    '\n' +
    '\n' +
    'numero di caratteri: ' + charNumber + '\n' +
    'numero di caratteri spazi esclusi: ' + noSpacesCharNumber + '\n' +
    'numero di parole: ' + wordNumber + '\n' +
    frequencyData + '\n'
    occurrenceString;

  return report
}

function createFrequencyData(string){

  const freqObj = wordsFrequency(string);
  const freqArray = fromFrequencyObjToArray(freqObj);
  freqArray.sort(compareFrequency);
  
  //return JSON.stringify(freqArray, null, 2);
}

function compareFrequency(freq1, freq2){
  return freq2.frequency - freq1.frequency;
}

function wordsFrequency(string) {
  
  const frequencyObj = {};

  // viva il css viva l html
  // frequencyObj = {viva: 2, il: 1, css:1, l: 1, html:1}

  const wordsArray = createArrayOfWordsFromString(string);
  
  for (const word of wordsArray) {

    if (frequencyObj[word.toLowerCase()] === undefined) {
      frequencyObj[word.toLowerCase()] = 1;
    } else {
      frequencyObj[word.toLowerCase()] = frequencyObj[word.toLowerCase()] + 1;
    }

    //frequencyObj[word] = frequencyObj[word] ? (frameElement[word] + 1) : 1;

  }

  return frequencyObj;
 
}

function fromFrequencyObjToArray(frequency){

  const frequencyArray = [];

  for (const property in frequency) {
    if (Object.hasOwnProperty.call(frequency, property)) {
      const values = frequency[property];
      const obj = {word: property, frequency: values};
      frequencyArray.push(obj);
    }
  }

  return frequencyArray;

}




exports.getCharNumber = getCharNumber;
exports.getCharNumberWithOutSpaces = getCharNumberWithOutSpaces;
exports.getWordNumberFromString = getWordNumberFromString;
exports.getOccurenceOfWordInString = getOccurenceOfWordInString;
exports.createReportString = createReportString;
exports.createFrequencyData = createFrequencyData;

