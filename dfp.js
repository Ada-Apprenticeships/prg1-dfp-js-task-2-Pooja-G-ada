const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  // --------------------! 1. delete outdata (output file) already exists!----------------
  if (fs.existsSync(outdata)){
    fs.unlinkSync(outdata);
  }

  // --------------------! 2. check if input files exists!----------------
  if (!fs.existsSync(indata)){
    return -1;
  } else {
    const data = fs.readFileSync(indata, "utf-8");
    const lines = data.split(/\n/).slice(1);

    // --------------------! 3. transform input data array!----------------
    let outputArray = [];
      // loop through indata array and transform each line & push into ouput Array.
      for (let line of lines){
        elementArray = line.includes(";") ? line.split(";") : line.split(",");
        let review = elementArray[0].trim().slice(0,20);
        let sentiment= elementArray[1].trim();
        outputArray.push([sentiment,review])
      }

    // Array of arrays: change each array into string separated by delimiter
    outputArray = outputArray.map(output => output.join(delimiter))
    
    // convert outputArray into one string to pass to appendFileSync
    outdataString =  outputArray.join("\n") + "\n"

    // --------------------! 4. add data to the output file!----------------
    fs.writeFileSync(outdata, outdataString)
    
    
    // --------------------! 5. return total numbers of lines in input data!----------------
    return lines.length;
    // console.log(lines.length);
  } 
}



// console.log(parseFile("datafile.csv","outputfile.csv"))
// console.log(parseFile("datafile.csv","outputfile.csv",","))
console.log(parseFile("./testing/testdata_1.csv","outputfile.csv"))
// console.log(parseFile("./testing/testdata_1.csv","outputfile.csv",","))
// console.log(parseFile("./testing/testdata_5.csv","outputfile.csv"))
// console.log(parseFile("./testing/testdata_5.csv","outputfile.csv",","))






// Leave this code here for the automated tests
module.exports = {
  parseFile,
}