const { Console } = require('console');
const fs = require('fs');
let read_json_dvds = () => {
    let file = './data/DVDsjson.json';
    return fs.readFileSync(file);
}



let read_json_location = () => {
    let file = "./data/location.json";
    return fs.readFileSync(file);
}



let read_json_team = () => {
    let file = './data/team.json';
    return fs.readFileSync(file);
}



exports.list = function() {
    return JSON.parse(read_json_dvds());
};



exports.team = function() {
    return JSON.parse(read_json_team());
}



exports.query_by_arg = (arg, value) => {
    let json_result = JSON.parse(read_json_location());
    let dvds_results = JSON.parse(read_json_dvds());
    // all addresses are stored in a "result" object
    console.log("query by arg: " + arg + " " + value);
    for (let i = 0; i < json_result.length; i++) {
        let location = json_result[i];
        if (location.location === value) {
            for (let j=0; j < dvds_results.length; j++) {
                let dvd = dvds_results[j];
                let conversion =  dvd.price * location.conversion_rate;
                console.log(dvd.price + "*" + location.conversion_rate +"="+ conversion);
                let sales_tax = conversion *location.sales_tax;
                console.log(sales_tax);
                dvd.price = sales_tax.toFixed(2);



           }
            return dvds_results;
        }
    }
    return null;
};