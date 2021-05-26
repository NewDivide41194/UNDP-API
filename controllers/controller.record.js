const { recordService } = require("../services");
const response = require("../response/response");

const GetRecord = (req, res, next) => {
  const userId = req.query.userId;
  const countryId = req.query.countryId;
  const sdgId = req.query.surveyHeaderId;

  const dummyGetData = [
    {
      id: 1,
      sdgId: 1,
      sdgTargetNo: 1,
      relevantPoliciesAndDevelopmentPlan: "Text",
      nationalStrategicPlan: "Text",
      digitalDevelopment: {
        policyAndProgrammes: "Text",
        technologySystemsAndPlatforms: "Text",
      },
      detailView1: {
        sectorLinkages: 1,
        ictComponent: "Text",
        statusUpdateId: 4,
      },
      detailView2: {
        overall: 2,
        themes: {
          people: 1,
          planet: 0,
          prosperity: 1,
          peace: 0,
          partnership: 1,
        },
      },
    },
  ];

  recordService
    .getRecord(userId, countryId, sdgId)
    .then((data) => {
      console.log("------->", data);
      const modifiedData = data.map((v, k) => {
        return {
          id: v.id,
          sdgId: v.sdg_id,
          sdgTargetNo: v.sdg_target_id,
          relevantPoliciesAndDevelopmentPlan: v.target_name,
          nationalStrategicPlan: "Text",
          digitalDevelopment: {
            policyAndProgrammes: "Text",
            technologySystemsAndPlatforms: "Text",
          },
          detailView1: {
            sectorLinkages: v.sector_id,
            ictComponent: "Text",
            statusUpdateId: 4,
          },
          detailView2: {
            overall: v.aligned,
            themes: {
              people: v.people,
              planet: v.planet,
              prosperity: v.prosperity,
              peace: v.peace,
              partnership: v.partnership,
            },
          },
        };
      });
      res.json(
        response({
          success: true,
          message: "Success",
          payload: modifiedData,
        })
      );
    })
    .catch((err) =>
      // next(err)
      res.json(response({ success: false, message: "Error!", error: err.toString() }))
    );
};

const updateRecord = (req, res, next) => {
  const userId = req.query.userId;
  const countryId = req.query.countryId;
  const sdgId = req.query.sdgId;
  const recordId = req.query.recordId;

  const updateData = req.body.updateData;

  const dummyUpdateData = [
    {
      id: 1,
      nationalStrategicPlan: "Text",
      digitalDevelopment: {
        policyAndProgrammes: "Text",
        technologySystemsAndPlatforms: "Text",
      },
      detailView1: {
        sectorLinkages: 1,
        ictComponent: "Text",
        statusUpdateId: 4,
      },
      detailView2: {
        overall: 2,
        themes: {
          people: 1,
          planet: 0,
          prosperity: 1,
          peace: 0,
          partnership: 1,
        },
      },
    },
  ];

  updateData.forEach((element) => {});
  recordService
    .updateRecord(userId, countryId, recordId)
    .then((data) => {
      res.json(
        response({
          success: true,
          message: "Success",
          payload: data,
        })
      );
    })
    .catch((err) =>
      // next(err)
      res.json(response({ success: false, message: "Error!", error: err }))
    );
};

module.exports = { GetRecord, updateRecord };
