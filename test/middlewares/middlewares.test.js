
const middleware = require("../../src/middleware/companyMiddleware");

describe("postDetailsValidator", () => {
    it("should return 400 error code when url is not a string", async () => {
        const mockBody = {
            urlLink: 1,
        };
        
        const mockReq = {
            body: mockBody,
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        middleware.postDetailsValidator(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.json).toBeCalledWith({ message: "\"urlLink\" must be a string" });
    });
    it("should call next() when url is  valid", async () => {
        const validationResults = { error: undefined };
        const validateSpy = jest.spyOn(middleware.postSchema, "validate").mockReturnValueOnce(validationResults);
        const mockBody = {
            urlLink: "https://store-0001.s3.amazonaws.com/input.csv",
        };
        
        const mockReq = {
            body: mockBody,
        };
        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        middleware.postDetailsValidator(mockReq, mockRes,jest.fn());
        expect(validateSpy).toBeCalled();
    });
});

describe("getBySectorValidator", () => {
    it("should return 400 error code when sector query is not a string", async () => {
        const mockBody = {
            sector: 1,
        };
        const mockReq = {
            query: mockBody,
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        middleware.getBySectorValidator(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.json).toBeCalledWith({ message: "\"sector\" must be a string" });
    });
    it("should call next() when sector query is  valid", async () => {
        const validationResults = { error: undefined };
        const validateSpy = jest.spyOn(middleware.getBySectorSchema, "validate").mockReturnValueOnce(validationResults);
        const mockBody = {
            sector: "Software",
        };
        
        const mockReq = {
            query: mockBody,
        };
        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        middleware.getBySectorValidator(mockReq, mockRes,jest.fn());
        expect(validateSpy).toBeCalled();
    });
});

describe("updateByIdValidator", () => {
    it("should return 400 error code when id params input is not a string", async () => {
        const mockBody = {
            id: 1,
        };
        
        const mockReq = {
            params: mockBody,
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        middleware.updateByIdValidator(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.json).toBeCalledWith({ message: "\"id\" must be a string" });
    });
    it("should call next() when id params is  valid", async () => {
        const validationResults = { error: undefined };
        const validateSpy = jest.spyOn(middleware.updateByIdSchema, "validate").mockReturnValueOnce(validationResults);
        const mockBody = {
            id: "2",
        };
        
        const mockReq = {
            params: mockBody,
        };
        const  mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        middleware.updateByIdValidator(mockReq, mockRes,jest.fn());
        expect(validateSpy).toBeCalled();
    });
});