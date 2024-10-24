const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  // --------------------! 1. delete output file if already exists !----------------
  if (fs.existsSync(outdata)) fs.unlinkSync(outdata);

  // --------------------! 2. check if input file does not exist !----------------
  if (!fs.existsSync(indata)){
    return -1;
  } else {
    // --------------------! 3a. if input file exists process the input file exc. header 
    // (to return transformed outdata in Array) !----------------
    const data = fs.readFileSync(indata, "utf-8");
    const lines = data.split(/\n/).slice(1);
    let outdataArray = lines.map((line) => {
      let [review, sentiment] = line.includes(";") ? line.split(";") : line.split(",");
      return `${sentiment.trim()}${delimiter}${review.trim().slice(0,20)}`
    })
    // --------------------! 3b. add outdata to the outdata file !----------------
    let outdataString =  outdataArray.join("\n") + "\n"
    fs.appendFileSync(outdata, outdataString)
    // --------------------! 3c. return total numbers of indata lines !----------------
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