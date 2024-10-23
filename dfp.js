const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  // --------------------! 1. delete output file if already exists !----------------
  if (fs.existsSync(outdata)) fs.unlinkSync(outdata);

  // --------------------! 2. check if input file does not exist !----------------
  if (!fs.existsSync(indata)){
    return -1;
  } else {
    // --------------------! 3a. if input file exists process the input file 
    // (to return transformed output data in Array) !----------------
    const data = fs.readFileSync(indata, "utf-8");
    const lines = data.split(/\n/).slice(1);
    let outdataArray = lines.map((line) => {
      elementArray = line.includes(";") ? line.split(";") : line.split(",");
      let review = elementArray[0].trim().slice(0,20);
      let sentiment= elementArray[1].trim();
      return `${sentiment}${delimiter}${review}`
    })
    // --------------------! 3b. add output data to the output file !----------------
    let outdataString =  outdataArray.join("\n") + "\n"
    fs.appendFileSync(outdata, outdataString)
    // --------------------! 3c. return total numbers of indata lines exc. header !----------------
    return lines.length;
  } 
}



console.log(parseFile("datafile.csv","outputfile.csv"))
// console.log(parseFile("datafile.csv","outputfile.csv",","))
// console.log(parseFile("./testing/testdata_1.csv","outputfile.csv"))
// console.log(parseFile("./testing/testdata_1.csv","outputfile.csv",","))
// console.log(parseFile("./testing/testdata_5.csv","outputfile.csv"))
// console.log(parseFile("./testing/testdata_5.csv","outputfile.csv",","))






// Leave this code here for the automated tests
module.exports = {
  parseFile,
}