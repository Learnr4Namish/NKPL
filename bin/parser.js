const { sqrt, string } = require("mathjs");
const fs = require("fs");
const Path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const store = require("store2");
const app = express();
function writeError(string) {
   return console.error(`NKPL Error: ${string}`);
}
var standard_input = process.stdin;
const parser = {
  parse:function parse(tokens, fileName, keywords) {
   //console.log(tokens);
   //console.log(tokens);
    const nLength = tokens.length;
    let position = 0;
    const vars = {};
    const objects = {};
    while (position < nLength) {
       let token = tokens[position];
       if(token.type === "keyword" && token.value === "writeln"){
        let isVar = tokens[position + 1].type === "keyword" && tokens[position + 1].value === "getVar";
        const valueIsString = tokens[position + 1].type === "string";
        if(!valueIsString && !isVar) {
          if(!token[position + 1]) {
           return console.log(`Unexpected end of line! writeln method expects string and variables and some built-in functions only!`);
          }
          return console.log(`Unexpected token ${tokens[position + 1].type}`)
        }
        if(isVar) {
         const isVarString = tokens[position + 2].type === "string";
         if(!isVarString) {
           if(!tokens[position + 2]){
             return console.log("NKPL Variable error: getVar only accepts string!");
           }
           return console.log("NKPL Variable error: getVar only accepts string!");
         }
         /*const allFileContents1 = fs.readFileSync(fileName + "_variables.json");
String(allFileContents1).split(/\r?\n/).forEach(codes =>  {
 if(!tokens[position + 2].value in JSON.parse(codes)) {
   return console.log(`NKPL Variable Error: The requested variable ${tokens[position + 1].value} is not defined!`)
 }
});  */
           const variableNameToGet = tokens[position + 2].value;
           console.log(store(fileName + "SecretVars")[variableNameToGet])
function goOnShowVariable(codes) {
  const mainObject = JSON.parse(codes);
  if(mainObject[String(variableNameToGet)] === undefined) {
    return console.log("NKPL Variable Error: No such variable! The variable is empty or undefined");
  }else{
   console.log(mainObject[String(variableNameToGet)]);
  }
}
        }else{

        }
        if(tokens[position + 2] === undefined) {
         return console.log("Unexpected end of line! Expected semicolon ';'");
      }else if(!tokens[position + 2] === ";") {
         return console.log("Unexpected end of line! Expected semicolon ';'");
      }
      if(tokens[position + 1].type === "string") {
       console.log("\n" + tokens[position + 1].value);
      }else {
     //return null;
      }
        position += 2;
       }else if(token.type === "keyword" && token.value === "write") {
        let isVar = tokens[position + 1].type === "keyword" && tokens[position + 1].value === "getVar";
         const valueIsString = tokens[position + 1].type === "string";
         if(!valueIsString && !isVar) {
           if(!token[position + 1]) {
            return console.log(`Unexpected end of line! write method expects string and variables and some built-in functions only!`);
           }
           return console.log(`Unexpected token ${tokens[position + 1].type}`)
         }
         if(isVar) {
          const isVarString = tokens[position + 2].type === "string";
          if(!isVarString) {
            if(!tokens[position + 2]){
              return console.log("NKPL Variable error: getVar only accepts string!");
            }
            return console.log("NKPL Variable error: getVar only accepts string!");
          }
          /*const allFileContents1 = fs.readFileSync(fileName + "_variables.json");
String(allFileContents1).split(/\r?\n/).forEach(codes =>  {
  if(!tokens[position + 2].value in JSON.parse(codes)) {
    return console.log(`NKPL Variable Error: The requested variable ${tokens[position + 1].value} is not defined!`)
  }
});  */
            const variableNameToGet = tokens[position + 2].value;
            console.log(store(fileName + "SecretVars")[variableNameToGet])
function goOnShowVariable(codes) {
   const mainObject = JSON.parse(codes);
   if(mainObject[String(variableNameToGet)] === undefined) {
     return console.log("NKPL Variable Error: No such variable! The variable is empty or undefined");
   }else{
    console.log(mainObject[String(variableNameToGet)]);
   }
}
         }else{

         }
         if(tokens[position + 2] === undefined) {
          return console.log("Unexpected end of line! Expected semicolon ';'");
       }else if(!tokens[position + 2] === ";") {
          return console.log("Unexpected end of line! Expected semicolon ';'");
       }
       if(tokens[position + 1].type === "string") {
        console.log(tokens[position + 1].value);
       }else {
      //return null;
       }
         position += 2;
       }else if(token.type === "keyword" && token.value === "vary") {
         const isCustomKeyWord = tokens[position + 1] && tokens[position + 1].type === "string";
         if(!isCustomKeyWord) {
          if(!tokens[position + 1]) {
            return console.log("Unexpected end of line! Expected a variable name in string!");
          }
          return console.log(`Unexpected token ${tokens[position + 1].type}! Expected a variable name in string!`)
         }
         const varyName = tokens[position + 1].value;
         const isEqualSign = tokens[position + 2] && tokens[position + 2].type === "operator" && tokens[position + 2].value === "eq";
         if(!isEqualSign) {
          if(!tokens[position + 2]) {
            return console.log("Unexpected end of line, expected '=' sign after variable name!")
          }
          return console.log(`Unexpected token ${tokens[position + 2].type}! expected '=' sign after variable name!`)
         }

         const isString = tokens[position + 3] && tokens[position + 3].type === "string"; 
         if(!isString) {
          if(!tokens[position + 3]) {
            return console.log("Unexpected end of line! Expected String!");
          }
          return console.log(`Unexpected token ${tokens[position + 3].type}! Expected String!`)
         }
         const variableVal = tokens[position + 3].value;
         store(fileName + 'SecretVars', {[varyName]: variableVal}); 
         
       /* try {
          const allFileContents = fs.readFileSync(fileName + "_variables.json");
          continueMore();
        }catch(error) {
           createSimpleVariable();
        }
function continueMore() {
  String(allFileContents).split(/\r?\n/).forEach(codes =>  {
    if(!codes === "") {
       goOnCreateVariable(codes);
    }else{
      createSimpleVariable();
    }
  });
}   

 function goOnCreateVariable(codes) {
     const mainObject = JSON.parse(codes);
     mainObject[varyName] = variableVal;
     const objToPush = JSON.stringify(mainObject);
     fs.writeFile(varyName + ".vary", variableVal, 'utf8', (err) => { 
      if(!err) {
         
      }else{
         return console.log("NKPL Variable error: Unable to create your variable! Please try again!");
      }
     });
 }
 function createSimpleVariable() {
  let mainObject = {};
  mainObject[varyName] = variableVal;
     const objToPush = JSON.stringify(mainObject);
     fs.writeFile(varyName + ".vary", variableVal, 'utf8', (err) => { 
      if(!err) {

      }else{
         return console.log("NKPL Variable error: Unable to create your variable! Please try again!");
      }
     });
 }*/
  //fs.appendFile(`${fileName}_variables.json`, `{"${varyName}":"${tokens[position + 3].value}"}`, function ssCallback() {

  //})*/
      position+= 4;
       }else if(token.type === "keyword" && token.value === "com") {
         const valueIsString = tokens[position + 1].type === "string";
         if(!valueIsString) {
           if(!token[position + 1]) {
            return console.log(`Unexpected end of line! Comments should be put inside double quotes!`);
           }
           return console.log(`Unexpected token ${tokens[position + 1].type}`)
         }
         position += 2
       }else if(token.type === "keyword" && token.value === "find" || token.type === "keyword" && token.value === "Find") {
             const isString = tokens[position + 1].type === "string"
             if(!isString) {
              if(!tokens[position + 1]) {
                return console.error(`NKPL Unexpected error: Find/find method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
              }
              return console.error(`NKPL Unexpected Error:Find method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
              }
              
              if(tokens[position + 2] === undefined) {
                return console.log("Unexpected end of line! Expected semicolon ';'");
             }else if(!tokens[position + 2] === ";") {
                return console.log("Unexpected end of line! Expected semicolon ';'");
             }else{
              try {
                const targetAnswer = eval(String(tokens[position + 1].value))
                console.log(targetAnswer);
              }
              catch(error) {
                return console.log(error)
              }
               position += 2
             }
       }else if(token.type === "keyword" && token.value === "findln" || token.type === "keyword" && token.value === "Findln") {
        const isString = tokens[position + 1].type === "string"
        if(!isString) {
         if(!tokens[position + 1]) {
           return console.error(`NKPL Unexpected error: Findln/findln method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
         }
         return console.error(`NKPL Unexpected Error:Findln method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
         }
         
         if(tokens[position + 2] === undefined) {
           return console.log("Unexpected end of line! Expected semicolon ';'");
        }else if(!tokens[position + 2] === ";") {
           return console.log("Unexpected end of line! Expected semicolon ';'");
        }else{
         try {
           const targetAnswer = eval(String(tokens[position + 1].value))
           console.log("\n" + targetAnswer);
         }
         catch(error) {
           return console.log(error)
         }
          position += 2
        }
  }
       else if(token.type === "keyword" && token.value === "sqrt" || token.type === "keyword" && token.value === "Sqrt") {
        const isString = tokens[position + 1].type === "string"
        if(!isString) {
         if(!tokens[position + 1]) {
           return console.error(`NKPL Unexpected error: Sqrt/sqrt method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
         }
         return console.error(`NKPL Unexpected Error: Sqrt method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
         }
         
         if(tokens[position + 2] === undefined) {
           return console.log("Unexpected end of line! Expected semicolon ';'");
        }else if(!tokens[position + 2] === ";") {
           return console.log("Unexpected end of line! Expected semicolon ';'");
        }else{
         try {
           const targetAnswer = Math.sqrt(Number(tokens[position + 1].value));
           console.log(targetAnswer);
         }
         catch(error) {
           return console.log(error)
         }
          position += 2
        }
  }
  else if(token.type === "keyword" && token.value === "sqrtln") {
    const isString = tokens[position + 1].type === "string"
    if(!isString) {
     if(!tokens[position + 1]) {
       return console.error(`NKPL Unexpected error: Sqrtln/sqrtln method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
     }
     return console.error(`NKPL Unexpected Error: Sqrtln method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
     }
     
     if(tokens[position + 2] === undefined) {
       return console.log("Unexpected end of line! Expected semicolon ';'");
    }else if(!tokens[position + 2] === ";") {
       return console.log("Unexpected end of line! Expected semicolon ';'");
    }else{
     try {
       const targetAnswer = Math.sqrt(Number(tokens[position + 1].value));
       console.log("\n" + String(targetAnswer));
     }
     catch(error) {
       return console.log(error)
     }
      position += 2
    }
}else if(token.type === "keyword" && token.value === "cbrt" || token.type === "keyword" && token.value === "cbrt") {
    const isString = tokens[position + 1].type === "string"
    if(!isString) {
     if(!tokens[position + 1]) {
       return console.error(`NKPL Unexpected error: cbrt/Cbrt method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
     }
     return console.error(`NKPL Unexpected Error: Cbrt method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
     }
     
     if(tokens[position + 2] === undefined) {
       return console.log("Unexpected end of line! Expected semicolon ';'");
    }else if(!tokens[position + 2] === ";") {
       return console.log("Unexpected end of line! Expected semicolon ';'");
    }else{
     try {
       const targetAnswer = Math.cbrt(Number(tokens[position + 1].value));
       console.log(targetAnswer);
     }
     catch(error) {
       return console.log(error)
     }
      position += 2
    }
}
else if(token.type === "keyword" && token.value === "cbrtln") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: cbrt/Cbrt method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: Cbrt method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
   try {
     const targetAnswer = Math.cbrt(Number(tokens[position + 1].value));
     console.log("\n" + targetAnswer);
   }
   catch(error) {
     return console.log(error)
   }
    position += 2
  }
}else if(token.type === "keyword" && token.value === "round" || token.type === "keyword" && token.value === "Round") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: Round/round method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: Round/round method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
   try {
     const targetAnswer = Math.round(Number(tokens[position + 1].value));
     console.log(targetAnswer);
   }
   catch(error) {
     return console.log(error)
   }
    position += 2
  }
}else if(token.type === "keyword" && token.value === "random") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: random method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: random method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   try {
    const firstNumber = Number(tokens[position + 1].value);
     const targetNumber = Math.floor((Math.random() * firstNumber) + 1);
     console.log(targetNumber);
    } catch(error) {
    return console.log(error)
  }
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}
else if(token.type === "keyword" && token.value === "createFile") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: createFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: createFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   const isString2 = tokens[position + 2].type === "string"
   if(!isString2) {
    if(!tokens[position + 2]) {
      return console.error(`NKPL Unexpected error: createFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
    }
    return console.error(`NKPL Unexpected Error: createFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
    }
    const fileContent = tokens[position + 2].value;
    fs.writeFile(fileName, String(fileContent), 'utf8', (err) => {
      if (err) {
          console.log(`NKPL File writer exception: Unable to write your file`);
      }else{
        console.log(`NKPL File writer: Successfully created/updated your file named ${fileName}`);
      }
    });
   if(tokens[position + 3] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 3] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 4
  }
}else if(token.type === "keyword" && token.value === "deleteFile") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: deleteFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: deleteFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
    fs.unlink(fileName, (err) => {
      if (err) {
          console.log(`NKPL File writer exception: Unable to delete your file`);
      }else{
        console.log(`NKPL File writer: Successfully deleted your file named ${fileName}`);
      }
    });
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "readFile") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: readFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: readFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   const allFileContents = fs.readFileSync(fileName, 'utf8');
allFileContents.split(/\r?\n/).forEach(fileValue =>  {
   console.log(fileValue);
}); 
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInMB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInMB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInMB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000000 + " MB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInGB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInGB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInGB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000000000 + " GB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSize") {
  return console.log("NKPL Functions error: No such function called getFileSize. By the way, getFileSize has 5 forms. You might be interested to use them. They are:-\n1. getFileSizeInB \n2. getFileSizeInKB\n3. getFileSizeInMB\n4. getFileSizeInGB\n5.getFileSizeInTB")
}else if(token.type === "keyword" && token.value === "getFileSizeInTB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInTB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInTB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000000000000 + " TB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInKB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInKB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInKB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000 + " KB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInKB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInKB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInKB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000 + " KB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size + " B");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getCurrentYear") {
  const date = new Date();
  const fullYear = date.getFullYear();
  console.log(fullYear)
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonth") {
  const date = new Date();
  const fullYear = date.getMonth()+1;
  console.log(fullYear)
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonthName") {
  const date = new Date();
  const fullYear = date.getMonth()+1;
  if(fullYear === 1) {
    console.log("January")
  }else if(fullYear === 2){
    console.log("February")
  }else if(fullYear === 3) {
    console.log("March")
  }else if(fullYear === 4) {
    console.log("April")
  }else if(fullYear === 5) {
    console.log("May")
  }else if(fullYear === 6) {
    console.log("June")
  }else if(fullYear === 7) {
    console.log("July")
  }else if(fullYear === 8) {
    console.log("August")
  }else if(fullYear === 9) {
    console.log("September")
  }else if(fullYear === 10) {
    console.log("October")
  }else if(fullYear === 11) {
    console.log("November")
  }else if(fullYear === 12) {
    console.log("December")
  }
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentDayName") {
  const date = new Date();
  const fullYear = date.getDay();
  if(fullYear === 1) {
    console.log("Monday")
  }else if(fullYear === 2){
    console.log("Tuesday")
  }else if(fullYear === 3) {
    console.log("Wednesday")
  }else if(fullYear === 4) {
    console.log("Thursday")
  }else if(fullYear === 5) {
    console.log("Friday")
  }else if(fullYear === 6) {
    console.log("Saturday")
  }else if(fullYear === 7) {
    console.log("Sunday")
  }
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentDay") {
  const date = new Date();
  const fullYear = date.getDay();
  console.log(fullYear)
    position ++;
}else if(token.type === "keyword" && token.value === "getDate") {
  const date = new Date();
  const dayD= date.getDate();
  const month = date.getMonth()+1;
  const fullYear = date.getFullYear();
  /*const dateFormat = dayD + "/" + month + "/" + fullYear;
  console.log(dateFormat)*/
  if(tokens[position + 1] === undefined) {
    return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
   }
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
  
   const dateFormatGet = tokens[position + 1].value;
   if(dateFormatGet === "DD/MM/YYYY") {
    const dateFormat = dayD + "/" + month + "/" + fullYear;
  console.log(dateFormat)
   }else if(dateFormatGet === "MM/DD/YYYY") {
    const dateFormat = month + "/" + dayD + "/" + fullYear;
  console.log(dateFormat)
   }else if(dateFormatGet === "YYYY/MM/DD") {
    const dateFormat = fullYear + "/" + month + "/" + dayD;
  console.log(dateFormat)
   }else if(dateFormatGet === "DD/YYYY/MM") {
    const dateFormat = dayD + "/" + fullYear + "/" + month;
  console.log(dateFormat)
   }else{
     return console.log(`NKPL Date Format Error: No such date format called ${dateFormatGet}! Please refer to docs for more information.`)
   }
   if(tokens[position + 2] === undefined) {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getTime") {
  const date = new Date();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();
  /*const dateFormat = dayD + "/" + month + "/" + fullYear;
  console.log(dateFormat)*/
  if(tokens[position + 1] === undefined) {
    return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
   }
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
  
   const timeFormatGet = tokens[position + 1].value;
   if(timeFormatGet === "24"){
     console.log(`${getHours}:${getMinutes}`)
   }else if(timeFormatGet === "12"){
    const result = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
     });
     console.log(result)
   }

   if(tokens[position + 2] === undefined) {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getTimeWithS") {
  const date = new Date();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();
  /*const dateFormat = dayD + "/" + month + "/" + fullYear;
  console.log(dateFormat)*/
  if(tokens[position + 1] === undefined) {
    return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
   }
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
  
   const timeFormatGet = tokens[position + 1].value;
   if(timeFormatGet === "24"){
     console.log(`${getHours}:${getMinutes}:${getSeconds}`)
   }else if(timeFormatGet === "12"){
    const result = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second:"numeric",
      hour12: true,
     });
     console.log(result)
   }
    if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "renameFile") {
   const isString = tokens[position + 1] && tokens[position + 1].type === "string";
   if(!isString) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Type error: Rename File only accepts strings!");
    }
    return console.log("NKPL Type error: Rename File only accepts strings!");
   }
   const baseFileName = tokens[position + 1].value;
   const isString2 = tokens[position + 2] && tokens[position + 2].type === "string";
   if(!isString2) {
    if(!tokens[position + 2]) {
      return console.log("NKPL Type error: Rename File only accepts strings!");
    }
    return console.log("NKPL Type error: Rename File only accepts strings!");
   }
   const newFileName = tokens[position + 2].value;
   try {
    const oldPath = Path.join(__dirname, baseFileName)  
    const newPath = Path.join(__dirname, newFileName)
      fs.rename(baseFileName, newFileName, (err) => {
  if (err) throw err;
  console.log('NKPL Success message: Successfully renamed your file!');
});
   }catch(e) {
      return console.log(e);
   }  
}else if(token.type === "keyword" && token.value === "loop") {
  const isString = tokens[position + 1] && tokens[position + 1].type === "string";
  if(!isString) {
     if(!tokens[position + 1]) {
        return console.log("NKPL loop error: Loop has first parameter of string!");
     }
     return console.log("NKPL loop error: Loop has first parameter of string!");
  }
  if(tokens[position + 1] === undefined) {
    var numberOfTimes = 1;
  }
  var numberOfTimes = Number(tokens[position + 1].value - 1);
  if (numberOfTimes === undefined) {
     numberOfTimes = 1
     return numberOfTimes = 1;
  }
  try {
    const colonIsPresent = tokens[position + 2] && tokens[position + 2].type === "colon" && tokens[position + 2].value === "colon";
    if(!colonIsPresent) {
       if(!tokens[position + 2]) {
          return console.log("NKPL loop error: Loop only accepts colon and the code after it!");
       }
       return console.log("NKPL loop error: Loop only accepts colon and the code after it!");
    }
    parseMore(numberOfTimes);
  }catch(error) {
    return console.log("NKPL compiling error: Unable to parse your code! Please verify that you have entered the right codes and try again!")
  }
  function parseMore(numberOfTimes) {
    /*for(let x = 0; x <= Number(numberOfTimes); x++) {
       
    }*/
    if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "write") {
      let isVar = tokens[position + 4].type === "keyword" && tokens[position + 4].value === "getVar";
       const valueIsString = tokens[position + 4].type === "string";
       if(!valueIsString && !isVar) {
         if(!token[position + 4]) {
          return console.log(`Unexpected end of line! write method expects string and variables and some built-in functions only!`);
         }
         return console.log(`Unexpected token ${tokens[position + 1].type}`)
       }
       if(isVar) {
        const isVarString = tokens[position + 6].type === "string";
        if(!isVarString) {
          if(!tokens[position + 6]){
            return console.log("NKPL Variable error: getVar only accepts string!");
          }
          return console.log("NKPL Variable error: getVar only accepts string!");
        }
          if(!tokens[position + 4].value in vars) {
            return console.log(`NKPL Variable Error: The requested variable ${tokens[position + 1].value} is not defined!`)
          }
          for(let x = 0; x <= Number(numberOfTimes); x++) {
            console.log(vars[tokens[position + 3].value])
          }
       }else{

       }
       if(tokens[position + 5] === undefined) {
        return console.log("Unexpected end of line! Expected semicolon ';'");
     }else if(!tokens[position + 5] === ";") {
        return console.log("Unexpected end of line! Expected semicolon ';'");
     }
     for(let x = 0; x <= Number(numberOfTimes); x++) {
      console.log(tokens[position + 4].value);
    }
       position += 5
     }else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "find" || tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Find") {
      const isString = tokens[position + 4].type === "string"
      if(!isString) {
       if(!tokens[position + 4]) {
         return console.error(`NKPL Unexpected error: Find/find method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
       }
       return console.error(`NKPL Unexpected Error:Find method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
       }
       
       if(tokens[position + 5] === undefined) {
         return console.log("Unexpected end of line! Expected semicolon ';'");
      }else if(!tokens[position + 5] === ";") {
         return console.log("Unexpected end of line! Expected semicolon ';'");
      }else{
       try {
         const targetAnswer = eval(String(tokens[position + 1].value))
         for(let x = 0; x <= Number(numberOfTimes); x++) {
          console.log(targetAnswer);
        }
       }
       catch(error) {
         return console.log(error)
       }
        position += 6
      }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "sqrt" || tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Sqrt") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: Sqrt/sqrt method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: Sqrt method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   
   if(tokens[position + 5] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 5] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
   try {
     const targetAnswer = Math.sqrt(Number(tokens[position + 4].value));
     for(let x = 0; x <= Number(numberOfTimes); x++) {
      console.log(targetAnswer);
    }
   }
   catch(error) {
     return console.log(error)
   }
    position += 6;
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "cbrt" || tokens[position + 3].type === "keyword" && tokens[position + 3].value === "cbrt") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: cbrt/Cbrt method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: Cbrt method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   
   if(tokens[position + 5] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 5] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
   try {
     const targetAnswer = Math.cbrt(Number(tokens[position + 4].value));
     for(let x = 0; x <= Number(numberOfTimes); x++) {
      console.log(targetAnswer);
    }
   }
   catch(error) {
     return console.log(error)
   }
    position += 6
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "round" || tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Round") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: Round/round method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: Round/round method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   
   if(tokens[position + 5] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 5] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
   try {
     const targetAnswer = Math.round(Number(tokens[position + 4].value));
     for(let x = 0; x <= Number(numberOfTimes); x++) {
      console.log(targetAnswer);
    }
   }
   catch(error) {
     return console.log(error)
   }
    position += 2
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "random") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: random method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: random method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   try {
    const firstNumber = Number(tokens[position + 4].value);
     const targetNumber = Math.floor((Math.random() * firstNumber) + 1);
     for(let x = 0; x <= Number(numberOfTimes); x++) {
      console.log(targetNumber);
    }
    } catch(error) {
    return console.log(error)
  }
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "randomd") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: randomd method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: randomd method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   try {
    const firstNumber = Number(tokens[position + 4].value);
     for(let x = 0; x <= Number(numberOfTimes); x++) {
      console.log(Math.floor((Math.random() * firstNumber) + 1));
    }
    } catch(error) {
    return console.log(error)
  }
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "createFile") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: createFile method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: createFile method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 4].type}`)
   }
   const fileName = tokens[position + 4].value;
   const isString2 = tokens[position + 5].type === "string"
   if(!isString2) {
    if(!tokens[position + 5]) {
      return console.error(`NKPL Unexpected error: createFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
    }
    return console.error(`NKPL Unexpected Error: createFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
    }
    const fileContent = tokens[position + 5].value;
    for(let x = 0; x <= Number(numberOfTimes); x++) {
      fs.writeFile(fileName, String(fileContent), 'utf8', (err) => {
        if (err) {
            console.log(`NKPL File writer exception: Unable to write your file`);
        }else{
          console.log(`NKPL File writer: Successfully created/updated your file named ${fileName}`);
        }
      });
    }
    
   if(tokens[position + 6] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 6] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 4
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "deleteFile") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: deleteFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: deleteFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 4].value;
    fs.unlink(fileName, (err) => {
      if (err) {
          console.log(`NKPL File writer exception: Unable to delete your file`);
      }else{
        console.log(`NKPL File writer: Successfully deleted your file named ${fileName}`);
      }
    });
   if(tokens[position + 5] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 5] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 6
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "readFile") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: readFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: readFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 4].value;
   for(let x = 0; x <= Number(numberOfTimes); x++) {
    const allFileContents = fs.readFileSync(fileName, 'utf8');
    allFileContents.split(/\r?\n/).forEach(fileValue =>  {
       console.log(fileValue);
    }); 
  }
  
   const allFileContents = fs.readFileSync(fileName, 'utf8');
allFileContents.split(/\r?\n/).forEach(fileValue =>  {
   console.log(fileValue);
}); 
   if(tokens[position + 5] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 5] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 6
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getFileSizeInMB") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: getFileSizeInMB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInMB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 4].value;
   for(let x = 0; x <= Number(numberOfTimes); x++) {
       fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000000 + " MB");
    }
});
  }
   if(tokens[position + 5] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 5] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 5
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInGB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInGB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInGB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000000000 + " GB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSize") {
  return console.log("NKPL Functions error: No such function called getFileSize. By the way, getFileSize has 5 forms. You might be interested to use them. They are:-\n1. getFileSizeInB \n2. getFileSizeInKB\n3. getFileSizeInMB\n4. getFileSizeInGB\n5.getFileSizeInTB")
}else if(token.type === "keyword" && token.value === "getFileSizeInTB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInTB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInTB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000000000000 + " TB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInKB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInKB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInKB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000 + " KB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInKB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInKB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInKB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000 + " KB");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getFileSizeInB") {
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getFileSizeInB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getFileSizeInB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   const fileName = tokens[position + 1].value;
   fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size + " B");
    }
});
   if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "getCurrentYear") {
  const date = new Date();
  const fullYear = date.getFullYear();
  console.log(fullYear)
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonth") {
  const date = new Date();
  const fullYear = date.getMonth()+1;
  console.log(fullYear)
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonthName") {
  const date = new Date();
  const fullYear = date.getMonth()+1;
  if(fullYear === 1) {
    console.log("January")
  }else if(fullYear === 2){
    console.log("February")
  }else if(fullYear === 3) {
    console.log("March")
  }else if(fullYear === 4) {
    console.log("April")
  }else if(fullYear === 5) {
    console.log("May")
  }else if(fullYear === 6) {
    console.log("June")
  }else if(fullYear === 7) {
    console.log("July")
  }else if(fullYear === 8) {
    console.log("August")
  }else if(fullYear === 9) {
    console.log("September")
  }else if(fullYear === 10) {
    console.log("October")
  }else if(fullYear === 11) {
    console.log("November")
  }else if(fullYear === 12) {
    console.log("December")
  }
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentDayName") {
  const date = new Date();
  const fullYear = date.getDay();
  if(fullYear === 1) {
    console.log("Monday")
  }else if(fullYear === 2){
    console.log("Tuesday")
  }else if(fullYear === 3) {
    console.log("Wednesday")
  }else if(fullYear === 4) {
    console.log("Thursday")
  }else if(fullYear === 5) {
    console.log("Friday")
  }else if(fullYear === 6) {
    console.log("Saturday")
  }else if(fullYear === 7) {
    console.log("Sunday")
  }
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentDay") {
  const date = new Date();
  const fullYear = date.getDay();
  console.log(fullYear)
    position ++;
}else if(token.type === "keyword" && token.value === "getDate") {
  const date = new Date();
  const dayD= date.getDate();
  const month = date.getMonth()+1;
  const fullYear = date.getFullYear();
  /*const dateFormat = dayD + "/" + month + "/" + fullYear;
  console.log(dateFormat)*/
  if(tokens[position + 1] === undefined) {
    return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
   }
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
  
   const dateFormatGet = tokens[position + 1].value;
   if(dateFormatGet === "DD/MM/YYYY") {
    const dateFormat = dayD + "/" + month + "/" + fullYear;
  console.log(dateFormat)
   }else if(dateFormatGet === "MM/DD/YYYY") {
    const dateFormat = month + "/" + dayD + "/" + fullYear;
  console.log(dateFormat)
   }else if(dateFormatGet === "YYYY/MM/DD") {
    const dateFormat = fullYear + "/" + month + "/" + dayD;
  console.log(dateFormat)
   }else if(dateFormatGet === "DD/YYYY/MM") {
    const dateFormat = dayD + "/" + fullYear + "/" + month;
  console.log(dateFormat)
   }else{
     return console.log(`NKPL Date Format Error: No such date format called ${dateFormatGet}! Please refer to docs for more information.`)
   }
   if(tokens[position + 2] === undefined) {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getTime") {
  const date = new Date();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();
  /*const dateFormat = dayD + "/" + month + "/" + fullYear;
  console.log(dateFormat)*/
  if(tokens[position + 1] === undefined) {
    return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
   }
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
  
   const timeFormatGet = tokens[position + 1].value;
   if(timeFormatGet === "24"){
     console.log(`${getHours}:${getMinutes}`)
   }else if(timeFormatGet === "12"){
    const result = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
     });
     console.log(result)
   }

   if(tokens[position + 2] === undefined) {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getTimeWithS") {
  const date = new Date();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();
  /*const dateFormat = dayD + "/" + month + "/" + fullYear;
  console.log(dateFormat)*/
  if(tokens[position + 1] === undefined) {
    return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
   }
  const isString = tokens[position + 1].type === "string"
  if(!isString) {
   if(!tokens[position + 1]) {
     return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
  
   const timeFormatGet = tokens[position + 1].value;
   if(timeFormatGet === "24"){
     console.log(`${getHours}:${getMinutes}:${getSeconds}`)
   }else if(timeFormatGet === "12"){
    const result = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second:"numeric",
      hour12: true,
     });
     console.log(result)
   }
    if(tokens[position + 2] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 2] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
    position += 3
  }
}else if(token.type === "keyword" && token.value === "renameFile") {
   const isString = tokens[position + 1] && tokens[position + 1].type === "string";
   if(!isString) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Type error: Rename File only accepts strings!");
    }
    return console.log("NKPL Type error: Rename File only accepts strings!");
   }
   const baseFileName = tokens[position + 1].value;
   const isString2 = tokens[position + 2] && tokens[position + 2].type === "string";
   if(!isString2) {
    if(!tokens[position + 2]) {
      return console.log("NKPL Type error: Rename File only accepts strings!");
    }
    return console.log("NKPL Type error: Rename File only accepts strings!");
   }
   const newFileName = tokens[position + 2].value;
   try {
    const oldPath = Path.join(__dirname, baseFileName)  
    const newPath = Path.join(__dirname, newFileName)
      fs.rename(baseFileName, newFileName, (err) => {
  if (err) throw err;
  console.log('NKPL Success message: Successfully renamed your file!');
});
   }catch(e) {
      return console.log(e);
   }  
}
  }
}else if(token.type === "keyword" && token.value === "if") {
  if(tokens[position + 1] === undefined) {
    return console.log("NKPL Syntax error: Cannot have an empty if statement!");
  }else{
    const isString = tokens[position + 1].type = "string";
    if(!isString) {
      if(!tokens[position + 1]) {
        return console.log("NKPL Unexpected error: If statement expects a string which has a condition in it");
      }
      return console.log("NKPL Unexpected error: If statement expects a string which has a condition in it");
    }
    const condition = String(tokens[position + 1].value);
   //console.log(Boolean(eval(condition)));
   const isColon = tokens[position + 2].type === "colon" && tokens[position + 2].value === "colon";
   if(!isColon) {
    if(!tokens[position + 2]) {
      return console.log("NKPL Syntax error: If statement expects colon ':'!");
    }
    return console.log("NKPL Syntax error: If statement expects colon ':'!");
  }
  position += 3
  if(Boolean(eval(condition)) === true) {
     parseIfCodes(tokens[position], tokens, position);
  }else{
     console.log()
  }
  }
}else if(token.type === "keyword" && token.value === "newHTTPServer") {
  if(tokens[position + 1] === undefined) {
    return console.log("NKPL Syntax error: Cannot start empty HTTP statement!");
  }else{
    const isString = tokens[position + 1].type = "string";
    if(!isString) {
      if(!tokens[position + 1]) {
        return console.log("NKPL Unexpected error: newHTTPServer expected ip address and port");
      }
      return console.log("NKPL Unexpected error: newHTTPServer expected ip address and port");
    }
    const port = tokens[position + 1].value;
    const isString2 = String(tokens[position + 2].value);
   //console.log(Boolean(eval(condition)));
   //const isColon = tokens[position + 2].type === "colon" && tokens[position + 2].value === "colon";
   if(!isString2) {
    if(!tokens[position + 2]) {
      return console.log("NKPL Unexpected error: newHTTPServer expected ip address and port");
    }
    return console.log("NKPL Unexpected error: newHTTPServer expected ip address and port");
  }
  const ipAddress = tokens[position + 2].value;
  try {
    if(port === "env") {
      const server = app.listen(process.env.port || 3001, ipAddress, function onServerListening() {
        console.log(`NKPL HTTP server: Server has successfully started at the environment port!`)
     });
     app.all('*', (req, res) => {
      res.status(404).send(`<!DOCTYPE html>
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NKPL Server 404 error</title>
      </head>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Ubuntu:wght@500;700&display=swap');
      body {
        font-family: 'Lobster', cursive;
font-family: 'Ubuntu', sans-serif;
      }
      html {
        height:100%;
        background-color:#ff0077;
        color:white;
        font-size:20px;
      }
      button {
        background-color:#000000;
        color:white;
        border-radius:10px;
        padding:5px;
        width:10em;
        border:none;
        height:55px;
        font-size:18px;
      }
      </style>
      <body>
      <h1>404 Not Found</h1>
      <p>The requested url was not found on this server. Please go back to home. If you are the owner of this website, check that you have initiated "/" in your NKPL server.</p>
      <a href="/">
      <button>Go to Home</button>
      </a>
</body>
</html>
     `);
    });
    }else if(port === "undefined"){
        return console.error("NKPL HTTP Socket error: The port number can never be undefined!");
    }else{
      const server = app.listen(Number(port), ipAddress, function onServerListening() {
         console.log(`NKPL HTTP server: Server has successfully started at port ${port} and at ip address ${ipAddress}`);
        
      });
      app.all('*', (req, res) => {
        res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NKPL Server 404 error</title>
        </head>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Ubuntu:wght@500;700&display=swap');
        body {
          font-family: 'Lobster', cursive;
font-family: 'Ubuntu', sans-serif;
        }
        html {
          height:100%;
          background-color:#ff0077;
          color:white;
          font-size:20px;
        }
        button {
          background-color:#000000;
          color:white;
          border-radius:10px;
          padding:5px;
          width:10em;
          border:none;
          height:55px;
          font-size:18px;
        }
        </style>
        <body>
        <h1>404 Not Found</h1>
        <p>The requested url was not found on this server. Please go back to home. If you are the owner of this website, check that you have initiated "/" in your NKPL server.</p>
        <a href="/">
        <button>Go to Home</button>
        </a>
</body>
</html>
        `);
      });
    }
  }catch(error) {
      return console.log("NKPL HTTP Socket error: The port number can never be undefined! Please try again!");
  }

  position += 3
  }
}else if(token.type === "keyword" && token.value === "doGET") {
  const isString = tokens[position + 1].type === "string";
   if(!isString) {
     if(!tokens[position + 1]) {
       return console.error("NKPL GET request error: Unable to GET the path! Please check that the path is a string");
     }
     return console.error("NKPL GET request error: Unable to GET the path! Please check that the path is a string!");
   }
   const path = tokens[position + 1].value;
   const isColon = tokens[position + 2].type === "colon" && tokens[position + 2].value === "colon";
   if(!isColon) {
     if(!tokens[position + 2]) {
        return console.log("NKPL HTTP Socket error: Unable to send GET responce! Expected colon but got empty string!")
     }
     return console.log("NKPL HTTP Socket error: Unable to send GET responce! Expected colon but got empty string!")
   }
  const responceText = tokens[position + 3].value;
  console.log("Sharing content at the path " + path);
  app.get(path, (req,res) => {
    console.log(`NKPL HTTP server: Got GET request from ip address ${req.ip}`);
    res.send(responceText);
});
position += 3;
   position += 2
}else if(token.type === "keyword" && token.value === "getMax") {
   const isString = tokens[position + 1].type === "string";
   if(!isString) {
     if(!tokens[position + 1]) {
       return console.log("NKPL Syntax error: getMax keyword requires string!");
     }
     return console.log("NKPL Syntax error: getMax keyword requires string!");
   }
  const numbers = tokens[position + 1].value;
  const aNumbers = String(numbers).split(",");
  for(let x = 0; x <= aNumbers.length - 1; x++) {
    aNumbers[x] = Number(aNumbers[x])
  }
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  }
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  }
  console.log(aNumbers.max())
   if(tokens[position + 2] === undefined) {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "object") {
  const isString = tokens[position + 1].type === "string";
  if(!isString) {
       if(!tokens[position + 1]) {
            return console.log("NKPL Syntax error: Expected string after object keyword!");
       }
       return console.log("NKPL Syntax error: Expected string after object keyword!");
  }
  const isEq = tokens[position + 2].type === "operator" && tokens[position + 2].value === "eq";
  if(!isEq) {
       if(!tokens[position + 2]) {
           return console.log("NKPL Syntax error:Expected promise sign after object name '=>!");
       }
       return console.log("NKPL Syntax error:Expected promise sign after object name '=>!"); 
  }
  const isLambda = tokens[position + 3].type === "lambda" && tokens[position + 3].value === "lambda";
  if(!isLambda) {
    if(!tokens[position + 3]) {
        return console.log("NKPL Syntax error:Expected promise sign after object name '=>!");
    }
    return console.log("NKPL Syntax error:Expected promise sign after object name '=>!"); 
}
 const isStringObjects = tokens[position + 4].type === "string";
 if(!isStringObjects) {
  if(!tokens[position + 4]) {
       return console.log("NKPL Syntax error: Expected string after promise sign in object keyword!");
  }
  return console.log("NKPL Syntax error: Expected string after promise sign in object keyword!");
}
const objectsTo = tokens[position+4].value;
if(objectsTo.length < 1) {
  return console.log("NKPL Object error: Cannot define an empty object!");
}
try {
  const toObjects = JSON.parse(objectsTo);
  //console.log(toObjects);
  store(fileName + 'SecretObjects', toObjects);
}catch(error) {
  return writeError(error);
}
position += 5;
}else if(token.type === "keyword" && token.value === "getObject") {
const isString = tokens[position + 1].type === "string";
if(!isString) {
    if(!tokens[position + 1]) {
        return console.log("NKPL Syntax error: Expected string after getObject keyword!");
    }
    return console.log("NKPL Syntax error: Expected string after getObject keyword!");
}
const objectName = tokens[position + 1].value;
const isEq = tokens[position + 2].type === "operator" && tokens[position + 2].value === "eq";
if(!isEq) {
     if(!tokens[position + 2]){
         return console.log("NKPL Syntax error: Expected promise sign '=>' after object name in getObject keyword!");
     }
     return console.log("NKPL Syntax error: Expected promise sign '=>' after object name in getObject keyword!");
}
const isLambda = tokens[position + 3].type === "lambda";
if(!isLambda) {
  if(!tokens[position + 3]){
      return console.log("NKPL Syntax error: Expected promise sign '=>' after object name in getObject keyword!");
  }
  return console.log("NKPL Syntax error: Expected promise sign '=>' after object name in getObject keyword!");
}
const isProp = tokens[position + 4].type === "keyword" && tokens[position + 4].value === "property";
if(!isProp){
  if(!tokens[position + 4]) {
     return console.log("NKPL Syntax error: Expected property keyword after promise sign in getObject keyword");
  }
  return console.log("NKPL Syntax error: Expected property keyword after promise sign in getObject keyword");
}
const isEq2 = tokens[position + 5].type === "operator" && tokens[position + 5].value === "eq";
if(!isEq2) {
   if(!tokens[position + 5]) {
      return console.log("NKPL Syntax error: Expected equal to sign after property keyword!");
   }
   return console.log("NKPL Syntax error: Expected equal to sign after property keyword!");
}
const isString2 = tokens[position + 6].type === "string";
if(!isString2) {
    if(!tokens[position + 6]) {
        return console.log("NKPL Syntax error: Expected string!");
    }
    return console.log("NKPL Syntax error: Expected string!");
}
const propertyTo = tokens[position + 6].value;
console.log(store(fileName + 'SecretObjects')[propertyTo]);
position += 7;
}else if(token.type === "keyword" && token.value === "reverse") {
const isString = tokens[position + 1].type === "string";
if(!isString) {
  if(tokens[position + 1]) {
       return console.log("NKPL Syntax error: Expected string after reverse keyword!");
  }
  return console.log("NKPL Syntax error: Expected string after reverse keyword!");
}
const toReverse = tokens[position + 1].value;
if(toReverse.length < 2) {
    return console.error("NKPL String error: The string that has to be reversed must be atleast of 2 characters");
}
const revArray = [];
const length = toReverse.length - 1;
for(let i = length; i >= 0; i--) {
   revArray.push(toReverse[i]);
}
const outputT = revArray.join('');
console.log(outputT);
position += 2;
}else if(token.type = "keyword" && token.value === "getChar") {
const isEq = tokens[position + 1].type === "operator" && tokens[position + 1].value === "eq";
if(!isEq) {
 if(!tokens[position + 1]) {
  return console.log("NKPL Syntax error: Expected promise sign in getChar '=>'!");
 }
 return console.log("NKPL Syntax error: Expected promise sign in getChar '=>'!");
}
 const isLambda = tokens[position + 2].type === "lambda" && tokens[position + 2].value === "lambda";
 if(!isLambda) {
     if(!tokens[position + 2]) {
        return console.log("NKPL Syntax error: Expected promise sign in getChar '=>'!");
     }
     return console.log("NKPL Syntax error: Expected promise sign in getChar '=>'!");
 }
const isStringKey = tokens[position + 3].type === "keyword" && tokens[position + 3].value === "string";
if(!isStringKey) {
    if(!tokens[position + 3]) {
      return console.log("NKPL Syntax error: Expected String keyword in getChar after promise sign!");
    }
    return console.log("NKPL Syntax error: Expected String keyword in getChar after promise sign!");
}
const isColon = tokens[position + 4].type === "colon";
if(!isColon) {
if(!tokens[position + 4]) {
    return console.log("NKPL Syntax error: Expected colon after the string keyword in getChar!");
}
return console.log("NKPL Syntax error: Expected colon after the string keyword in getChar!");
}
const isString = tokens[position + 5].type === "string";
if(!isString) {
if(!tokens[position + 5]) {
     return console.log("NKPL Syntax error: Expected String after colon in getChar!");
}
return console.log("NKPL Syntax error: Expected String after colon in getChar!");
}
const targetString = tokens[position + 5].value;
const isComma = tokens[position + 6].type === "comma";
if(!isComma) { 
if(!tokens[position + 6]) {
   return console.log("NKPL Syntax error: Expected comma after string in getChar!");
}
return console.log("NKPL Syntax error: Expected comma after string in getChar!");
}
const isIndex = tokens[position + 7].type === "keyword" && tokens[position + 7].value === "index";
if(!isIndex) {
if(!tokens[position + 7]) {
   return console.log("NKPL Syntax error: Expected 'index' keyword after comma in getChar!");
}
return console.log("NKPL Syntax error: Expected 'index' keyword after comma in getChar!");
}
const isColon7 = tokens[position + 8].type === "colon" && tokens[position + 8].value === "colon";
if(!isColon7) {
if(!tokens[position + 8]) {
    return console.log("NKPL Syntax error: Expected colon after the index keyword in getChar!");
}
return console.log("NKPL Syntax error: Expected colon after the index keyword in getChar!");
}
const isString8 = tokens[position + 9].type === "string";
if(!isString8) {
if(!tokens[position + 9]) {
    return console.log("NKPL Syntax error: Expected string after colon in getChar!");
}
return console.log("NKPL Syntax error: Expected string after colon in getChar!");
} 
const indexNo = Number(tokens[position + 9].value);
if(tokens[position + 9].value === "last") {
console.log(targetString[(targetString.length) - 1]);
}else{
console.log(targetString[indexNo]);
}
position += 10
}
else if(token.type === "keyword" && token.value === "getMin") {
  const isString = tokens[position + 1].type === "string";
  if(!isString) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Syntax error: getMin keyword requires string!");
    }
    return console.log("NKPL Syntax error: getMin keyword requires string!");
  }
 const numbers = tokens[position + 1].value;
 const aNumbers = String(numbers).split(",");
 for(let x = 0; x <= aNumbers.length - 1; x++) {
   aNumbers[x] = Number(aNumbers[x])
 }
 Array.prototype.max = function() {
   return Math.max.apply(null, this);
 }
 Array.prototype.min = function() {
   return Math.min.apply(null, this);
 }
 console.log(aNumbers.min())
  if(tokens[position + 2] === undefined) {
   return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
   return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
}else{
  position += 3
}
}else if(token.type === "keyword" && token.value === "getLog") {
  const isString = tokens[position + 1].type === "string";
  if(!isString) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Syntax error: getLog keyword requires string!");
    }
    return console.log("NKPL Syntax error: getLog keyword requires string!");
  }
  const mainNumber = tokens[position + 1].value;
  console.log(Math.log(Number(mainNumber)));
  if(tokens[position + 2] === undefined) {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getPI") {
   console.log(Math.PI);
}else if(token.type === "keyword" && token.value === "getAbs") {
  const isString = tokens[position + 1].type === "string";
  if(!isString) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Syntax error: getAbs keyword requires string!");
    }
    return console.log("NKPL Syntax error: getAbs keyword requires string!");
  }
  const mainNumber = tokens[position + 1].value;
   console.log(Math.abs(Number(mainNumber)));
   if(tokens[position + 2] === undefined) {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getSin") {
  const isString = tokens[position + 1].type === "string";
  if(!isString) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Syntax error: getSin keyword requires string!");
    }
    return console.log("NKPL Syntax error: getSin keyword requires string!");
  }
  const mainNumber = tokens[position + 1].value;
   console.log(Math.sin(Number(mainNumber)));
   if(tokens[position + 2] === undefined) {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getCos") {
  const isString = tokens[position + 1].type === "string";
  if(!isString) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Syntax error: getCos keyword requires string!");
    }
    return console.log("NKPL Syntax error: getCos keyword requires string!");
  }
  const mainNumber = tokens[position + 1].value;
   console.log(Math.cos(Number(mainNumber)));
   if(tokens[position + 2] === undefined) {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getTan") {
  const isString = tokens[position + 1].type === "string";
  if(!isString) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Syntax error: getTan keyword requires string!");
    }
    return console.log("NKPL Syntax error: getTan keyword requires string!");
  }
  const mainNumber = tokens[position + 1].value;
   console.log(Math.tan(Number(mainNumber)));
   if(tokens[position + 2] === undefined) {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 2] === ";") {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 3
 }
}else if(token.type === "keyword" && token.value === "getPercent") {
  const isEqualSign = tokens[position + 1].type === "operator" && tokens[position + 1].value === "eq";
  if(!isEqualSign) {
    if(!tokens[position + 1]) {
      return console.log("NKPL Syntax error: getPercent keyword requires promise sign '=>'");
    }
    return console.log("NKPL Syntax error: getPercent keyword requires promise sign '=>'");
  }
  const isLambda = tokens[position + 2].type === "lambda" && tokens[position + 2].value === "lambda";
  if(!isLambda) {
    if(!tokens[position + 2]) {
      return console.log("NKPL Syntax error: getPercent keyword requires promise sign '=>'");
    }
    return console.log("NKPL Syntax error: getPercent keyword requires promise sign '=>'");
  }
  const isPart = tokens[position + 3].type === "keyword" && tokens[position + 3].value === "parts";
 // const isTotalFst = tokens[position + 3].type === "keyword" && tokens[position + 3].value === "total";
  if(!isPart) {
      if(!tokens[position + 3]) {
         writeError("expected part numbers but got null!");
      }
      writeError("expected part numbers but got null!");
  }
  const isStringParts = tokens[position + 4].type === "string";
  if(!isStringParts) {
     if(!tokens[position + 4]) {
       writeError("expected string in parts!");
     }
     writeError("expected string in parts!");
  }
  const totalParts = tokens[position + 4].value;
  const isTotal = tokens[position + 5].type === "keyword" && tokens[position + 5].value === "total";
  const isStringParts2 = tokens[position + 6].type === "string";
  if(!isStringParts2) {
     if(!tokens[position + 4]) {
       writeError("expected string in parts!");
     }
     writeError("expected string in parts!");
  }
  const totalAmount = tokens[position + 6].value;
  console.log(`${Number(Number(totalParts)/Number(totalAmount) * 100)}%`)
   if(tokens[position + 7] === undefined) {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 7] === ";") {
    return console.log("NKPL error: Unexpected end of line! Expected semicolon ';'");
 }else{
   position += 8
 }
}else if(token.type === "keyword" && token.value === "getInput") {
  const isString = tokens[position + 1].type === "string";
  if(!isString) {
      if(!tokens[position + 1]) {
           return console.log("NKPL Input error: getInput keyword expects string!");
      }
      return console.log("NKPL Input error: getInput keyword expects string!");
  }
  const questionToAsk = tokens[position + 1].value;
  const isEqualSign = tokens[position + 2].type === "operator" && tokens[position + 2].value === "eq";
  if(!isEqualSign) {
    if(!tokens[position + 2]) {
      return console.log("NKPL Syntax error: getPercent keyword requires promise sign '=>'");
    }
    return console.log("NKPL Syntax error: getPercent keyword requires promise sign '=>'");
  }
  const isLambda = tokens[position + 3].type === "lambda" && tokens[position + 3].value === "lambda";
  if(!isLambda) {
    if(!tokens[position + 3]) {
      return console.log("NKPL Syntax error: getPercent keyword requires promise sign '=>'");
    }
    return console.log("NKPL Syntax error: getPercent keyword requires promise sign '=>'");
  }
  
  if(tokens[position + 4].type === "keyword" && tokens[position + 4].value === "inputValue") {
    console.log(questionToAsk);
    standard_input.on('data', function (data) {
      if(data === 'exit\n'){
          if((position + 1) === tokens.length) {
              process.exit();
          }else{
              position++
          }
      }else
      {
          console.log(data.toString())
          position+=6;
          process.exit();
      }
    });
  }else if(tokens[position + 4].type === "keyword" && tokens[position + 4].value === "writeValue") {
      const isString = tokens[position + 5].type === "string";
      if(!isString) {
         if(!tokens[position + 5]) {
            return console.log("NKPL Input error: writeValue keyword in getInput promise expects a string!");
         }
         return console.log("NKPL Input error: writeValue keyword in getInput promise expects a string!");
      }
      const strToWrite = tokens[position + 5].value;
      console.log(questionToAsk);
    standard_input.on('data', function (data) {
      if(data === 'exit\n'){
          if((position + 1) === tokens.length) {
              process.exit();
          }else{
              position++
          }
      }else
      {
        const newStrToWrite = strToWrite.replace('${input}',data);
        console.log(newStrToWrite);
        position+=6;
          process.exit();
      }
    });
  }else if(tokens[pos + 4].type === "keyword" && tokens[pos + 4].value === "findValue") {
  readline.question(questionToAsk, inputValue => {
    console.log(eval(inputValue));
    readline.close();
     pos += 5;
  });
}
}



       position++
    }
},
exitHandler: function exitHandler(options, exitCode) {
  if (options.cleanup) {
    //console.log('clean');
    store()
  } 
  if (exitCode || exitCode === 0) //console.log("NKPL Compiler: The process successfully exited with exit code " + String(exitCode));
  if (options.exit) process.exit();
},


}
function parseIfCodes(token, tokens, position) {
  if(token.type === "keyword" && token.value === "write") {
    let isVar = tokens[position + 1].type === "keyword" && tokens[position + 1].value === "getVar";
     const valueIsString = tokens[position + 1].type === "string";
     if(!valueIsString && !isVar) {
       if(!token[position + 1]) {
        return console.log(`Unexpected end of line! write method expects string and variables and some built-in functions only!`);
       }
       return console.log(`Unexpected token ${tokens[position + 1].type}`)
     }
     if(isVar) {
      const isVarString = tokens[position + 2].type === "string";
      if(!isVarString) {
        if(!tokens[position + 2]){
          return console.log("NKPL Variable error: getVar only accepts string!");
        }
        return console.log("NKPL Variable error: getVar only accepts string!");
      }
        if(!tokens[position + 3].value in vars) {
          return console.log(`NKPL Variable Error: The requested variable ${tokens[position + 1].value} is not defined!`)
        }
        console.log(vars[tokens[position + 2].value])
     }else{

     }
     if(tokens[position + 2] === undefined) {
      return console.log("Unexpected end of line! Expected semicolon ';'");
   }else if(!tokens[position + 2] === ";") {
      return console.log("Unexpected end of line! Expected semicolon ';'");
   }
   console.log(tokens[position + 1].value);
     position += 2
   }else if(token.type === "keyword" && token.value === "vary") {
     const isCustomKeyWord = tokens[position + 1] && tokens[position + 1].type === "string";
     if(!isCustomKeyWord) {
      if(!tokens[position + 1]) {
        return console.log("Unexpected end of line! Expected a variable name in string!");
      }
      return console.log(`Unexpected token ${tokens[position + 1].type}! Expected a variable name in string!`)
     }
     const varyName = tokens[position + 1].value;
     const isEqualSign = tokens[position + 2] && tokens[position + 2].type === "operator" && tokens[position + 2].value === "eq";
     if(!isEqualSign) {
      if(!tokens[position + 2]) {
        return console.log("Unexpected end of line, expected '=' sign after variable name!")
      }
      return console.log(`Unexpected token ${tokens[position + 2].type}! expected '=' sign after variable name!`)
     }

     const isString = tokens[position + 3] && tokens[position + 3].type === "string"; 
     if(!isString) {
      if(!tokens[position + 3]) {
        return console.log("Unexpected end of line! Expected String!");
      }
      return console.log(`Unexpected token ${tokens[position + 3].type}! Expected String!`)
     }
  if(varyName in vars) {
    return console.log(`NKPL Variable Error:- Variable ${varyName} already exists!`);
  }
  vars[varyName] = tokens[position + 3].value;
  position+= 4;
   }else if(token.type === "keyword" && token.value === "com") {
     const valueIsString = tokens[position + 1].type === "string";
     if(!valueIsString) {
       if(!token[position + 1]) {
        return console.log(`Unexpected end of line! Comments should be put inside double quotes!`);
       }
       return console.log(`Unexpected token ${tokens[position + 1].type}`)
     }
     position += 2
   }else if(token.type === "keyword" && token.value === "find" || token.type === "keyword" && token.value === "Find") {
         const isString = tokens[position + 1].type === "string"
         if(!isString) {
          if(!tokens[position + 1]) {
            return console.error(`NKPL Unexpected error: Find/find method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
          }
          return console.error(`NKPL Unexpected Error:Find method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
          }
          
          if(tokens[position + 2] === undefined) {
            return console.log("Unexpected end of line! Expected semicolon ';'");
         }else if(!tokens[position + 2] === ";") {
            return console.log("Unexpected end of line! Expected semicolon ';'");
         }else{
          try {
            const targetAnswer = eval(String(tokens[position + 1].value))
            console.log(targetAnswer);
          }
          catch(error) {
            return console.log(error)
          }
           position += 2
         }
   }else if(token.type === "keyword" && token.value === "sqrt" || token.type === "keyword" && token.value === "Sqrt") {
    const isString = tokens[position + 1].type === "string"
    if(!isString) {
     if(!tokens[position + 1]) {
       return console.error(`NKPL Unexpected error: Sqrt/sqrt method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
     }
     return console.error(`NKPL Unexpected Error: Sqrt method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
     }
     
     if(tokens[position + 2] === undefined) {
       return console.log("Unexpected end of line! Expected semicolon ';'");
    }else if(!tokens[position + 2] === ";") {
       return console.log("Unexpected end of line! Expected semicolon ';'");
    }else{
     try {
       const targetAnswer = Math.sqrt(Number(tokens[position + 1].value));
       console.log(targetAnswer);
     }
     catch(error) {
       return console.log(error)
     }
      position += 2
    }
}else if(token.type === "keyword" && token.value === "cbrt" || token.type === "keyword" && token.value === "cbrt") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
 if(!tokens[position + 1]) {
   return console.error(`NKPL Unexpected error: cbrt/Cbrt method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
 }
 return console.error(`NKPL Unexpected Error: Cbrt method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
 }
 
 if(tokens[position + 2] === undefined) {
   return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
   return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
 try {
   const targetAnswer = Math.cbrt(Number(tokens[position + 1].value));
   console.log(targetAnswer);
 }
 catch(error) {
   return console.log(error)
 }
  position += 2
}
}else if(token.type === "keyword" && token.value === "round" || token.type === "keyword" && token.value === "Round") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: Round/round method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: Round/round method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
try {
 const targetAnswer = Math.round(Number(tokens[position + 1].value));
 console.log(targetAnswer);
}
catch(error) {
 return console.log(error)
}
position += 2
}
}else if(token.type === "keyword" && token.value === "random") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: random method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: random method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
try {
const firstNumber = Number(tokens[position + 1].value);
 const targetNumber = Math.floor((Math.random() * firstNumber) + 1);
 console.log(targetNumber);
} catch(error) {
return console.log(error)
}
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "createFile") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: createFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: createFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
const isString2 = tokens[position + 2].type === "string"
if(!isString2) {
if(!tokens[position + 2]) {
  return console.error(`NKPL Unexpected error: createFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: createFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileContent = tokens[position + 2].value;
fs.writeFile(fileName, String(fileContent), 'utf8', (err) => {
  if (err) {
      console.log(`NKPL File writer exception: Unable to write your file`);
  }else{
    console.log(`NKPL File writer: Successfully created/updated your file named ${fileName}`);
  }
});
if(tokens[position + 3] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 3] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 4
}
}else if(token.type === "keyword" && token.value === "deleteFile") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: deleteFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: deleteFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
fs.unlink(fileName, (err) => {
  if (err) {
      console.log(`NKPL File writer exception: Unable to delete your file`);
  }else{
    console.log(`NKPL File writer: Successfully deleted your file named ${fileName}`);
  }
});
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "readFile") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: readFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: readFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
const allFileContents = fs.readFileSync(fileName, 'utf8');
allFileContents.split(/\r?\n/).forEach(fileValue =>  {
console.log(fileValue);
}); 
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getFileSizeInMB") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getFileSizeInMB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInMB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
fs.stat(fileName, (err, stats) => {
if (err) {
  console.log(`NKPL File writer exception: Unable to get your file`);
} else {
    console.log(stats.size/1000000 + " MB");
}
});
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getFileSizeInGB") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getFileSizeInGB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInGB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
fs.stat(fileName, (err, stats) => {
if (err) {
  console.log(`NKPL File writer exception: Unable to get your file`);
} else {
    console.log(stats.size/1000000000 + " GB");
}
});
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getFileSize") {
return console.log("NKPL Functions error: No such function called getFileSize. By the way, getFileSize has 5 forms. You might be interested to use them. They are:-\n1. getFileSizeInB \n2. getFileSizeInKB\n3. getFileSizeInMB\n4. getFileSizeInGB\n5.getFileSizeInTB")
}else if(token.type === "keyword" && token.value === "getFileSizeInTB") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getFileSizeInTB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInTB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
fs.stat(fileName, (err, stats) => {
if (err) {
  console.log(`NKPL File writer exception: Unable to get your file`);
} else {
    console.log(stats.size/1000000000000 + " TB");
}
});
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getFileSizeInKB") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getFileSizeInKB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInKB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
fs.stat(fileName, (err, stats) => {
if (err) {
  console.log(`NKPL File writer exception: Unable to get your file`);
} else {
    console.log(stats.size/1000 + " KB");
}
});
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getFileSizeInKB") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getFileSizeInKB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInKB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
fs.stat(fileName, (err, stats) => {
if (err) {
  console.log(`NKPL File writer exception: Unable to get your file`);
} else {
    console.log(stats.size/1000 + " KB");
}
});
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getFileSizeInB") {
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getFileSizeInB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 1].value;
fs.stat(fileName, (err, stats) => {
if (err) {
  console.log(`NKPL File writer exception: Unable to get your file`);
} else {
    console.log(stats.size + " B");
}
});
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getCurrentYear") {
const date = new Date();
const fullYear = date.getFullYear();
console.log(fullYear)
position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonth") {
const date = new Date();
const fullYear = date.getMonth()+1;
console.log(fullYear)
position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonthName") {
const date = new Date();
const fullYear = date.getMonth()+1;
if(fullYear === 1) {
console.log("January")
}else if(fullYear === 2){
console.log("February")
}else if(fullYear === 3) {
console.log("March")
}else if(fullYear === 4) {
console.log("April")
}else if(fullYear === 5) {
console.log("May")
}else if(fullYear === 6) {
console.log("June")
}else if(fullYear === 7) {
console.log("July")
}else if(fullYear === 8) {
console.log("August")
}else if(fullYear === 9) {
console.log("September")
}else if(fullYear === 10) {
console.log("October")
}else if(fullYear === 11) {
console.log("November")
}else if(fullYear === 12) {
console.log("December")
}
position ++;
}else if(token.type === "keyword" && token.value === "getCurrentDayName") {
const date = new Date();
const fullYear = date.getDay();
if(fullYear === 1) {
console.log("Monday")
}else if(fullYear === 2){
console.log("Tuesday")
}else if(fullYear === 3) {
console.log("Wednesday")
}else if(fullYear === 4) {
console.log("Thursday")
}else if(fullYear === 5) {
console.log("Friday")
}else if(fullYear === 6) {
console.log("Saturday")
}else if(fullYear === 7) {
console.log("Sunday")
}
position ++;
}else if(token.type === "keyword" && token.value === "getCurrentDay") {
const date = new Date();
const fullYear = date.getDay();
console.log(fullYear)
position ++;
}else if(token.type === "keyword" && token.value === "getDate") {
const date = new Date();
const dayD= date.getDate();
const month = date.getMonth()+1;
const fullYear = date.getFullYear();
/*const dateFormat = dayD + "/" + month + "/" + fullYear;
console.log(dateFormat)*/
if(tokens[position + 1] === undefined) {
return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
}
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

const dateFormatGet = tokens[position + 1].value;
if(dateFormatGet === "DD/MM/YYYY") {
const dateFormat = dayD + "/" + month + "/" + fullYear;
console.log(dateFormat)
}else if(dateFormatGet === "MM/DD/YYYY") {
const dateFormat = month + "/" + dayD + "/" + fullYear;
console.log(dateFormat)
}else if(dateFormatGet === "YYYY/MM/DD") {
const dateFormat = fullYear + "/" + month + "/" + dayD;
console.log(dateFormat)
}else if(dateFormatGet === "DD/YYYY/MM") {
const dateFormat = dayD + "/" + fullYear + "/" + month;
console.log(dateFormat)
}else{
 return console.log(`NKPL Date Format Error: No such date format called ${dateFormatGet}! Please refer to docs for more information.`)
}
if(tokens[position + 2] === undefined) {
return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getTime") {
const date = new Date();
const getHours = date.getHours();
const getMinutes = date.getMinutes();
const getSeconds = date.getSeconds();
/*const dateFormat = dayD + "/" + month + "/" + fullYear;
console.log(dateFormat)*/
if(tokens[position + 1] === undefined) {
return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
}
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

const timeFormatGet = tokens[position + 1].value;
if(timeFormatGet === "24"){
 console.log(`${getHours}:${getMinutes}`)
}else if(timeFormatGet === "12"){
const result = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
 });
 console.log(result)
}

if(tokens[position + 2] === undefined) {
return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getTimeWithS") {
const date = new Date();
const getHours = date.getHours();
const getMinutes = date.getMinutes();
const getSeconds = date.getSeconds();
/*const dateFormat = dayD + "/" + month + "/" + fullYear;
console.log(dateFormat)*/
if(tokens[position + 1] === undefined) {
return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
}
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

const timeFormatGet = tokens[position + 1].value;
if(timeFormatGet === "24"){
 console.log(`${getHours}:${getMinutes}:${getSeconds}`)
}else if(timeFormatGet === "12"){
const result = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  second:"numeric",
  hour12: true,
 });
 console.log(result)
}
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "renameFile") {
const isString = tokens[position + 1] && tokens[position + 1].type === "string";
if(!isString) {
if(!tokens[position + 1]) {
  return console.log("NKPL Type error: Rename File only accepts strings!");
}
return console.log("NKPL Type error: Rename File only accepts strings!");
}
const baseFileName = tokens[position + 1].value;
const isString2 = tokens[position + 2] && tokens[position + 2].type === "string";
if(!isString2) {
if(!tokens[position + 2]) {
  return console.log("NKPL Type error: Rename File only accepts strings!");
}
return console.log("NKPL Type error: Rename File only accepts strings!");
}
const newFileName = tokens[position + 2].value;
try {
const oldPath = Path.join(__dirname, baseFileName)  
const newPath = Path.join(__dirname, newFileName)
  fs.rename(baseFileName, newFileName, (err) => {
if (err) throw err;
console.log('NKPL Success message: Successfully renamed your file!');
});
}catch(e) {
  return console.log(e);
}  
}else if(token.type === "keyword" && token.value === "loop") {
const isString = tokens[position + 1] && tokens[position + 1].type === "string";
if(!isString) {
 if(!tokens[position + 1]) {
    return console.log("NKPL loop error: Loop has first parameter of string!");
 }
 return console.log("NKPL loop error: Loop has first parameter of string!");
}
if(tokens[position + 1] === undefined) {
var numberOfTimes = 1;
}
var numberOfTimes = Number(tokens[position + 1].value - 1);
if (numberOfTimes === undefined) {
 numberOfTimes = 1
 return numberOfTimes = 1;
}
try {
const colonIsPresent = tokens[position + 2] && tokens[position + 2].type === "colon" && tokens[position + 2].value === "colon";
if(!colonIsPresent) {
   if(!tokens[position + 2]) {
      return console.log("NKPL loop error: Loop only accepts colon and the code after it!");
   }
   return console.log("NKPL loop error: Loop only accepts colon and the code after it!");
}
parseMore(numberOfTimes);
}catch(error) {
return console.log("NKPL compiling error: Unable to parse your code! Please verify that you have entered the right codes and try again!")
}
function parseMore(numberOfTimes) {
/*for(let x = 0; x <= Number(numberOfTimes); x++) {
   
}*/
if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "write") {
  let isVar = tokens[position + 4].type === "keyword" && tokens[position + 4].value === "getVar";
   const valueIsString = tokens[position + 4].type === "string";
   if(!valueIsString && !isVar) {
     if(!token[position + 4]) {
      return console.log(`Unexpected end of line! write method expects string and variables and some built-in functions only!`);
     }
     return console.log(`Unexpected token ${tokens[position + 1].type}`)
   }
   if(isVar) {
    const isVarString = tokens[position + 6].type === "string";
    if(!isVarString) {
      if(!tokens[position + 6]){
        return console.log("NKPL Variable error: getVar only accepts string!");
      }
      return console.log("NKPL Variable error: getVar only accepts string!");
    }
      if(!tokens[position + 4].value in vars) {
        return console.log(`NKPL Variable Error: The requested variable ${tokens[position + 1].value} is not defined!`)
      }
      for(let x = 0; x <= Number(numberOfTimes); x++) {
        console.log(vars[tokens[position + 3].value])
      }
   }else{

   }
   if(tokens[position + 5] === undefined) {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }else if(!tokens[position + 5] === ";") {
    return console.log("Unexpected end of line! Expected semicolon ';'");
 }
 for(let x = 0; x <= Number(numberOfTimes); x++) {
  console.log(tokens[position + 4].value);
}
   position += 5
 }else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "find" || tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Find") {
  const isString = tokens[position + 4].type === "string"
  if(!isString) {
   if(!tokens[position + 4]) {
     return console.error(`NKPL Unexpected error: Find/find method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
   }
   return console.error(`NKPL Unexpected Error:Find method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
   }
   
   if(tokens[position + 5] === undefined) {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else if(!tokens[position + 5] === ";") {
     return console.log("Unexpected end of line! Expected semicolon ';'");
  }else{
   try {
     const targetAnswer = eval(String(tokens[position + 1].value))
     for(let x = 0; x <= Number(numberOfTimes); x++) {
      console.log(targetAnswer);
    }
   }
   catch(error) {
     return console.log(error)
   }
    position += 6
  }
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "sqrt" || tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Sqrt") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: Sqrt/sqrt method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: Sqrt method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
try {
 const targetAnswer = Math.sqrt(Number(tokens[position + 4].value));
 for(let x = 0; x <= Number(numberOfTimes); x++) {
  console.log(targetAnswer);
}
}
catch(error) {
 return console.log(error)
}
position += 6;
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "cbrt" || tokens[position + 3].type === "keyword" && tokens[position + 3].value === "cbrt") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: cbrt/Cbrt method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: Cbrt method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
try {
 const targetAnswer = Math.cbrt(Number(tokens[position + 4].value));
 for(let x = 0; x <= Number(numberOfTimes); x++) {
  console.log(targetAnswer);
}
}
catch(error) {
 return console.log(error)
}
position += 6
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "round" || tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Round") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: Round/round method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: Round/round method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
try {
 const targetAnswer = Math.round(Number(tokens[position + 4].value));
 for(let x = 0; x <= Number(numberOfTimes); x++) {
  console.log(targetAnswer);
}
}
catch(error) {
 return console.log(error)
}
position += 2
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "random") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: random method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: random method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
try {
const firstNumber = Number(tokens[position + 4].value);
 const targetNumber = Math.floor((Math.random() * firstNumber) + 1);
 for(let x = 0; x <= Number(numberOfTimes); x++) {
  console.log(targetNumber);
}
} catch(error) {
return console.log(error)
}
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "randomd") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: randomd method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: randomd method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
try {
const firstNumber = Number(tokens[position + 4].value);
 for(let x = 0; x <= Number(numberOfTimes); x++) {
  console.log(Math.floor((Math.random() * firstNumber) + 1));
}
} catch(error) {
return console.log(error)
}
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "createFile") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: createFile method only accepts only strings! The requested token ${tokens[position + 4].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: createFile method only accepts strings! The token ${tokens[position + 4].value} is not of string datatype. It's a ${tokens[position + 4].type}`)
}
const fileName = tokens[position + 4].value;
const isString2 = tokens[position + 5].type === "string"
if(!isString2) {
if(!tokens[position + 5]) {
  return console.error(`NKPL Unexpected error: createFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: createFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileContent = tokens[position + 5].value;
for(let x = 0; x <= Number(numberOfTimes); x++) {
  fs.writeFile(fileName, String(fileContent), 'utf8', (err) => {
    if (err) {
        console.log(`NKPL File writer exception: Unable to write your file`);
    }else{
      console.log(`NKPL File writer: Successfully created/updated your file named ${fileName}`);
    }
  });
}

if(tokens[position + 6] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 6] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 4
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "deleteFile") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: deleteFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: deleteFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 4].value;
fs.unlink(fileName, (err) => {
  if (err) {
      console.log(`NKPL File writer exception: Unable to delete your file`);
  }else{
    console.log(`NKPL File writer: Successfully deleted your file named ${fileName}`);
  }
});
if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 6
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "readFile") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: readFile method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: readFile method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 4].value;
for(let x = 0; x <= Number(numberOfTimes); x++) {
const allFileContents = fs.readFileSync(fileName, 'utf8');
allFileContents.split(/\r?\n/).forEach(fileValue =>  {
   console.log(fileValue);
}); 
}

const allFileContents = fs.readFileSync(fileName, 'utf8');
allFileContents.split(/\r?\n/).forEach(fileValue =>  {
console.log(fileValue);
}); 
if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 6
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getFileSizeInMB") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: getFileSizeInMB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInMB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 4].value;
for(let x = 0; x <= Number(numberOfTimes); x++) {
   fs.stat(fileName, (err, stats) => {
if (err) {
  console.log(`NKPL File writer exception: Unable to get your file`);
} else {
    console.log(stats.size/1000000 + " MB");
}
});
}
if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 5
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getFileSizeInGB") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: getFileSizeInGB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInGB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 4].value;
for(let x = 0; x <= Number(numberOfTimes); x++) {
  fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000000000 + " GB");
    }
    });
}

if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 6
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getFileSize") {
return console.log("NKPL Functions error: No such keyword or function called getFileSize. By the way, getFileSize has 5 forms. You might be interested to use them. They are:-\n1. getFileSizeInB \n2. getFileSizeInKB\n3. getFileSizeInMB\n4. getFileSizeInGB\n5.getFileSizeInTB")
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getFileSizeInTB") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: getFileSizeInTB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInTB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
for(let x = 0; x <= Number(numberOfTimes); x++) {
  fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000000000000 + " TB");
    }
    });
}

if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 6
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getFileSizeInKB") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: getFileSizeInKB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInKB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 4].value;
for(let x = 0; x <= Number(numberOfTimes); x++) {
  fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000 + " KB");
    }
    });
  }
if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 6
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getFileSizeInKB") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: getFileSizeInKB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInKB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 4].value;
for(let x = 0; x <= Number(numberOfTimes); x++) {
  fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size/1000 + " KB");
    }
    });
}

if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 6
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getFileSizeInB") {
const isString = tokens[position + 4].type === "string"
if(!isString) {
if(!tokens[position + 4]) {
 return console.error(`NKPL Unexpected error: getFileSizeInB method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getFileSizeInB method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}
const fileName = tokens[position + 4].value;
for(let x = 0; x <= Number(numberOfTimes); x++) {
  fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log(`NKPL File writer exception: Unable to get your file`);
    } else {
        console.log(stats.size + " B");
    }
    });
}

if(tokens[position + 5] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 5] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 6
}
}else if(tokens[position + 3].type === "keyword" && tokens[position + 3].value === "getCurrentYear") {
const date = new Date();
const fullYear = date.getFullYear();
for(let x = 0; x <= Number(numberOfTimes); x++) {
  console.log(fullYear);
}
position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonth") {
const date = new Date();
const fullYear = date.getMonth()+1;
console.log(fullYear)
position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonthName") {
const date = new Date();
const fullYear = date.getMonth()+1;
if(fullYear === 1) {
console.log("January")
}else if(fullYear === 2){
console.log("February")
}else if(fullYear === 3) {
console.log("March")
}else if(fullYear === 4) {
console.log("April")
}else if(fullYear === 5) {
console.log("May")
}else if(fullYear === 6) {
console.log("June")
}else if(fullYear === 7) {
console.log("July")
}else if(fullYear === 8) {
console.log("August")
}else if(fullYear === 9) {
console.log("September")
}else if(fullYear === 10) {
console.log("October")
}else if(fullYear === 11) {
console.log("November")
}else if(fullYear === 12) {
console.log("December")
}
position ++;
}else if(token.type === "keyword" && token.value === "getCurrentDayName") {
const date = new Date();
const fullYear = date.getDay();
if(fullYear === 1) {
console.log("Monday")
}else if(fullYear === 2){
console.log("Tuesday")
}else if(fullYear === 3) {
console.log("Wednesday")
}else if(fullYear === 4) {
console.log("Thursday")
}else if(fullYear === 5) {
console.log("Friday")
}else if(fullYear === 6) {
console.log("Saturday")
}else if(fullYear === 7) {
console.log("Sunday")
}
position ++;
}else if(token.type === "keyword" && token.value === "getCurrentDay") {
const date = new Date();
const fullYear = date.getDay();
console.log(fullYear)
position ++;
}else if(token.type === "keyword" && token.value === "getDate") {
const date = new Date();
const dayD= date.getDate();
const month = date.getMonth()+1;
const fullYear = date.getFullYear();
/*const dateFormat = dayD + "/" + month + "/" + fullYear;
console.log(dateFormat)*/
if(tokens[position + 1] === undefined) {
return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
}
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

const dateFormatGet = tokens[position + 1].value;
if(dateFormatGet === "DD/MM/YYYY") {
const dateFormat = dayD + "/" + month + "/" + fullYear;
console.log(dateFormat)
}else if(dateFormatGet === "MM/DD/YYYY") {
const dateFormat = month + "/" + dayD + "/" + fullYear;
console.log(dateFormat)
}else if(dateFormatGet === "YYYY/MM/DD") {
const dateFormat = fullYear + "/" + month + "/" + dayD;
console.log(dateFormat)
}else if(dateFormatGet === "DD/YYYY/MM") {
const dateFormat = dayD + "/" + fullYear + "/" + month;
console.log(dateFormat)
}else{
 return console.log(`NKPL Date Format Error: No such date format called ${dateFormatGet}! Please refer to docs for more information.`)
}
if(tokens[position + 2] === undefined) {
return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getTime") {
const date = new Date();
const getHours = date.getHours();
const getMinutes = date.getMinutes();
const getSeconds = date.getSeconds();
/*const dateFormat = dayD + "/" + month + "/" + fullYear;
console.log(dateFormat)*/
if(tokens[position + 1] === undefined) {
return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
}
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

const timeFormatGet = tokens[position + 1].value;
if(timeFormatGet === "24"){
 console.log(`${getHours}:${getMinutes}`)
}else if(timeFormatGet === "12"){
const result = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
 });
 console.log(result)
}

