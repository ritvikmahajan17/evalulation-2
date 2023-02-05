const { compy } = require("../../database/models");
const services = require("../../src/services/companyServices");
const utils = require("../../src/utils/utils");

describe("postService", () => {
    it("should add company details in the database", async () => {
        const getDetailsMockValues = [
            {
                "companyId": "1",
                "name": "mckinsey",
                "score": "123"
            }
        ];

        const mockValues = [
            {
                "id": "1",
                "name": "mckinsey",
                "score": "123"
            }
        ];

        const spiedBulkCreate = jest.spyOn(compy, "bulkCreate")
            .mockResolvedValue(mockValues);

        const spiedGetDetails = jest.spyOn(utils, "getDetails")
            .mockResolvedValue(getDetailsMockValues);

        const returedVal = await services.postService();
        expect(spiedBulkCreate).toBeCalled();
        expect(spiedGetDetails).toBeCalled();
        expect(returedVal).toEqual(mockValues);
    });
    it("should return undefined when body is invalid", async () => {
    

        // const spiedBulkCreate = jest.spyOn(compy, "bulkCreate")
        //     .mockResolvedValue(mockValues);

        const spiedGetDetails = jest.spyOn(utils, "getDetails")
            .mockResolvedValue([]);

        const returedVal = await services.postService();
        expect(spiedGetDetails).toBeCalled();
        expect(returedVal).toEqual(undefined);
    });
});

describe("getBySectorService", () => {
    it("should fetch company details sector-wise and in desc order of score when sector is valid", async () => {

        const mockValues = [
            {
                dataValues: {
                    "id": 50,
                    "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
                    "name": "Apple",
                    "desc": null,
                    "tags": "impactful,web-enabled,sticky,cross-platform,transparent,e-business",
                    "ceo": "Alicia Cole",
                    "sector": "Software",
                    "score": "911.314",
                    "createdAt": "2023-02-05T13:44:38.093Z",
                    "updatedAt": "2023-02-05T13:44:38.093Z",
                    "ranking": 1
                }
            }
        ];

        const spiedgetBySector = jest.spyOn(compy, "findAll")
            .mockResolvedValue(mockValues);


        const returedVal = await services.getBySectorService();

        expect(spiedgetBySector).toBeCalled();
        expect(returedVal).toEqual(mockValues);
    });

    it("should return empty array when sector is invalid", async () => {

        const spiedgetBySector = jest.spyOn(compy, "findAll")
            .mockResolvedValue([]);

        const returedVal = await services.getBySectorService();

        expect(spiedgetBySector).toBeCalled();
        expect(returedVal).toEqual([]);
    });
});

describe("updateService", () => {
    it("should update company details when id is valid", async () => {

        const mockValues =
    {
        "id": 50,
        "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
        "name": "Apple",
        "desc": null,
        "tags": "impactful,web-enabled,sticky,cross-platform,transparent,e-business",
        "ceo": "Alicia Cole",
        "sector": "Software",
        "score": "911.314",
        "createdAt": "2023-02-05T13:44:38.093Z",
        "updatedAt": "2023-02-05T13:44:38.093Z",
        save: jest.fn()
    };

        const spiedUpdate = jest.spyOn(compy, "findOne")
            .mockResolvedValue(mockValues);

        const returedVal = await services.updateService(4,mockValues);

        expect(spiedUpdate).toBeCalled();
        expect(returedVal).toEqual(mockValues);
    });

    it("should return null when id is invalid", async () => {


        const spiedUpdate = jest.spyOn(compy, "findOne")
            .mockResolvedValue(null);

        const returedVal = await services.updateService(4,{
            "name":"google",
            "ceo":"pachai"
        });

        expect(spiedUpdate).toBeCalled();
        expect(returedVal).toEqual(null);
    });
});