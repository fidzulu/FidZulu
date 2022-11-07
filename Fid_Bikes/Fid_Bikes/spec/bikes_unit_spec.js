let request = require("request");
let bikes = require("../modules/bikes");
let fs = require("fs");


afterEach(()=>{
    resetDataFile();
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

describe("Unit tests on bikes module", () => {
   
    describe("load all bikes", () => {
        //positive test to load all contacts
        it("have four elements", () => {
            let results = bikes.list();
            expect(results.length).toBe(4);
        });
        
    });
    describe("load all bikes by location", () => {
        //positive test to load all contacts
        it("at Raleigh has four elements and checks first value", () => {

            let firstBikeFlatCost = 75.88;
            let SalesTaxForRaleigh = .075;
            let tax = firstBikeFlatCost*SalesTaxForRaleigh;
            let cost = Math.round((firstBikeFlatCost+tax)*100)/100;

            let results = bikes.query_by_arg('Raleigh');
            expect(results.length).toBe(4);
            expect(results[0]['price']).toBe(cost);
        });

        it("at Durham has four elements and checks first value", () => {

            let firstBikeFlatCost = 75.88;
            let SalesTaxForDurham = .08;
            let tax = firstBikeFlatCost*SalesTaxForDurham;
            let cost = Math.round((firstBikeFlatCost+tax)*100)/100;

            let results = bikes.query_by_arg('Durham');
            expect(results.length).toBe(4);
            expect(results[0]['price']).toBe(cost);
        });
        
    });

    describe("load all bikes by bad location", () => {
        //negative test to get by bad location
        it("Throw Exception on bad location", () => {
            expect(()=> bikes.query_by_arg('Atlantic Beach')).toThrow("Unknown location Atlantic Beach");
           
        });
        
    });
});