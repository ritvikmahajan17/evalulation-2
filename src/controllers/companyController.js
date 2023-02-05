const services = require("../services/companyServices");
const {HTTPError} = require("../Utils/error");



const postDetails = async (req, res) => {
    try{
        const {urlLink} = req.body;
        const task = await services.postService(urlLink);
        res.status(201).json(task);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json({"message":error.message});
        }
    }
};

const getBySector = async (req, res) => {
    try{
        const {sector} = req.query;
        console.log(typeof(sector));
        const result = await services.getBySectorService(sector);
        if(!result){
            throw new HTTPError();
        }
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json({"message":error.message});
        }
    }
};

const updateCompany = async (req, res) => {
    try{
        const {id} = req.params;
        const task = await services.updateService(id,req.body);
        res.status(201).json(task);
    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.code).json({ message: error.message });
        }
        else{
            res.status(500).json({"message":error.message});
        }
    }
};



module.exports = {
    postDetails,
    getBySector,
    updateCompany
};