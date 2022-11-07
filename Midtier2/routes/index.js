var express = require('express');
var router = express.Router();
const axios = require('axios');
const createError= require('http-errors');

let findHost = (servicename) => {
  let host;
  if(servicename == 'books'){
    host = "localhost:3034";
  }
  else if(servicename === 'DVDs'){
    host = "localhost:3035";
  }
  else if(servicename === 'laptops'){
    host = "localhost:3036";
  }
  return host;
}

router.get('/classB/:servicename/all/:location', function(req, res, next) {
  const location = req.params.location;
  const servicename = req.params.servicename;
  console.log(location, servicename);
  
  let host = findHost(servicename);
  console.log(host);
  
  if(host == null){
    res.status(404).send("Invalid url!");
  }
  else{
    let url = "http://" + host + "/"+servicename+"/all/"+location;
    console.log(url);
    axios.get(url)
    .then(response => {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify( response.data));
      console.log(response.data);
    })
    .catch(err => {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify( { error: "Backend issue"}));
    });
  }

});

router.get('/classB/:servicename/team', function(req, res, next) {
  const servicename = req.params.servicename;
  
  let host = findHost(servicename);
  console.log(host);
  
  if(host == null){
    res.status(404).send("Invalid url!");
  }
  else{
    let url = "http://" + host + "/"+servicename+"/team";
    console.log(url);
    axios.get(url)
    .then(response => {
      console.log(servicename);
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify( response.data));
      console.log(response.data);
    })
    .catch(error => {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify( { error: "Backend issue"}));
    });
  }
});



module.exports = router;
