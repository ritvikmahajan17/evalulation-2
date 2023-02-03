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
            res.status(500).json({"message":"internal server error"});
        }
    }
};

module.exports = {
    postDetails
};