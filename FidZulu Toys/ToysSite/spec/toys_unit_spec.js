let request = require("request");
let toys = require("../modules/toys");


describe("Unit tests on toys module", () => {
    describe("load all toys", () => {
        //positive test to load all toys
        it("have four elements", () => {
            let results = toys.list();
            expect(results.length).toBe(4);
        });
        
    });
    describe("load specific toys", () => {
        //positive test to load toys by name
        it("with name Rock-a-Stack", () => {
            let results = toys.query_by_arg("name", "Rock-a-Stack");
            expect(results.brand).toBe("Fisher-Price");
        });      
    });

});