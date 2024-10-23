const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  // --------------------! 1. delete outdata (output file) already exists!----------------
  if (fs.existsSync(outdata)){
    fs.unlinkSync(outdata);
  }
  // --------------------! 2. read input file and check if exists!----------------
  if (fs.existsSync(indata)){
    const data = fs.readFileSync(indata, "utf-8");
    const lines = data.split(/\n/).slice(1);
    let noOfRecords = lines.length;
    // return noOfRecords;
    // --------------------! 3. transform input data array!----------------
    let outputArray = [];
      // loop through indata array and transform each line & push into ouput Array.
      for (let line of lines){
        elementArray = line.split(";");
        let review = elementArray[0].trim().slice(0,20);
        outputArray.push([elementArray[1],review])
      }
      // change each line array into string separated by delimiter
      outputArray = outputArray.map(output => output.join(";"))
      
      // convert outputArray into one string to pass to appendFileSync
      outdataString = outputArray.join("\n")
      // console.log(outdataString);


    // --------------------! 4. add data to the output file!----------------
    fs.appendFileSync(outdata, outdataString)
  } else {
    return -1;
  }
}



console.log(parseFile("datafile.csv","outputfile.csv"))
// console.log(parseFile("./testing/testdata_1.csv","outputfile.csv"))




// Leave this code here for the automated tests
module.exports = {
  parseFile,
}