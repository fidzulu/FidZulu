const request = require("request");
const fs = require('fs');

const base_url = 'http://localhost:3032/';
const food_url = base_url + 'food/';
let file;
let test;

beforeEach(function(done){
    file = './data/Foodjson.json';
    test = fs.readFileSync(file);
    done();
})

afterEach(function(done){
    fs.writeFileSync(file,test);
    done();
})
describe("First Node Test Server", function () {
    describe("GET /food/all/Raleigh", () => {
        it("returns status code 200",  (done) => {
            request.get(food_url+"all/Raleigh", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains name", (done) => {
            request.get(food_url + "all/Raleigh", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("name");
                done();
            });
        });
    });
    // test for wrong path and expect 404
    describe("GET /fododo", () => {
        it("returns status code 404",  (done) => {
            request.get(base_url + 'lol', (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });

    describe("POST /food/add", () => {
        it("returns status code 200", (done) => {
            request.post(food_url + "add", (error,response,body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })

    describe("GET /food/team", () => {
        it("returns status code 200", (done) => {
            request.get(food_url + "team", (error,response,body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("team");
                done();
            })
        })
    })
});