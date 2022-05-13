
function getCharNumber(string) {
    return string.length
}

function getCharNumberWithOutSpaces(string) {
    let stringWithOutSpaces = string.replaceAll(' ', '');
    return getCharNumber(stringWithOutSpaces);
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

function getOccourenceOfWordInString(searchWord, string) {
    let occurrence = 0;
    const wordArray = createArrayOfWordsFromString(string);
    for (const word of wordArray) {
       if (word.toLowerCase() === searchWord.toLowerCase()) {
           occurrence++;
       } 
    }
    return occurrence
}

function createReportString(originalText, searchWord, charNumber, noSpacesCharNumber, wordNumber, occurrence) {
    let occourenceString = '';
    if (occurrence >= 0) {
        occourenceString = 'la parola "' + searchWord + '" appare ' + occurrence + (occurrence === 1 ? ' volta' : ' volte');
    }
    const report = originalText + 
                    '\n' + 
                    '\n' + 
                    'numero di caratteri: ' + charNumber + '\n' + 
                    'numero di caratteri spazi esclusi: ' + noSpacesCharNumber + '\n' + 
                    'numero di parole: ' + wordNumber + '\n' + 
                    occourenceString;
    return report;                
}


exports.getCharNumber = getCharNumber;

exports.getCharNumberWithOutSpaces = getCharNumberWithOutSpaces;

exports.getWordNumberFromString = getWordNumberFromString;

exports.getOccourenceOfWordInString = getOccourenceOfWordInString;

exports.createReportString = createReportString;

