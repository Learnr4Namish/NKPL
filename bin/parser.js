const { sqrt } = require("mathjs");
const fs = require("fs");
const parser = {
  parse:function parse(tokens) {
    console.log(tokens);
    const nLength = tokens.length;
    let position = 0;
    const vars = {}
    while (position < nLength) {
       const token = tokens[position];
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
            console.log(vars)
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
  const fullYear = date.getMonth();
  console.log(fullYear)
    position ++;
}else if(token.type === "keyword" && token.value === "getCurrentMonthName") {
  const date = new Date();
  const fullYear = date.getMonth();
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
  const dayD= date.getDay();
  const month = date.getMonth();
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
}
       position++
    }
}
}
  module.exports = parser;
