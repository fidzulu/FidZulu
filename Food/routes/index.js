const createError= require('http-errors');
const express= require('express');
const router= express.Router();

const contacts = require('../modules/food');
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/food/all/:location', (request, response, next) =>{
  console.log('got into food');
  response.render('index', { title: 'Food' });
});

module.exports = router;
