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
    it("should throw 500 error when body is invalid", async ()=>{
        
        jest.spyOn(service,"postService").mockResolvedValue(undefined);

        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockReq ={
            "body":{
                "urlLink": "https://store-00.s3.amazonaws.com/input.csv"
            }
        };
        await controller.postDetails(mockReq,mockRes);
        expect(mockRes.status).toBeCalledWith(500);
        expect(mockRes.json).toBeCalledWith({"message":"internal server error"});
    });
});

describe("getBySector", ()=>{
    it("should return status code 200 and array of objects containing company details sector-wise and in desc order of score", async ()=>{
        const mockValue = [
            {
                "id": 38,
                "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
                "name": "Apple",
                "desc": null,
                "tags": "enterprise,scalable,one-to-one,granular,vertical,back-end,collaborative,synergistic,proactive",
                "ceo": "Erica Zemlak",
                "sector": "Software",
                "score": "911.314",
                "createdAt": "2023-02-05T13:29:57.544Z",
                "updatedAt": "2023-02-05T13:29:57.544Z",
                "ranking": 1
            }
        ];
        jest.spyOn(service,"getBySectorService").mockResolvedValue(mockValue);

        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const  mockReq = {
            query: {
                sector: "Software"
            }
        };
        
        await controller.getBySector(mockReq,mockRes);
        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith(mockValue);
    });
    it("should throw status code 404 error with message - no such sector", async ()=>{
        
        jest.spyOn(service,"getBySectorService").mockResolvedValue([]);

        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const  mockReq = {
            query: {
                sector: "abc"
            }
        };
        
        await controller.getBySector(mockReq,mockRes);
        expect(mockRes.status).toBeCalledWith(404);
        expect(mockRes.json).toBeCalledWith({
            "message": "No such sector"
        });
    });

    it("should throw status code 500 error", async ()=>{
        
        jest.spyOn(service,"getBySectorService").mockResolvedValue(null);

        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const  mockReq = {
            query: {
                sector: "abc"
            }
        };
        
        await controller.getBySector(mockReq,mockRes);
        expect(mockRes.status).toBeCalledWith(500);
        expect(mockRes.json).toBeCalledWith({
            "message": "internal server error"
        });
    });
});

describe("updateBySector", ()=>{
    it("should return status code 200 and updated object json", async ()=>{
        const mockValue = [
            {
                "id": 38,
                "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
                "name": "Apple",
                "desc": null,
                "tags": "enterprise,scalable,one-to-one,granular,vertical,back-end,collaborative,synergistic,proactive",
                "ceo": "Erica Zemlak",
                "sector": "Software",
                "score": "911.314",
                "createdAt": "2023-02-05T13:29:57.544Z",
                "updatedAt": "2023-02-05T13:29:57.544Z",
                "ranking": 1
            }
        ];
        jest.spyOn(service,"updateService").mockResolvedValue(mockValue);

        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const  mockReq = {
            params: {
                id: "2"
            }
        };
        
        await controller.updateCompany(mockReq,mockRes);
        expect(mockRes.status).toBeCalledWith(201);
        expect(mockRes.json).toBeCalledWith(mockValue);
    });
    it("should return status code 404 with message - no such id", async ()=>{
        
        jest.spyOn(service,"updateService").mockResolvedValue(null);

        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const  mockReq = {
            params: {
                id: "abc"
            }
        };
        
        await controller.updateCompany(mockReq,mockRes);
        expect(mockRes.status).toBeCalledWith(404);
        expect(mockRes.json).toBeCalledWith({
            "message": "no such id"
        });
    });
    it("should throw status code 500 error ", async ()=>{
        
        jest.spyOn(service,"updateService").mockResolvedValue(123);

        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const  mockReq = {
            params: {
                id: "abc"
            }
        };
        
        await controller.updateCompany(mockReq,mockRes);
        expect(mockRes.status).toBeCalledWith(500);
        expect(mockRes.json).toBeCalledWith({
            "message": "internal server error"
        });
    });
});