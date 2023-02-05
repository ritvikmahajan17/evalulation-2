
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
});

describe("getBySectorValidator", () => {
    it("should return 400 error code when sector input is not a string", async () => {
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
});

describe("updateByIdValidator", () => {
    it("should return 400 error code when sector input is not a string", async () => {
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
});