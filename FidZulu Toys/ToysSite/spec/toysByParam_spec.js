const request = require("request");

const base_url = 'http://localhost:3033/';

describe("First Node Test Server", () => {
    describe("GET /toys/all/location/:location", () => {
        it("returns Smith", function (done) {
            request.get(base_url + "toys/all/Durham", 
                (error, response, body) => {
                    expect(body).toBeTruthy();
                    done();
            });
        });
        // when searching for unknow contact return 404
        it("returns 404 with unknow name", (done) => {
            request.get(base_url + 'toys/all/Washington', 
                (error, response, body) => {
                    expect(response.statusCode).toBe(404);
                    done();
            });
        });
    });
});