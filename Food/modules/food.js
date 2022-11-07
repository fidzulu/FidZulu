const fs = require('fs');

let read_json_file= () => {
    let file= './data/Foodjson.json';
    return fs.readFileSync(file);
}
let read_team_json_file= () => {
    let file= './data/team.json';
    return fs.readFileSync(file);
}

exports.list = () => {   
    return JSON.parse(read_json_file());
};
exports.team_list = () => {
    return JSON.parse(read_team_json_file());
}

exports.query_by_arg = (arg, value) => {

    let json_result= JSON.parse(read_json_file());
    // all addresses are stored in a "result" object
    let result= json_result.result;

    console.log("query by arg: "+ arg+ " "+ value);
    let arr = [];
    for(let i= 0; i < result.length; i++) {
        let food = result[i];
        if("Raleigh" === value) {
            food['price'] = Number((food['price']* 1.075).toFixed(2));
            arr.push(food);
        }
        else if(value === "Durham"){
            food['price'] = Number((food['price']* 1.080).toFixed(2));
            arr.push(food);
        } 
        else{
            throw new Error(404);
        }
        if(value == null){
            throw new Error(500);
        }
    }
    return arr;
};