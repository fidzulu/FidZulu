const fs = require('fs');

let read_json_file = () => {
    let file = './data/Laptopsjson.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};

exports.query_by_arg = (arg) => {

    // TODO: implement and use 
    // <throw new Error> when unknow argument is used
    incorrectArg = true;
    salesTax = 0.0;
    if(arg==="Raleigh"){
        salesTax = .075;
        incorrectArg=false;
    }
    if (arg==="Durham"){
        salesTax = .08;
        incorrectArg=false;
    }

    if(incorrectArg){
        throw new Error("Unknown location "+arg);
    }

    let json_result = JSON.parse(read_json_file());
    // all addresses are stored in a "result" object
   
    
    let result = json_result;
   
   
    console.log("query by Location: " + arg );
    for (let i = 0; i < result.length; i++) {
        let curPrice =  result[i]['price'];
        result[i]['price']= Math.round((curPrice+ (curPrice*salesTax))*100)/100

    }
   return result;
};

var validator = require('validator');




exports.insertLaptop = (laptop) => {
    return new Promise((resolve, reject) => {
        if(!laptop.product) {
            reject(new Error('BAD REQUEST: Missing laptop parameter \'product\''));
          }
          if(!laptop.brand) {
            reject(new Error('BAD REQUEST: Missing laptop parameter \'brand\''));
          }
          if(!laptop.CPU) {
            reject(new Error('BAD REQUEST: Missing laptop parameter \'CPU\''));
          }
          if(!laptop.memory) {
            reject(new Error('BAD REQUEST: Missing laptop parameter \'memory\''));
          }
          if(!laptop.price) {
            reject(new Error('BAD REQUEST: Missing laptop parameter \'price\''));
          }
          if(!validator.isAlphanumeric(laptop.product, "en-US", {ignore: " -'"})) {
            reject(new Error('BAD REQUEST: \'product\' must be an alphanumeric string'));
          }
          if(!validator.isAlphanumeric(laptop.brand, "en-US", {ignore: " -'"})) {
            reject(new Error('BAD REQUEST: \'brand\' must be an alphanumeric string'));
          }
          if(!validator.isAlphanumeric(laptop.CPU, "en-US", {ignore: " -'"})) {
            reject(new Error('BAD REQUEST: \'CPU\' must be an alphabetic string'));
          }
          if(!validator.isAlphanumeric(laptop.memory, "en-US", {ignore: " -'"})) {
            reject(new Error('BAD REQUEST: \'memory\' must be an alphabetic string'));
          }
          if(!validator.isDecimal(laptop.price?.toString())) {
            reject(new Error('BAD REQUEST: \'price\' must be a decimal number'));
          }
          if(laptop?.price < 0){
            reject(new Error('BAD REQUEST: \'price\' may not be negative'));
          }
          try{
            let laptopJSON = fs.readFileSync("./data/Laptopsjson.json");
            let laptops = JSON.parse(laptopJSON);
            laptops.push(laptop);
            fs.writeFileSync("./data/Laptopsjson.json", JSON.stringify(laptops, null, 2));
            resolve(JSON.stringify(laptops));
          } catch (error) {
            console.error(error);
            reject(new Error("Error writing laptop data"));
          }
    })
}


