var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.route('/testRoute')
  .get(function(req, res){
    request({
      method: 'GET',
      uri: 'http://localhost:3032/food/all/Durham'
    }, function (error, response, body){
      if(!error && response.statusCode == 200){
        res.json(body);
      }
    })
  });



module.exports = router;
