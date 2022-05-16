///1) importo fs
const fileSystem = require('fs');

///2) leggo gli argomenti inseriti da console
const args = process.argv.slice(2);
//console.log(args);

///3) prendo il primo elemento come inputUrl(obbligatorio),il secondo come outputUrl(obbligatorio) e il terzo come parola da cercare(non obligatoria)
let inputUrl;
if (args[0]) {
  inputUrl = args[0]
} else {
  console.log("devi inserire l'input url");
  process.exit();
}


let outputUrl;
if (args[1]) {
  outputUrl = args[1]
} else {
  console.log("devi inserire l'output url");
  process.exit();
}


let searchWord = args[2];

// console.log('input', inputUrl);
// console.log('output', outputUrl);
// console.log('search', searchWord);


///4) leggo il contenuto del file e loggo:
let fileData;
try {
  fileData = fileSystem.readFileSync(inputUrl, 'utf8');
} catch (error) {
  console.log('errore nella lettura del file\n', error.message);
  process.exit();
}
console.log('testo da analizzare:\n', fileData);

//////- il numero di caratteri spazi compresi
const charNumber = fileData.length;
console.log('numero di caratteri: ', charNumber);

//////- il numero di caratteri spazi esclusi
const noSpacesData = fileData.replaceAll(' ', '');
const noSpacesCharNumber = noSpacesData.length;
console.log('numero di caratteri spazi esclusi: ', noSpacesCharNumber);

//////- il numero delle parole
const cleanData = fileData.replaceAll("'", ' ')
                          .replaceAll('.', '')
                          .replaceAll(',', '')
                          .replaceAll('!', '');

const wordArray = cleanData.split(' ');
const wordNumber = wordArray.length;

console.log('numero di parole: ', wordNumber);

//////- il numero delle occorrenze della parola da cercare(se la ho)

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





///5)scrivo un nuovo file con il testo dell'originale più i dati dell'analisi

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



//es originale=> viva il css!
// risultato=>
// viva il css!
//
// numero di caratteri: 12
// numero di caratteri(spazi esclusi): 10