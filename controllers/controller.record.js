const { recordService } = require("../services");
const response = require("../response/response");

const GetRecord = (req, res, next) => {
  const userId = req.query.userId;
  const countryId = req.query.countryId;
  const sdgId = req.query.surveyHeaderId;

  recordService
    .getRecord(userId, countryId, sdgId, targetId)
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

const updateRecord = (req, res, next) => {
  const userId = req.query.userId;
  const countryId = req.query.countryId;
  const sdgId = req.query.surveyHeaderId;
  const targetId = req.query.surveySectionId;

  const updateData = req.body.updateData;

  recordService
    .updateRecord(userId, countryId, sdgId, targetId)
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
