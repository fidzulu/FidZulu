let request = require("request");
let laptops = require("../modules/laptops");
let fs = require("fs");


afterEach(()=>{
    resetDataFile();
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

describe("Unit tests on laptops module", () => {
   
    describe("load all laptops", () => {
        //positive test to load all contacts
        it("have four elements", () => {
            let results = laptops.list();
            expect(results.length).toBe(4);
        });
        
    });
    describe("load all laptops by location", () => {
        //positive test to load all contacts
        it("at Raleigh has four elements and checks first value", () => {

       
            let cost = 349.47;

            let results = laptops.query_by_arg('Raleigh');
            expect(results.length).toBe(4);
            expect(results[0]['price']).toBe(cost);
        });

        it("at Durham has four elements and checks first value", () => {

     
            let cost = 351.1;

            let results = laptops.query_by_arg('Durham');
            expect(results.length).toBe(4);
            expect(results[0]['price']).toBe(cost);
        });
        
    });

    describe("load all laptops by bad location", () => {
        //negative test to get by bad location
        it("Throw Exception on bad location", () => {
            expect(()=> laptops.query_by_arg('Atlantic Beach')).toThrow("Unknown location Atlantic Beach");
           
        });
        
    });
});