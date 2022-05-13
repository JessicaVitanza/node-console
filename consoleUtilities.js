function getConsoleArguments() {
    return process.argv.slice(2);
}

function getArgumentOrExitWithErrorAndIndex(errorString, index) {
    const arguments = getConsoleArguments()
   let arg;
   if (arguments[index]) {
       arg = arguments[index]
   } else {
       console.error(errorString);
       process.exit();
   }
     return arg;
}

function getOptionArgumetWithIndex(index) {
    const arguments = getConsoleArguments();
    return arguments[index];
}

exports.getArgumentOrExitWithErrorAndIndex = getArgumentOrExitWithErrorAndIndex;

exports.getOptionArgumetWithIndex = getOptionArgumetWithIndex
