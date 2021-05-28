const {recordService} = require("../services");
const response = require("../response/response");

const GetRecord = (req, res, next) => {
    const userId = req.query.userId;
    const countryId = req.query.countryId;
    const sdgId = req.query.sdgId;

    recordService.getRecord(userId, countryId, sdgId).then((data) => {
        const modifiedData = data[0].map((v, k) => {
            return {
                id: v.id,
                sdgId: v.sdg_id,
                sdgTargetNo: v.sdg_target_id,
                relevantPoliciesAndDevelopmentPlan: v.target_name,
                nationalStrategicPlan: "Text",
                digitalDevelopment: {
                    policyAndProgrammes: "Text",
                    technologySystemsAndPlatforms: "Text"
                },
                detailView1: {
                    sectorId: v.sector_id,
                    ictComponent: v.ict_component,
                    statusUpdateId: v.status_update_id
                },
                detailView2: {
                    overall: v.aligned,
                    themes: {
                        people: v.people,
                        planet: v.planet,
                        prosperity: v.prosperity,
                        peace: v.peace,
                        partnership: v.partnership
                    }
                }
            };
        });
        const sector = data[1];
        res.json(response({success: true, message: "Success", payload: modifiedData}));
    }).catch((err) =>
    // next(err)
        res.json(response({success: false, message: "Error!", error: err.toString()})));
};

const updateRecord = (req, res, next) => {
    const userId = req.query.userId;
    const countryId = req.query.countryId;
    //const sdgId = req.query.sdgId;
    //const recordId = req.query.recordId;

    const updateData = req.body;

    // const dummyUpdateData = [
    // {
    //     id: 32,
    //     nationalStrategicPlan: "Text",
    //     digitalDevelopment: {
    //       policyAndProgrammes: "Text",
    //       technologySystemsAndPlatforms: "Text",
    //     },
    //     detailView1: {
    //       sectorLinkages: 1,
    //       ictComponent: "Text",
    //       statusUpdateId: 4,
    //     },
    //     detailView2: {
    //       overall: 2,
    //       themes: {
    //         people: 1,
    //         planet: 0,
    //         prosperity: 1,
    //         peace: 0,
    //         partnership: 1,
    //       },
    //     },
    // },
    // ];

    // const dummyUpdateData = [{
    //         "id": 32,
    //         "sdgId": 2,
    //         "sdgTargetNo": 1,
    //         "relevantPoliciesAndDevelopmentPlan": "By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round",
    //         "nationalStrategicPlan": "Text",
    //         "digitalDevelopment": {
    //             "policyAndProgrammes": "Text",
    //             "technologySystemsAndPlatforms": "Text"
    //         },
    //         "detailView1": {
    //             "sectorId": 3, // 19
    //             "ictComponent": "Agricultural Production & Market Information System ",
    //             "statusUpdateId": 4
    //         },
    //         "detailView2": {
    //             "overall": "Fully Aligned",
    //             "themes": {
    //                 "people": 1,
    //                 "planet": 1,
    //                 "prosperity": 0,
    //                 "peace": 0
    //             }
    //         }
    //     }];


    recordService.updateRecord(userId, countryId, updateData).then((data) => {
      console.log("Return", data);
        res.json(response({success: true, message: "Success", payload: data}));

    }).catch((err) => {
        res.json(response({success: false, message: "Error!", error: err}))
    });    
};

module.exports = {
    GetRecord,
    updateRecord
};
