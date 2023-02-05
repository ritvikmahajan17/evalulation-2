const utils = require("../../src/Utils/utils");

describe("csvJSON", () => {
    it("should convert csv into json when csv is valid",()=>{
        const csv = "Name,Age,Country\nJohn,30,USA\nJane,25,Canada";
        const expectedResult = [    { Name: "John", Age: "30", Country: "USA" },    { Name: "Jane", Age: "25", Country: "Canada" },  ];
  
        expect(utils.csvJSON(csv)).toEqual(expectedResult);
    });
    
});
describe("JSONUpdate", () => {
    it("updates an existing JSON object", () => {
        const oldJson = { name: "John", age: 30, country: "USA" };
        const toBeUpdatedBody = { name: "Jane", age: 25 };
        const expectedResult = { name: "Jane", age: 25, country: "USA" };
  
        utils.JSONUpdate(toBeUpdatedBody, oldJson);
  
        expect(oldJson).toEqual(expectedResult);
    });
});


  

  

  