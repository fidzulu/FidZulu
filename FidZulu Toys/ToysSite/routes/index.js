const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const toys = require("../modules/toys");
const toysTeam = require("../modules/toysTeam");
const url = require("url");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// // can process any existing query parameters
// //(e.g.:?firstname=John)
// router.get("/toys", (request, response, next) => {
//   let get_params = url.parse(request.url, true).query;
//   console.log("got into toys");
//   if (Object.keys(get_params).length == 0) {
//     console.log("no params");
//     response.setHeader("content-type", "application/json");
//     response.end(JSON.stringify(toys.list()));
//   } else {
//     // get first parameter only
//     let key = Object.keys(get_params)[0];
//     console.log("First key is: " + key);
//     let value = request.query[key];
//     console.log("params " + value);
//     let result = toys.query_by_arg(key, value);
//     if (result) {
//       response.setHeader("content-type", "application/json");
//       response.end(JSON.stringify(result));
//     } else {
//       next(createError(404));
//     }
//   }
// });
// // example for using path variable
// router.get("/contact/:lastname", (request, response, next) => {
//   const param = request.params.lastname;
//   console.log("got into contact/:lastname " + param);
//   const result = toys.query_by_arg("lastname", param);
//   if (result) {
//     response.setHeader("content-type", "application/json");
//     response.end(JSON.stringify(result));
//   } else {
//     next(createError(404));
//   }
// });

// can process any existing query parameters
//(e.g.:?firstname=John)
router.get("/toys/all", (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log("got into toys");
  if (Object.keys(get_params).length == 0) {
    console.log("no params");
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify(toys.list()));
  } else {
    // get first parameter only
    let key = Object.keys(get_params)[0];
    console.log("First key is: " + key);
    let value = request.query[key];
    console.log("params " + value);
    let result = toys.query_by_arg(key, value);
    if (result) {
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify(result));
    } else {
      next(createError(404));
    }
  }
});
router.get("/toys/team", (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log("got into toys");
  if (Object.keys(get_params).length == 0) {
    console.log("no params");
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify(toysTeam.list()));
  } else {
    // get first parameter only
    let key = Object.keys(get_params)[0];
    console.log("First key is: " + key);
    let value = request.query[key];
    console.log("params " + value);
    let result = toysTeam.query_by_arg(key, value);
    if (result) {
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify(result));
    } else {
      next(createError(404));
    }
  }
});
// example for using path variable
router.get("/toys/all/:location", (request, response, next) => {
  const param = request.params.location;
  console.log("got into toy/:location " + param);
  const result = toys.findSalesTax("prize", param)
  if (result) {
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

module.exports = router;
