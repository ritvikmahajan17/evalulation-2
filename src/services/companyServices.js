
const axios = require("axios").default;
const utils = require("../Utils/utils");
const { compy } = require("../../database/models");

const postService = async (url) => {


    const response = await axios.get(url, { responseType: "json", });
    const file = response.data;
    const jsonData = utils.csvJSON(file);

    let companyScore = [];
    let companyDetails = [];
    for (let item = 0; item < jsonData.length; item++) {
        let id = jsonData[item].company_id;
        let sector = jsonData[item].company_sector;

        await Promise.all([axios.get(`http://54.167.46.10/company/${id}`), axios.get(`http://54.167.46.10/sector?name=${sector}`)]).then(values => {
            const resultCompany = values[0];
            resultCompany.data["sector"] = sector;
            const resultSector = values[1];
            companyDetails.push(resultCompany.data);

            resultSector.data.forEach(item => {

                if (id === item.companyId) {
                    let score = 0;
                    item.performanceIndex.forEach(val => {
                        if (val.key === "cpi") {
                            score += val.value * 10;
                        }
                        if (val.key === "cf") {
                            score += val.value / 1000;
                        }
                        if (val.key === "mau") {
                            score += val.value * 10;
                        }
                        if (val.key === "roic") {
                            score += val.value / 4;
                        }
                    });

                    resultCompany.id;
                    companyScore.push({ "id": item.companyId, "score": score });
                }
            });
        });
    }


    for (let val = 0; val < companyDetails.length; val++) {
        const id = companyDetails[val].id;
        companyDetails[val]["companyId"] = companyDetails[val].id;
        delete companyDetails[val]["id"];
        companyDetails[val].tags = companyDetails[val].tags.toString();
        for (let it = 0; it < companyScore.length; it++) {
            const scoreId = companyScore[it].id;

            if (id == scoreId) {
                companyDetails[it]["score"] = companyScore[it].score.toString();
            }
        }
    }

    console.log(companyDetails);

    await compy.bulkCreate(companyDetails);


    const finalRes = [];

    for (let it = 0; it < companyDetails.length; it++) {
        const obj = {};

        obj["id"] = companyDetails[it]["id"];
        obj["name"] = companyDetails[it]["name"];
        obj["score"] = companyDetails[it]["score"];
        finalRes.push(obj);
    }

    return finalRes;
};

const getByIdService = async (sector)=> {
    return await compy.findAll({
        where: {
            sector: sector
        }, 
        
        order: [
            ["score", "DESC"],
        ]
    });
};

const updateService = async(id,toBeUpdatedBody) => {
    let company = await compy.findOne({ where: { companyId: id } });
    Object.keys(toBeUpdatedBody).forEach(key=>{
        company[key]=toBeUpdatedBody[key];
    }); 
    await company.save();
    return company;
};

module.exports = {
    postService,
    getByIdService,
    updateService
};