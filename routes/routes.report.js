const express = require("express");
const router = express.Router();
const {reportController}=require("../controllers")

router.get("/getReport", reportController.GetReport);
router.get("/getSdgDigitalDevelopment",reportController.GetSdgDigitalDevelopment)
router.get("/getTargetDetail",reportController.getTargetDetail)

module.exports=router