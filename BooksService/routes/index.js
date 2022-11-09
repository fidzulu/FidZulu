var express = require('express');
var router = express.Router();

const books = require('../modules/books');


router.get('/books/all/:location', function (req, res, next) {
  const param = req.params.location;
  console.log(param);
  var currBooks = books.list();
  console.log(currBooks);
  if (param === "Raleigh") {
    currBooks.forEach(book => book.price = (book.price + book.price*0.075).toFixed(2));
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(currBooks));
  } else if (param === "Durham") {
    currBooks.forEach(book => book.price = (book.price + book.price*0.08).toFixed(2));
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(currBooks));
  } else {
    res.status(404).send("Location was not valid!");
  }
});

router.get('/books/team', function (req, res, next) {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({
    "team": "Books",
    "membersNames": ["G Karthick Chandran", "Saitharun A", "Joshua Alexander"]
  }));
});

router.get('/books/all', function (req, res, next) {
  var currBooks = books.list();
  console.log(currBooks);
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(currBooks));
});

router.post('/books/add', (request, response, next) => {
  let Title = request.body.Title;
  let Author = request.body.Author;
  let price = request.body.price;
  let ISBN = request.body.ISBN;
  let publisher = request.body.publisher;

  books.add(
    {
      Title: Title,
      Author: Author,
      price: price,
      ISBN: ISBN,
      publisher: publisher
    }
  );
  response.end();
})

module.exports = router;
