const fs = require('fs');

let read_json_file = () =>{
    let file = './data/Booksjson.json';
    return fs.readFileSync(file);
}

exports.list = function() {   
    return JSON.parse(read_json_file());
};

exports.add = (book) => {
    var json = JSON.parse(read_json_file());
    json.push(book);
    fs.writeFileSync('./data/Booksjson.json', JSON.stringify(json));
}