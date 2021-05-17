const express = require("express");
const router = express.Router();
const {surveyController}=require("../controllers")

router.get("/surveyHeaderId/:surveyHeaderId/section", surveyController.GetSection);
router.get("/userId/:userId/conutryId/:countryId/surveyHeaderId/:surveyHeaderId/surveySectionId/:surveySectionId", surveyController.getQuestion);

module.exports=router