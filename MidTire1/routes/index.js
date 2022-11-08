var express = require("express");
var request = require("request");
var router = express.Router();
const cors = require('cors');

const app = express();
router.use(cors())


router.get("/", function (req, res, next) {
  res.send("Srevice is working");
});

// Get for food
router.route("/food/team").get(function (req, res) {
  request(
    {
      method: "GET",
      uri: "http://localhost:3032/food/team",
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    }
  );
});

router.route("/food/:location").get(function (req, res) {
  const location = req.params.location;
  request(
    {
      method: "GET",
      uri: "http://localhost:3032/food/all/" + location,
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    }
  );
});



router.route("/bikes/team").get(function (req, res) {
  request(
    {
      method: "GET",
      uri: "http://localhost:3031/bikes/team",
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    }
  );
});

router.route("/bikes/:location").get(function (req, res) {
  const location = req.params.location;
  request(
    {
      method: "GET",
      uri: "http://localhost:3031/bikes/all/" + location,
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    }
  );
});

// GET requests for toys
router.route("/toys/team").get(function (req, res) {
  request(
    {
      method: "GET",
      uri: "http://localhost:3033/toys/team",
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    }
  );
});

router.route("/toys/:location").get(function (req, res) {
  const location = req.params.location;
  request(
    {
      method: "GET",
      uri: "http://localhost:3033/toys/all/" + location,
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    }
  );
});

module.exports = router;
