var express = require("express");
var request = require("request");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

router.route("/testRoute").get(function(req, res) {
    request({
            method: "GET",
            uri: "http://localhost:3032/food/all/Durham",
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        }
    );
});

router.route("/bikesTeam").get(function(req, res) {
    request({
            method: "GET",
            uri: "http://localhost:3031/bikes/team",
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        }
    );
});

router.route("/bikes/:location").get(function(req, res) {
    const location = req.params.location;
    request({
            method: "GET",
            uri: "http://localhost:3031/bikes/all/" + location,
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        }
    );
});

module.exports = router;