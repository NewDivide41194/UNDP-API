const express = require("express");
const router = express.Router();
const {surveyController}=require("../controllers")

router.get("/surveyHeaderId/:surveyHeaderId/section", surveyController.GetSection);

module.exports=router