if(tokens[position + 2] === undefined) {
return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "getTimeWithS") {
const date = new Date();
const getHours = date.getHours();
const getMinutes = date.getMinutes();
const getSeconds = date.getSeconds();
/*const dateFormat = dayD + "/" + month + "/" + fullYear;
console.log(dateFormat)*/
if(tokens[position + 1] === undefined) {
return console.error(`NKPL Function error: getDate method requires string but got ${tokens[position + 1].value}`)
}
const isString = tokens[position + 1].type === "string"
if(!isString) {
if(!tokens[position + 1]) {
 return console.error(`NKPL Unexpected error: getDate method only accepts only strings! The requested token ${tokens[position + 1].value} is not of string datatype!`);             
}
return console.error(`NKPL Unexpected Error: getDate method only accepts strings! The token ${tokens[position + 1].value} is not of string datatype. It's a ${tokens[position + 1].type}`)
}

const timeFormatGet = tokens[position + 1].value;
if(timeFormatGet === "24"){
 console.log(`${getHours}:${getMinutes}:${getSeconds}`)
}else if(timeFormatGet === "12"){
const result = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  second:"numeric",
  hour12: true,
 });
 console.log(result)
}
if(tokens[position + 2] === undefined) {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else if(!tokens[position + 2] === ";") {
 return console.log("Unexpected end of line! Expected semicolon ';'");
}else{
position += 3
}
}else if(token.type === "keyword" && token.value === "renameFile") {
const isString = tokens[position + 1] && tokens[position + 1].type === "string";
if(!isString) {
if(!tokens[position + 1]) {
  return console.log("NKPL Type error: Rename File only accepts strings!");
}
return console.log("NKPL Type error: Rename File only accepts strings!");
}
const baseFileName = tokens[position + 1].value;
const isString2 = tokens[position + 2] && tokens[position + 2].type === "string";
if(!isString2) {
if(!tokens[position + 2]) {
  return console.log("NKPL Type error: Rename File only accepts strings!");
}
return console.log("NKPL Type error: Rename File only accepts strings!");
}
const newFileName = tokens[position + 2].value;
try {
const oldPath = Path.join(__dirname, baseFileName)  
const newPath = Path.join(__dirname, newFileName)
  fs.rename(baseFileName, newFileName, (err) => {
if (err) throw err;
console.log('NKPL Success message: Successfully renamed your file!');
});
}catch(e) {
  return console.log(e);
}  
}
}
}else if(token.type === "keyword" && token.value === "if") {
if(tokens[position + 1] === undefined) {
return console.log("NKPL Syntax error: Cannot have an empty if statement!");
}else{
const isString = tokens[position + 1].type = "string";
if(!isString) {
  if(!tokens[position + 1]) {
    return console.log("NKPL Unexpected error: If statement expects a string which has a condition in it");
  }
  return console.log("NKPL Unexpected error: If statement expects a string which has a condition in it");
}
const condition = String(tokens[position + 1].value);
//console.log(Boolean(eval(condition)));
const isColon = tokens[position + 2].type === "colon" && tokens[position + 2].value === "colon";
if(!isColon) {
if(!tokens[position + 2]) {
  return console.log("NKPL Syntax error: If statement expects colon ':'!");
}
return console.log("NKPL Syntax error: If statement expects colon ':'!");
}
if(Boolean(eval(condition)) === true) {
  parseIfCodes(tokens[position], tokens, position);
}else{
 console.log("Condition is not satisfied!");
}
}
}/*else if(token.type === "keyword" && token.value === "writeResponse") { 
   
}*/
   position++
}
function searchObj (obj, query) {

  for (var key in obj) {
      var value = obj[key];
      if (typeof value === 'object') {
          searchObj(value, query);
      }

      if (value === query) {
          console.log('property=' + key + ' value=' + value);
      }

  }

}
//do something when app is closing
process.on('exit', parser.exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', parser.exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', parser.exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', parser.exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', parser.exitHandler.bind(null, {exit:true}));
  module.exports = parser;
