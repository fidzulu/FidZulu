var express = require('express');
var router = express.Router();
const axios = require('axios');
const createError= require('http-errors');
const cors = require('cors');

router.use(cors());

let findHost = (servicename) => {
  let host;
  if(servicename == 'books'){
    host = "localhost:3034";
  }
  else if(servicename === 'dvds'){
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
      console.log(response.data);
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify( response.data));
    })
    .catch(err => {
      return res.status(err.response.status).send(err.response.data);
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
      return res.status(error.response.status).send(error.response.data);
    });
  }
});

router.post('/classB/:servicename/add', function(req, res, next) {
  const servicename = req.params.servicename;
  let host = findHost(servicename);
  if(host == null){
    res.status(404).send("Invalid url!");
  }
  else{
    let url = "http://" + host + "/"+servicename+"/add";
    console.log(url);
    axios.post(url, req.body)
    .then(response => {
      console.log(servicename);
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify( response.data));
    })
    .catch(error => {
      return res.status(error.response.status).send(error.response.data);
    });
  }
});

module.exports = router;
