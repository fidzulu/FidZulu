let request = require("request");
let food = require("../modules/food");

describe("Unit tests on food module", () => {
    describe("load all food items", () => {
        //positive test to load all contacts
        it("have 4 elements", () => {
            let results = food.list();
            expect(results.length).toBe(6);
        });
        
    });
    describe("load food with Raleigh argument", () => {
        //positive test to load contact by last name
        it("should have price updated", () => {
            let results = food.query_by_arg("location", "Raleigh");
            expect(results[0].price).toBe(3.06);
        });
        
    });

});
