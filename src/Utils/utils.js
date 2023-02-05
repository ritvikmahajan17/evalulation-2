const axios = require("axios").default;

const csvJSON = (csv) => {

    var lines=csv.split("\n");
  
    var result = [];
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
    
    return result;
};

const getDetails = async (url) => {

    const response = await axios.get(url);
    const file = response.data;
    console.log(typeof(file),file);
    const jsonData = csvJSON(file);

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

    return companyDetails;
};

const JSONUpdate = (toBeUpdatedBody, oldJson) => {
    Object.keys(toBeUpdatedBody).forEach(key=>{
        oldJson[key]=toBeUpdatedBody[key];
    }); 
};

module.exports = {
    csvJSON,
    getDetails,
    JSONUpdate
};