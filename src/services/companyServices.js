
const axios = require("axios").default;
const utils = require("../Utils/utils");

const postService = async (url) => {
    
    console.log(url);
    const response = await axios.get(url,{ responseType: "json",});
    const file = response.data;
    const jsonData = utils.csvJSON(file);
    console.log(typeof jsonData);

    const companyData = [];

    jsonData.forEach( async item => {
        //console.log("hi");
        const url = "http://54.167.46.10/company/" + item.company_id;
        const result = await axios.get(url,{ responseType: "json",});
        companyData.push(result.data);
    });

    

    // for(let i = 0; i < jsonData.length; i++) {
    //     let obj = jsonData[i];
    //     console.log(obj.company_id);
    // }

    //const compandy

    return {};
};
  
module.exports = {
    postService
};