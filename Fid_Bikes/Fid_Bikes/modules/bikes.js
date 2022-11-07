const fs = require('fs');

let read_json_file = () => {
    let file = './data/Bikejson.json';
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




exports.insertBike = (bike) => {
    return new Promise((resolve, reject) => {
        if(!bike.name) {
            reject(new Error('BAD REQUEST: Missing bike parameter \'name\''));
          }
          if(!bike.brand) {
            reject(new Error('BAD REQUEST: Missing bike parameter \'brand\''));
          }
          if(!bike.color) {
            reject(new Error('BAD REQUEST: Missing bike parameter \'color\''));
          }
          if(!bike.price) {
            reject(new Error('BAD REQUEST: Missing bike parameter \'price\''));
          }
          if(!validator.isAlphanumeric(bike.name, "en-US", {ignore: " -'"})) {
            reject(new Error('BAD REQUEST: \'name\' must be an alphanumeric string'));
          }
          if(!validator.isAlphanumeric(bike.brand, "en-US", {ignore: " -'"})) {
            reject(new Error('BAD REQUEST: \'brand\' must be an alphanumeric string'));
          }
          if(!validator.isAlpha(bike.color, "en-US", {ignore: " -'"})) {
            reject(new Error('BAD REQUEST: \'color\' must be an alphabetic string'));
          }
          if(!validator.isDecimal(bike.price?.toString())) {
            reject(new Error('BAD REQUEST: \'price\' must be a decimal number'));
          }
          if(bike?.price < 0){
            reject(new Error('BAD REQUEST: \'price\' may not be negative'));
          }
          try{
            let bikeJSON = fs.readFileSync("./data/Bikejson.json");
            let bikes = JSON.parse(bikeJSON);
            bikes.push(bike);
            fs.writeFileSync("./data/Bikejson.json", JSON.stringify(bikes, null, 2));
            resolve(JSON.stringify(bikes));
          } catch (error) {
            console.error(error);
            reject(new Error("Error writing bike data"));
          }
    })
}



//module.exports = { insertBike };
