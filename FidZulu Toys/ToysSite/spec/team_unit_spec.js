let request = require("request");
let team = require("../modules/toysTeam");


describe("Unit tests on toys module", () => {
    describe("load correct team name ", () => {
        //positive test to load toys by name
        it("with name Toys Backend Team", () => {
            let results = team.list();
            expect(results.team).toBe("Toys Backend Team");
        });      
    });

    describe("load correct team member ", () => {
        //positive test to load toys by name
        it("with 3rd person to be Deborah", () => {
            let results = team.list();
            expect(results.membersNames[3]).toBe("Deborah Jahaj");
        });      
    });

});