
const services = require("../services/companyServices");
const {HTTPError} = require("../Utils/error");

const postDetails = async (req, res) => {
    try{
        const {urlLink} = req.body;
        const companies = await services.postService(urlLink);
        if(companies===undefined){
            throw new Error();
        }
        res.status(201).json(companies);
    }
    catch (error) {
        res.status(500).json({"message":"internal server error"});
    }
};

const getBySector = async (req, res) => {
    try{
        const {sector} = req.query;
        const result = await services.getBySectorService(sector);
        if(result.length===0){
            throw new HTTPError("No such sector",404);
        }
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json({"message":"internal server error"});
        }
    }
};

const updateCompany = async (req, res) => {
    try{
        const {id} = req.params;
        const company = await services.updateService(id,req.body);
        if(!company){
            throw new HTTPError("no such id",404);
        }
        if(typeof(company)!=="object") throw Error();
        res.status(201).json(company);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json({"message":"internal server error"});
        }
    }
};

module.exports = {
    postDetails,
    getBySector,
    updateCompany
};