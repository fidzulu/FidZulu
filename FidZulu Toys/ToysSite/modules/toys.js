const fs = require("fs");
let read_json_file = () => {
  let file = "./data/Toysjson.json";
  return fs.readFileSync(file);
};
exports.list = function () {
  return JSON.parse(read_json_file());
};
exports.query_by_arg = (arg, value) => {
  let json_result = JSON.parse(read_json_file());
  // all addresses are stored in a "result" object
  let result = json_result;
  //console.log("query by arg: " + arg + " " + value);

  for (let i = 0; i < result.length; i++) {
    let contact = result[i];
    if (contact[arg] == value) {
      //console.log(contact);
      return contact;
    }
  }
  return null;
};

exports.findSalesTax = (arg, value) => {
  let json_result = JSON.parse(read_json_file());
  let result = json_result;
  let tax = 0;
  if(value == "Raleigh"){
    tax =  1.075;

  }
  else if ( value == "Durham"){
    tax = 1.08;
  }
  else {
    return null;
  }
  for(let i = 0; i<result.length; i++){
    let contact = result[i];
    result[i].prize *= tax; 
    result[i].prize =Number(result[i].prize.toFixed(2));
  }
  return result;
}
