const {company} = require("../../database/models");
const services = require("../../src/services/companyServices");

describe("postService", ()=>{
    it("should add task in the database", async () => {
        const dbReturnedValues = 
          {
              "id": 1,
              "name": "mckinsey",
              "score": 123
          };
          
        const spiedCreate = jest.spyOn(company, "create")
            .mockResolvedValue(dbReturnedValues);
    
        const returedVal = await services.postService();
    
        expect(spiedCreate).toBeCalled();
        expect(returedVal).toBe(dbReturnedValues);
    });
});