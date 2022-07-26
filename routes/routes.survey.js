const express = require("express");
const router = express.Router();
const {surveyController}=require("../controllers")

router.get("/surveyHeaderId/:surveyHeaderId/section", surveyController.GetSection);
router.get("/getQuestion", surveyController.getQuestion);
router.post('/answers', surveyController.addAnswer);
 
module.exports=router