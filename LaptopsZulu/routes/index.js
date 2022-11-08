const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const laptops = require('../modules/laptops');
const url = require('url');

const cors = require('cors');

router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/laptops/all/:location', (request, response, next) => {
  const param = request.params.location;
  console.log('got into /laptops/all/:location ' + param);

  const result = laptops.query_by_arg(param);
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {

    next(createError(404));
  }
});

router.get('/laptops/team', (request, response, next) => {
  let teamInfo = {
    team : 'Killer Laptops',
    membersNames : [' Ravi', 'Sandhya']
  }
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(teamInfo));

})

/* POST laptop */
router.post('/laptops/add', function(req, res, next) {
  laptops.insertLaptop(req.body).then((laptop)=>{
    res.status(200).send(laptop);
  }).catch(error => {
    if(error.message.includes('BAD REQUEST')){
      return res.status(400).send(error.message);
    }
    return res.status(500).send(error.message);
  });
});


module.exports = router;
