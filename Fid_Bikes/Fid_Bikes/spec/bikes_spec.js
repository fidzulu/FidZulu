const request = require("request");
const fs = require("fs");

const base_url = 'http://localhost:3031/';
const bikes_url = base_url + 'bikes/all';
const bikes_for_R = bikes_url+'/Raleigh';
const bikes_for_D = bikes_url+'/Durham';

describe("First Node Test Server", function () {
    describe("GET /bikes/all/Location", () => {
        it("returns status code 200 for Raleigh",  (done) => {
            request.get(bikes_for_R, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains price", (done) => {
            request.get(bikes_for_R, (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("price");
                done();
            });
        });

        it("returns status code 200 for Durham",  (done) => {
            request.get(bikes_for_D, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains price", (done) => {
            request.get(bikes_for_D, (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("price");
                done();
            });
        });
    });
    // test for wrong path and expect 404
    describe("GET /conststacts", () => {
        request.get(base_url+'/conststacts', (error, response, body) => {
            expect(response.statusCode).toBe(404);
            
        });
        
    });

    

   
});
const resetDataFile = () => {
    try {
      let bikeJSON = fs.readFileSync("./data/Bikejson_init.json");
      let bikes = JSON.parse(bikeJSON);
      fs.writeFileSync("./data/Bikejson.json", JSON.stringify(bikes, null, 2));
      console.log("reset bikes json");
    } catch (error) {
      console.log("error resetting bikes json: " + error);
    }
  };
describe("Bikes backend", () => {
describe("POST /bikes", () => {
    /**
     * Needed due to jasmine-node not supporting afterAll()
     * source: https://github.com/mhevery/jasmine-node/issues/241#issuecomment-23034677
     *
     * Override the finishCallback so we can add some cleanup methods.
     * This is run after all tests have been completed.
     */
    var _finishCallback = jasmine.Runner.prototype.finishCallback;
    jasmine.Runner.prototype.finishCallback = function () {
      // Run the old finishCallback
      _finishCallback.bind(this)();

      // add your cleanup code here...
      resetDataFile();
    };

    const bike = {
      name: "test bike",
      brand: "specialized",
      color: "red",
      price: 1200.24,
    };

    const postRequest = {
      url: base_url + "bikes",
      json: true,
      body: bike,
    };

    it("adds a bike to the json file", (done) => {
      request.post(postRequest, (error, response, body) => {
        expect(body).toBeTruthy();
        expect(body).toContain(bike);
        done();
      });
    });

    it("returns 400 when bike name is missing", (done) => {
      const badReq = {
        url: base_url + "bikes",
        json: true,
        body: {
          brand: "specialized",
          color: "red",
          price: 1200.24
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when bike brand is missing", (done) => {
        const badReq = {
          url: base_url + "bikes",
          json: true,
          body: {
            name: "bike 1",
            color: "red",
            price: 1200.24
          },
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });

      it("returns 400 when bike color is missing", (done) => {
        const badReq = {
          url: base_url + "bikes",
          json: true,
          body: {
            name: "bike 1",
            brand: "brand",
            price: 1200.24
          },
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });

      it("returns 400 when bike price is missing", (done) => {
        const badReq = {
          url: base_url + "bikes",
          json: true,
          body: {
            name: "bike 1",
            brand: "brand",
            color: "red"
          },
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });

      it("returns 400 when bike name is invalid", (done) => {
        const badReq = {
          url: base_url + "bikes",
          json: true,
          body: {
            name: "1238&*&&*(",
            brand: "brand",
            color: "red",
            price: 1200.50
          },
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });

      it("returns 400 when bike brand is invalid", (done) => {
        const badReq = {
          url: base_url + "bikes",
          json: true,
          body: {
            name: "test",
            brand: "@_Aaaa",
            color: "red",
            price: 1200.50
          },
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });

      it("returns 400 when bike color is invalid", (done) => {
        const badReq = {
          url: base_url + "bikes",
          json: true,
          body: {
            name: "test",
            brand: "brand",
            color: "red1",
            price: 1200.50
          },
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });

      it("returns 400 when bike price is invalid", (done) => {
        const badReq = {
          url: base_url + "bikes",
          json: true,
          body: {
            name: "test",
            brand: "brand",
            color: "red1",
            price: "120.20"
          },
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });

      it("returns 400 when bike price is negative", (done) => {
        const badReq = {
          url: base_url + "bikes",
          json: true,
          body: {
            name: "test",
            brand: "brand",
            color: "red1",
            price: -1200.34
          },
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });

      it("returns 400 when bike not in request body", (done) => {
        const badReq = {
          url: base_url + "bikes"
        };
        request.post(badReq, (error, response, body) => {
          expect(response.statusCode).toBe(400);
          done();
        });
      });
  });
});