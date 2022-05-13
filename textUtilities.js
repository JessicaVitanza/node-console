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
  return cleanedString.split(' ');
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


function createReportString(originalText, searchWord, charNumber, noSpacesCharNumber, wordNumber, occurence) {
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
    occurrenceString;

  return report
}

exports.getCharNumber = getCharNumber;
exports.getCharNumberWithOutSpaces = getCharNumberWithOutSpaces;
exports.getWordNumberFromString = getWordNumberFromString;
exports.getOccurenceOfWordInString = getOccurenceOfWordInString;
exports.createReportString = createReportString;
