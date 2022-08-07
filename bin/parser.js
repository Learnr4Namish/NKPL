const { sqrt } = require("mathjs");
const fs = require("fs");
const parser = {
  parse:function parse(tokens) {
    const nLength = tokens.length;
    let position = 0;
    const vars = {}
    while (position < nLength) {
       const token = tokens[position];
       if(token.type === "keyword" && token.value === "write") {
        let isVar = tokens[position + 1].type === "keyword_custom";
         const valueIsString = tokens[position + 1].type === "string";
         if(!valueIsString && !isVar) {
           if(!token[position + 1]) {
            return console.log(`Unexpected end of line! write method expects string and variables and some built-in functions only!`);
           }
           return console.log(`Unexpected token ${tokens[position + 1].type}`)
         }
         if(isVar) {
            if(!tokens[position + 1].value in vars) {
              return console.log(`NKPL Variable Error: The requested variable ${tokens[position + 1].value} is not defined!`)
            }
            console.log(vars[tokens[position + 1].value])
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
         const isCustomKeyWord = tokens[position + 1] && tokens[position + 1].type === "keyword_custom";
         if(!isCustomKeyWord) {
          if(!tokens[position + 1]) {
            return console.log("Unexpected end of line! Expected a variable name!");
          }
          return console.log(`Unexpected token ${tokens[position + 1].type}! Expected a variable name`)
         }
         const varyName = tokens[position + 1].value;
         getBuidlsd();
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
      console.log(vars[0]);
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
}
       position++
    }
}
}
  module.exports = parser;