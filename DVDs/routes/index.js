const createError = require('http-errors');
var express = require('express');
var router = express.Router();
const dvds = require('../modules/dvds');
const url = require('url');




/* GET home page. */
router.get('/dvds/all/:location', (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log('got into dvds');
  if (Object.keys(get_params).length == 0) {
    console.log('no params');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(dvds.list()));
  }
  else {
    // get first parameter only
    let key = Object.keys(get_params)[0];
    console.log("First key is: " + key);
    let value = request.query[key];
    console.log('params ' + value);
    let result = dvds.query_by_arg(key, value);
    if (result) {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(result));
    }
    else {
      next(createError(404));
    }
  }
});



// router.get('/dvds/:location', (request, response, next) => {
//    const param = request.params.location;
//   console.log('got into dvds/:location ' + param);
//   const result = dvds.query_by_arg( "abbreviation", param);
//   if (result) {
    
//     response.setHeader('content-type', 'application/json');
//     response.end(JSON.stringify(result));
//   }
//   else {
//     next(createError(404));
//   }
// });



router.get('/dvds/team', (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log('got into team');
  if (Object.keys(get_params).length == 0) {
    console.log('no params');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(dvds.team()));
  }
  else {
    // get first parameter only
    let key = Object.keys(get_params)[0];
    console.log("First key is: " + key);
    let value = request.query[key];
    console.log('params ' + value);
    let result = dvds.query_by_arg(key, value);
    if (result) {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(result));
    }
    else {
      next(createError(404));
    }
  }
})



module.exports = router;