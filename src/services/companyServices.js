
const axios = require("axios").default;
const utils = require("../Utils/utils");
const {company} = require("../../database/models");

const postService = async (url) => {
    
    //console.log(url);
    const response = await axios.get(url,{ responseType: "json",});
    const file = response.data;
    const jsonData = utils.csvJSON(file);
    //console.log(jsonData);

    // function getCompanyDetails() {
    //     return new Promise((resolve, reject) => {
    //         let res = [];
    //         jsonData.forEach( async item => {
                
    //             const url = "http://54.167.46.10/company/" + item.company_id;
    //             const result = await axios.get(url,{ responseType: "json",});
    //             result["sector"] = item.company_sector;
    //             res.push(result.data);
    //         });
    //         //console.log("hello",res);
    //         resolve(res);
    //     });
    // }

    // function getSectorDetails() {
    //     return new Promise((resolve, reject) => {
    //         let res = [];
    //         jsonData.forEach( async item => {
    //             //console.log("hi");
    //             const url = "http://54.167.46.10/sector?name=" + item.company_sector;
    //             const result = await axios.get(url,{ responseType: "json",});
    //             //console.log(result.data);
    //             let score = 0;
    //             result.data.forEach(element =>{
    //                 element.performanceIndex.forEach(val => {
    //                     if(val.key==="cpi"){
    //                         score+=val.value*10;
    //                     }
    //                     if(val.key==="cf"){
    //                         score+=val.value/1000;
    //                     }
    //                     if(val.key==="mau"){
    //                         score+=val.value*10;
    //                     }
    //                     if(val.key==="roic"){
    //                         score+=val.value/4;
    //                     }
    //                 });
    //                 res.push({"id":element.companyId,"score":score});
    //             });
    //             console.log(res.length);
    //         });
    //         resolve(res);
    //     });
    // }


    // jsonData.forEach( async item => {
    //     //console.log("hi");
    //     const url = "http://54.167.46.10/company/" + item.company_id;
    //     const result = await axios.get(url,{ responseType: "json",});
    //     result["sector"] = item.company_sector;
    //     console.log(result.data);

    // });

    // score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4
    // jsonData.forEach( async item => {
    //     //console.log("hi");
    //     const url = "http://54.167.46.10/sector?name=" + item.company_sector;
    //     const result = await axios.get(url,{ responseType: "json",});
    //     //console.log(result.data);
    //     result.data.forEach(element =>{
            
    //         //console.log(element.companyId,element.performanceIndex);
    //         let score = 0;
    //         element.performanceIndex.forEach(val => {
    //             if(val.key==="cpi"){
    //                 score+=val.value*10;
    //             }
    //             if(val.key==="cf"){
    //                 score+=val.value/1000;
    //             }
    //             if(val.key==="mau"){
    //                 score+=val.value*10;
    //             }
    //             if(val.key==="roic"){
    //                 score+=val.value/4;
    //             }
    //         });
    //         console.log(element.companyId,score);
    //     });

    // });
    let companyScore = [];
    let companyDetails = [];
    for(let item=0;item<jsonData.length;item++){
        let id = jsonData[item].company_id;
        let sector = jsonData[item].company_sector;
        //console.log(id);
        await Promise.all([axios.get(`http://54.167.46.10/company/${id}`),axios.get(`http://54.167.46.10/sector?name=${sector}`) ]).then(values=>{
            const resultCompany = values[0];
            resultCompany.data["sector"]=sector;
            const resultSector = values[1];
            companyDetails.push(resultCompany.data);
            
            resultSector.data.forEach(item => {
                
                if(id===item.companyId){
                    let score = 0;
                    item.performanceIndex.forEach(val => {
                        if(val.key==="cpi"){
                            score+=val.value*10;
                        }
                        if(val.key==="cf"){
                            score+=val.value/1000;
                        }
                        if(val.key==="mau"){
                            score+=val.value*10;
                        }
                        if(val.key==="roic"){
                            score+=val.value/4;
                        }
                    });
                    //console.log(({"id":item.companyId,"score":score}));
                    resultCompany.id;
                    companyScore.push({"id":item.companyId,"score":score});
                }
            });

            
        });
        
    }
    //console.log(companyDetails);
    //console.log(companyScore);

    for(let val = 0; val<companyDetails.length;val++){
        const id =companyDetails[val].id;
        //console.log("in loop",id);
        for(let it = 0; it<companyScore.length; it++){
            const scoreId = companyScore[it].id;
            //console.log(scoreId);
            if(id==scoreId){
                companyDetails[it]["score"]=companyScore[it].score;
            }
        }
    }

    //console.log(companyDetails);



    

    

    // for(let i = 0; i < jsonData.length; i++) {
    //     let obj = jsonData[i];
    //     console.log(obj.company_id);
    // }

    //const compandy

    await company.bulkCreate(companyDetails);

    const finalRes = [];

    for(let it = 0 ; it<companyDetails.length;it++){
        const obj = {};
        obj["id"] = companyDetails[it]["id"];
        obj["name"] = companyDetails[it]["name"];
        obj["score"] = companyDetails[it]["score"];
        finalRes.push(obj);
    }

    return finalRes;
};
  
module.exports = {
    postService
};