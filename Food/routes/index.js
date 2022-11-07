const createError= require('http-errors');
const express= require('express');
const router= express.Router();

const food = require('../modules/food');
const url = require('url');
const { response } = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/food/all/:location', (request, response, next) =>{
  console.log('got into food');
  const param = request.params.location;
  const result = food.query_by_arg("location", param);

  if(result) { 
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  }
  else {
    next(createError(404));
  }
});

router.get('/food/team', (request, response, next) => {
  const result = food.team_list();
  if(result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
})

router.post('/food/add', (request, response, next) => {
  let name = request.body.name;
  let brand = request.body.brand;
  let weight = request.body.weight;
  let price = request.body.price;
  let calories = request.body.calories;

  food.add(
    {
      name: name,
      brand: brand,
      weight: weight,
      calories: calories,
      price: price
    }
  );
  response.end();
})

module.exports = router;
