const express = require("express");
const router = express.Router();
const {surveyController}=require("../controllers")

router.get("/surveyHeaderId/:surveyHeaderId/section", surveyController.GetSection);
router.get("/userId/:userId/countryId/:countryId/surveyHeaderId/:surveyHeaderId/surveySectionId/:surveySectionId", surveyController.getQuestion);
router.post('/answers', surveyController.addAnswer);
 
module.exports=router