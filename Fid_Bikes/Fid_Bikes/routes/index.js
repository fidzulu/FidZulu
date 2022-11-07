const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bikes = require('../modules/bikes');
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bikes/all/:location', (request, response, next) => {
  const param = request.params.location;
  console.log('got into /bikes/all/:location ' + param);

  const result = bikes.query_by_arg(param);
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {

    next(createError(404));
  }
});

router.get('/bikes/team', (request, response, next) => {
  let teamInfo = {
    team : 'bikes',
    membersNames : ['Bryan Sullivan', 'Isaac Klein', 'Stephen Lee']
  }
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(teamInfo));

})

/* POST bike */
router.post('/bikes', function(req, res, next) {
  bikes.insertBike(req.body).then((bike)=>{
    res.status(200).send(bike);
  }).catch(error => {
    if(error.message.includes('BAD REQUEST')){
      return res.status(400).send(error.message);
    }
    return res.status(500).send(error.message);
  });
});


module.exports = router;
