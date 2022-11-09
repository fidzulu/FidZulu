let request = require("request");
const base_url = "http://localhost:3033/dvds";
console.log("Starting test");
describe("First Node Test Server", () => {
    it("returns Avengers", (done) => {
        request.get(base_url, (error, response, body) => {
            expect(body).toBeTruthy();
            expect(body).toContain("Avengers");
            done();
        });
    });
});
describe("Returns 200 status code", () => {
    describe("GET /", () => {
     it("returns status code 200", (done) => {
    request.get(base_url, (error, response, body) => {
    expect(response.statusCode).toBe(200);
    done();
    });
    }); 

    });
    });
    describe("Returns 404 status code", () => {
    it("returns 404", (done) => {
        request.get(base_url + "/error", (error, response, body) => {
            expect(response.statusCode).toBe(404);
            done();
            });
        });
    });
    describe("checks currency and sales tax for Ireland", () => {
        it("returns 200 and contains converted price", (done) => {
            request.get(base_url + "?location=IE", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(body).toContain("30.91");
                done();
                });
            });
        });
        describe("checks currency and sales tax for US", () => {
            it("returns 200 and contains converted price", (done) => {
                request.get(base_url + "?location=US-NC", (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    expect(body).toContain("26.87");
                    done();
                    });
                });
            });
            describe("checks currency and sales tax for India", () => {
                it("returns 200 and contains converted price", (done) => {
                    request.get(base_url + "?location=IN", (error, response, body) => {
                        expect(response.statusCode).toBe(200);
                        expect(body).toContain("2421.48");
                        done();
                        });
                    });
                });
                describe("checks /team url", () => {
                    it("returns 200 and contains team member name", (done) => {
                        request.get(base_url + "/team", (error, response, body) => {
                            expect(response.statusCode).toBe(200);
                            expect(body).toContain("Tanya Vo");
                            done();
                            });
                        });
                    });