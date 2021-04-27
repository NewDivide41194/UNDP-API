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

module.exports = { GetReport };
