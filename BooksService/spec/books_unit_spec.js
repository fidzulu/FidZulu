let request = require("request");
let laptops = require("../modules/books");
let fs = require("fs");


describe("Unit tests on books module", () => {
   
    describe("load all books", () => {
        //positive test to load all contacts
        it("have four elements", () => {
            let results = books.list();
            expect(results.length).toBe(4);
        });
        
    });
    describe("load all books by location", () => {
        //positive test to load all contacts
        it("at Raleigh has four elements and checks first value", () => {

       
            let cost = 27.94;

            let results = books.query_by_arg('Raleigh');
            expect(results.length).toBe(4);
            expect(results[0]['price']).toBe(cost);
        });

        it("at Durham has four elements and checks first value", () => {

     
            let cost = 28.07;

            let results = books.query_by_arg('Durham');
            expect(results.length).toBe(4);
            expect(results[0]['price']).toBe(cost);
        });
        
    });

    describe("load all books by bad location", () => {
        //negative test to get by bad location
        it("Throw Exception on bad location", () => {
            expect(()=> books.query_by_arg('abc')).toThrow("Location was not valid!");
           
        });
        
    });
});