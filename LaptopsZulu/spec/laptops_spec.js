const request = require("request");
const fs = require("fs");

const base_url = 'http://localhost:3036/';
const laptops_url = base_url + 'laptops/all';
const laptops_for_R = laptops_url + '/Raleigh';
const laptops_for_D = laptops_url + '/Durham';

describe("First Node Test Server", function () {
  describe("GET /laptops/all/Location", () => {
    it("returns status code 200 for Raleigh", (done) => {
      request.get(laptops_for_R, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("contains price", (done) => {
      request.get(laptops_for_R, (error, response, body) => {
        expect(body).toBeTruthy();
        expect(body).toContain("price");
        done();
      });
    });

    it("returns status code 200 for Durham", (done) => {
      request.get(laptops_for_D, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("contains price", (done) => {
      request.get(laptops_for_D, (error, response, body) => {
        expect(body).toBeTruthy();
        expect(body).toContain("price");
        done();
      });
    });
  });
  // test for wrong path and expect 404
  describe("GET /conststacts", () => {
    request.get(base_url + '/conststacts', (error, response, body) => {
      expect(response.statusCode).toBe(404);

    });

  });




});
const resetDataFile = () => {
  try {
    let laptopJSON = fs.readFileSync("./data/Laptopsjson_init.json");
    let laptops = JSON.parse(laptopJSON);
    fs.writeFileSync("./data/Laptopsjson.json", JSON.stringify(laptops, null, 2));
    console.log("reset laptops json");
  } catch (error) {
    console.log("error resetting laptops json: " + error);
  }
};
describe("Laptops backend", () => {
  describe("POST /laptops", () => {
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

    const laptop = {
      product: "Allien Ware G99",
      brand: "Dell",
      CPU: "core i9-3320",
      memory: "8GB",
      price: 325.09
    };

    const postRequest = {
      url: base_url + "laptops",
      json: true,
      body: laptop,
    };

    it("adds a laptop to the json file", (done) => {
      request.post(postRequest, (error, response, body) => {
        expect(body).toBeTruthy();
        expect(body).toContain(laptop);
        done();
      });
    });

    it("returns 400 when laptop Product name is missing", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          brand: "Dell",
          CPU: "core i9-3320",
          memory: "8GB",
          price: 325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop brand is missing", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
          CPU: "core i9-3320",
          memory: "8GB",
          price: 325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop CPU is missing", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
          brand: "Dell",
          memory: "8GB",
          price: 325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });
    it("returns 400 when laptop memory is missing", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
          brand: "Dell",
          CPU: "core i9-3320",
          price: 325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop price is missing", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
          brand: "Dell",
          CPU: "core i9-3320",
          memory: "8GB"
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop product is invalid", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "1238&*&&*(",
          brand: "Dell",
          CPU: "core i9-3320",
          memory: "8GB",
          price: 325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop brand is invalid", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
          brand: "Dell&*&&*(",
          CPU: "core i9-3320",
          memory: "8GB",
          price: 325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop CPU is invalid", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
      brand: "Dell",
      CPU: "core i9-3320&*&&*(",
      memory: "8GB",
      price: 325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop price is invalid", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
          brand: "Dell",
          CPU: "core i9-3320",
          memory: "8GB",
          price: "325.09351.0&*&&*1"
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop price is negative", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
      brand: "Dell",
      CPU: "core i9-3320",
      memory: "8GB",
      price: -325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });
    it("returns 400 when laptop memeory is invalid", (done) => {
      const badReq = {
        url: base_url + "laptops",
        json: true,
        body: {
          product: "Allien Ware G99",
      brand: "Dell",
      CPU: "core i9-3320",
      memory: "8&*&&*(GB",
      price: 325.09
        },
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it("returns 400 when laptop not in request body", (done) => {
      const badReq = {
        url: base_url + "laptops"
      };
      request.post(badReq, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });
  });
});