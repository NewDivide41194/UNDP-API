const { surveyService } = require("../services");
const response = require("../response/response");

const GetSection = (req, res, next) => {
    const surveyHeaderId=req.params.surveyHeaderId
  surveyService
    .getSection(surveyHeaderId)
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

module.exports={GetSection}