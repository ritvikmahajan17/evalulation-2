const service = require("../../src/services/companyServices");
const controller = require("../../src/controllers/companyController");

describe("postDetails", ()=>{
    it("should add data and return json and 201 status code when request body is valid", async ()=>{
        const mockValue = [{
            "id": "ad36a7f5-7630-496e-8628-e70981179668",
            "name": "Company ABC",
            "score": 67.45,
        }, {
            "id": "f6827fd2-656b-4264-b0cf-f449ab7a131d",
            "name": "Company DEF",
            "score": 52.45,
        }];
        jest.spyOn(service,"postService").mockResolvedValue(mockValue);

        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockReq ={
            "body":{
                "urlLink": "https://store-0001.s3.amazonaws.com/input.csv"
            }
        };
        await controller.postDetails(mockReq,mockRes);
        expect(mockRes.status).toBeCalledWith(201);
        expect(mockRes.json).toBeCalledWith(mockValue);
    });
});