const nkplParser = require("./parser.js");
const yargs = require("yargs");
const fs = require("fs");
const { toNamespacedPath } = require("path");
const { DefaultDeserializer } = require("v8");
const usage = "\nUsage: nkpl <file name>\nnamish <file name>";const options = yargs  
      .usage(usage)                                                                                                 
      .help(true)  
      .argv;
const fileName = String(process.argv[2]);
let bik = ["write", "find", "vary", "import", "export", "modify", "Write", "Find", "Vary", "Import", "Export", "Modify", "showNkplDetails()", "sqrt", "Sqrt", "cbrt", "Cbrt", "printS", "PrintS", "#", "for", "For", "equals", "getVar", "getVary", ";", "function", "{", "}", "/*", "/", "com", "round", "Round", "random", "createFile", "deleteFile", "readFile", "getFileSizeInMB", "getFileSizeInGB", "getFileSizeInTB", "getFileSizeInKB", "getFileSizeInB", "getFileSize", "getCurrentYear", "getCurrentMonth", "getCurrentMonthName", "getCurrentDay", "return", "pass", "getCurrentDayName", "getCurrentDay", "getDate", "getTime", "getTimeWithS"];
class nkplCompiler {
  constructor(codes) {
    this.codes = codes
  }
  tokenize() {
    const length = this.codes.length
    let pos = 0
    let line = 1;
    let column = 0;
    let tokens = []
    let BUILT_IN_KEYWORDS = bik;
    const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_()#N;{}'
    while (pos < length) {
      let currentChar = this.codes[pos]
      if (currentChar === " ") {
        pos++
        column++
        continue
      }else if(currentChar === "\n"){
          line++
          column = 0;
          pos++
          continue
      } else if (currentChar === '"') {
        let res = ""
        pos++
        column++
        while (this.codes[pos] !== '"' && this.codes[pos] !== '\n' && pos < length) {
          res += this.codes[pos]
          pos++
        }
        if (this.codes[pos] !== '"') {
          return {
            error: `Incomplete String at line ${line}:${pos}`
          }
        }
        pos++
        tokens.push({
          type: "string",
          value: res
        })
      } else if (currentChar === "'") {
        let res = ""
        pos++
        while (this.codes[pos] !== '"' && this.codes[pos] !== '\n' && pos < length) {
          res += this.codes[pos]
          pos++
        }
        if (this.codes[pos] !== '"') {
          return {
            error: `Incomplete String at line ${line}:${pos}!`
          }
        }
        pos++
        tokens.push({
          type: "string",
          value: res
        })
      } 
      else if (varChars.includes(currentChar)) {
        let res = currentChar
        pos++
        while (varChars.includes(this.codes[pos]) && pos < length) {
          res += this.codes[pos]
          pos++
        }
        if (!BUILT_IN_KEYWORDS.includes(res)) {
          return {
            error: `NKPL Error:- Unexpected token ${res}. ${res} is not defined!`
          }
        }
        tokens.push({
          type: BUILT_IN_KEYWORDS.includes(res) ? "keyword" : "keyword_custom",
          value: res
        })
      }else if (currentChar === '='){
        pos++
        column++
        tokens.push({
          type: "operator",
          value: "eq"
        })
      }else if(currentChar === "+"){
        pos++
        column++
        tokens.push({
          type:"operator",
          value:"plus"
        })
      }else if (currentChar === '/'){
       pos++
       column++
       tokens.push({
        type: "operator",
        value: "comment"
      })
      } else {
        return {
          error: `Unexpected character ${this.codes[pos]} at line ${line}:${pos}`
        }
      }
    }
    return {
      error: false,
      tokens
    }
  }
  
  compile() {
    const {
      tokens,
      error
    } = this.tokenize()
    if (error) {
      return console.log(error)
    }
    let localSystemVariables = [];
    fs.writeFile(fileName + ".json", JSON.stringify(tokens), 'utf8', (err) => {

      if (err) {
          console.log(`NKPL Compiling error: Unable to compile your NKPL file!`);
      } else {
        const allFileContents = fs.readFileSync(fileName + ".json", 'utf8');
allFileContents.split(/\r?\n/).forEach(codes =>  {
  nkplParser.parse(tokens);
}); 
      }
  
  });
    }
  }
  const allFileContents = fs.readFileSync(fileName + ".nkpl", 'utf8');
allFileContents.split(/\r?\n/).forEach(codes =>  {
  new nkplCompiler(codes).compile();
});  
/*fs.readFile(fileName + ".nkpl", 'utf8', function(err, codes){
new nkplCompiler(codes).compile();
})*/

// The end of NKPL sorce code //