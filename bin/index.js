#!/usr/bin/env node
const yargs = require("yargs");
const fs = require("fs");
const { toNamespacedPath } = require("path");
const { DefaultDeserializer } = require("v8");
const usage = "\nUsage: nkpl <file name>\nnamish <file name>";const options = yargs  
      .usage(usage)                                                                                                 
      .help(true)  
      .argv;
const fileName = String(process.argv[2]);

class nkplCompiler {
  constructor(codes) {
    this.codes = codes
  }
  tokenize() {
    const length = this.codes.length
    let pos = 0
    let tokens = []
    const BUILT_IN_KEYWORDS = ["print", "find", "vary", "import", "export", "modify", "Print", "Find", "Vary", "Import", "Export", "Modify", "showNkplDetails()", "sqrt", "Sqrt", "cbrt", "Cbrt", "printS", "PrintS", "#", "for", "For", "equals", "getVar", "getVary", ";", "function", "{", "}", ];
    const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_()#N;{}'
    while (pos < length) {
      let currentChar = this.codes[pos]
      if (currentChar === ` ` || currentChar === "\n" || currentChar === `
 ` || currentChar === `
 ` || currentChar === "\
 ") {
        pos++
        continue
      } else if (currentChar === '"') {
        let res = ""
        pos++
        while (this.codes[pos] !== '"' && this.codes[pos] !== '\n' && pos < length) {
          res += this.codes[pos]
          pos++
        }
        if (this.codes[pos] !== '"') {
          return {
            error: `Incomplete String!`
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
            error: `Incomplete String!`
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
          type: "keyword",
          value: res
        })
      }else if (currentChar === '='){
        let res = ""
        pos++
        while (this.codes[pos] !== '"' && this.codes[pos] !== '\n' && pos < length) {
          res += this.codes[pos]
          pos++
        }
        pos++
        tokens.push({
          type: "varEqualSign",
          value: res
        })
      } else {
        return {
          error: `Unexpected character ${this.codes[pos]}`
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
      console.log(error)
      return
    }
   for (let codePos = 0; codePos < tokens.length; codePos++) {
    let localSystemVariables = [];
    if(tokens[codePos].type === "keyword") {
      let localSystemFunctions = [
        {
         
        }
      ]
       if(tokens[codePos].value === "find" || tokens[codePos].value === "Find") {
        if(tokens[codePos + 1].type === "string") {
        if(tokens[codePos + 1].value === undefined) {
          console.error("NKPL unexpected error. Find function can never have an empty mathematical expression.")
        }else{
          console.log(eval(tokens[codePos + 1].value));
        }
        }else{
             console.log("unknown error!")
        }
      }
      if(tokens[codePos].value === "showNkplDetails()") {
        console.log("NKPL is a programming language created by Namish Kumar, a student reading in Class 8 Section C in DAV Public School Balasore of Odisha, India in July 2022. JavaScript is the language using which this language has been created.")
      }
      if(tokens[codePos].value === "sqrt" || tokens[codePos].value === "Sqrt") {
        if(tokens[codePos + 1].type === "string") {
        if(tokens[codePos + 1].value === undefined) {
          console.error("NKPL unexpected error. Sqrt / sqrt function can never have an empty number to find the square root. Please input a valid number.")
        }else{
          console.log(Math.sqrt(Number(tokens[codePos + 1].value)));
        }
        }else{
             console.log("unknown error!")
        }
      }
      if(tokens[codePos].value === "cbrt" || tokens[codePos].value === "Cbrt") {
        if(tokens[codePos + 1].type === "string") {
        if(tokens[codePos + 1].value === undefined) {
          console.error("NKPL unexpected error. Cbrt / cbrt function can never have an empty number to find the cube root. Please input a valid number.")
        }else{
          console.log(Math.cbrt(Number(tokens[codePos + 1].value)));
        }
        }else{
             console.log("unknown error!")
        }
      }
      if(tokens[codePos].value === "printS" || tokens[codePos].value === "PrintS") {
        if(tokens[codePos + 1].type === "string") {
        if(tokens[codePos + 1].value === undefined) {
          console.error("NKPL unexpected error. PrintS only accepts strings.")
        }else{
          process.stdout.write(tokens[codePos + 1].value);
        }
        }else{
             console.log("unknown error!")
        }
      }
    } {
      if(tokens[codePos].value === "vary" || tokens[codePos].value === "Vary") {
        if(tokens[codePos + 1].type === "string") {
        if(tokens[codePos + 1].value === undefined) {
          console.error("NKPL unexpected error.")
        }else{
          const mainVaryName = tokens[codePos + 1].value;
          if(tokens[codePos + 2].type === "keyword") {
            if(tokens[codePos + 2].value === "equals") {
              if(tokens[codePos + 3].type === "string") {
                if(tokens[codePos + 3].value === undefined) {
                  console.error("NKPL unexpected error.")
                }else{
                  const mainVaryValue = tokens[codePos + 3].value;
                   localSystemVariables.push ({
                    [mainVaryName]:mainVaryValue
                   });
                   
                }
              }
            }
          }
        }
        }else{
             console.log("unknown error!")
        }
      }
      if(tokens[codePos].value === "print" || tokens[codePos].value === "Print") {
        if(tokens[codePos + 1].type === "string") {
          console.log(tokens[codePos + 1].value);
        }else if(tokens[codePos + 1].type === "keyword"){
          if(tokens[codePos + 1].value === "getVar" || tokens[codePos + 1].value === "getVary") {
            if(tokens[codePos + 2].type === "string") {
            if(tokens[codePos + 2].value === undefined) {
              console.error("NKPL unexpected error. Variable name can never be undefined!")
            }else{
              const indexToGetVarValue = tokens[codePos + 2].value;
              try {
              }
              catch (error) {
                  console.log(`NKPL Variable Undefined Error: The requested variable ${indexToGetVarValue} is not defined.`);
              }
            }
            }else{
                 console.log("unknown error!")
            }
          }
         
        }
       } 
       if(tokens[codePos].value === "function" || tokens[codePos].value === "Print") {
        if(tokens[codePos + 1].type === "string") {
          console.log(tokens[codePos + 1].value);
        }else if(tokens[codePos + 1].type === "keyword"){
          if(tokens[codePos + 1].value === "getVar" || tokens[codePos + 1].value === "getVary") {
            if(tokens[codePos + 2].type === "string") {
            if(tokens[codePos + 2].value === undefined) {
              console.error("NKPL unexpected error. Variable name can never be undefined!")
            }else{
              const indexToGetVarValue = tokens[codePos + 2].value;
              try {
              }
              catch (error) {
                  console.log(`NKPL Variable Undefined Error: The requested variable ${indexToGetVarValue} is not defined.`);
              }
            }
            }else{
                 console.log("unknown error!")
            }
          }
         
        }
       } 
    }
    }
  }
  }
    
fs.readFile(fileName + ".nkpl", 'utf8', function(err, codes){
 new nkplCompiler(codes).compile();
})

// The end of code //