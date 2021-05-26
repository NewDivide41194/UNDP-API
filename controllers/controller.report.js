const { reportService } = require("../services");
const response = require("../response/response");

const GetReport = (req, res, next) => {
  reportService
    .getSdgSector()
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

const GetSdgDigitalDevelopment = (req, res, next) => {
  reportService
    .getSdgDigitalDevelopment()
    .then((data) =>
      res.json(
        response({
          success: true,
          message: "Success",
          payload: data,
        })
      )
    )
    .catch((err) => next(err));
};

const getTargetDetail = (req, res, next) => {
  const sdgId=req.query.sdgId
  const targetId=req.query.targetId
  const sectorId=req.query.sectorId
  const countryId=req.query.countryId
  reportService
    .getTargetDetail(sdgId,targetId,sectorId,countryId)
    .then((data) =>    {
      res.json(
        response({
          success: true,
          message: "Success",
          payload: {data:data[0][0],ministries:data[1],target_name:data[2][0].target_name},
        })
      )}
    )
    .catch((err) => next(err));
};

module.exports = { GetReport, GetSdgDigitalDevelopment,getTargetDetail };
