
const utils = require("../Utils/utils");
const { compy } = require("../../database/models");

const postService = async (url) => {

    const companyDetails = await utils.getDetails(url);
    await compy.bulkCreate(companyDetails);

    const finalRes = [];
    for (let it = 0; it < companyDetails.length; it++) {
        const obj = {};

        obj["id"] = companyDetails[it]["companyId"];
        obj["name"] = companyDetails[it]["name"];
        obj["score"] = companyDetails[it]["score"];
        finalRes.push(obj);
    }

    console.log("res => ",finalRes);

    return finalRes;
};

const getBySectorService = async (sector)=> {
    const result =  await compy.findAll({
        where: {
            sector: sector
        }, 
        order: [
            ["score", "DESC"],
        ]
    });
    
    let rank = 1;
    result.forEach(item=>{
        const data = item.dataValues;
        data.ranking=rank;
        rank++;
    });
    return result;
};

const updateService = async(id,toBeUpdatedBody) => {
    let company = await compy.findOne({ where: { companyId: id } });
    utils.JSONUpdate(toBeUpdatedBody,company);
    await company.save();
    return company;
};

module.exports = {
    postService,
    getBySectorService,
    updateService
};