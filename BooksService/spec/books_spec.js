const request = require("request");
const fs = require("fs");

const base_url = 'http://localhost:3036/';
const books_url = base_url + 'books/all';
const books_for_R = laptops_url + '/Raleigh';
const books_for_D = laptops_url + '/Durham';

describe("First Node Test Server", function () {
  describe("GET /books/all/Location", () => {
    it("returns status code 200 for Raleigh", (done) => {
      request.get(books_for_R, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("contains price", (done) => {
      request.get(books_for_R, (error, response, body) => {
        expect(body).toBeTruthy();
        expect(body).toContain("price");
        done();
      });
    });

    it("returns status code 200 for Durham", (done) => {
      request.get(books_for_D, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("contains price", (done) => {
      request.get(books_for_D, (error, response, body) => {
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