
const fs = require('fs');
const myArgs = process.argv.slice(2);

if (myArgs[0] === undefined) {
  console.error('mi serve il file di input')
  process.exit();
}

const inputUrl = myArgs[0];

let outputUrl

if (myArgs[1] === undefined){
  outputUrl = './output.json'
} else {
  outputUrl = myArgs[1];
}

let data;

try {
  data = fs.readFileSync(inputUrl, 'utf8');
} catch (err) {
  console.log('file non trovato');
  process.exit();
}

//1) spezzare la nostra stringa in un array di linee.
//let lines = ["title,author,price,copies", "iliade,omero,15.00,5", "odissea,omero,12.00,3", "i promessi sposi,manzoni,20.00,10"];

let lines = data.split(/\r?\n/);
///rimuovo le linee vuote
lines = lines.filter(line => line !== '');
//console.log('lines', lines);

//2) creo una variabile chiamata properties che conterrà un array con le parole di cui è composta la prima linea;
//const properties = ["title", "author", "price", "copies"]

const properties = lines.shift().split(',');
//console.log('lines + properies', lines, properties)

//let lines = ["iliade,omero,15.00,5", "odissea,omero,12.00,3", "i promessi sposi,manzoni,20.00,10"];
//3) creo un array vuoto per gli oggetti

const objectsArray = [];

//4) faccio un ciclo su tutte le linee dentro lines
for (const line of lines) {
  /////- creo un nuovo oggetto vuoto.
  const obj = {};
  /////- trasformo la linea in un array di parole es: const lineArray = ["iliade", "omero", "15.00", "5"];
  const lineArray = line.split(',');
  //console.log('lineArray', lineArray);
  /////- faccio un ciclo interno per ogni parola dentro properties
  for (let i = 0; i < properties.length; i++) {
    let property = properties[i];
    let value = lineArray[i];

    //tolgo spazi vuoti
    property = property.trim()
    value = value.trim()


    //controllo se stringa, numero, boleano
    value = checkType(value)
    //console.log('property', property) 
    /////- aggiungo al nuovo oggetto una proprietà con il nome della proprietà e associando il valore corrispondete nella linea;
    obj[property] = value;
  }
  //console.log(obj);
  /////- infilo il mio oggetto nell'array vuoto
  objectsArray.push(obj)
}
  //5) faccio console.log dell'array
console.log('array degli oggetti', objectsArray);

const jsonArray = JSON.stringify(objectsArray);

console.log('json array', jsonArray);



try {
  fs.writeFileSync(outputUrl, jsonArray);
  // file written successfully
} catch (err) {
  console.error('non riesco a scrivere il file');
  process.exit();
}


//controllo se è un numero
function checkType(value){

  const valueNonEUnNumero = isNaN(value);
  const valueEUnNumero = !valueNonEUnNumero;

  if (valueEUnNumero) {
    return parseFloat(value);
  } else if(value === 'true' || value === 'false'){
    return value === 'true' ? true : false;
  } else {
    return value;
  }

}


