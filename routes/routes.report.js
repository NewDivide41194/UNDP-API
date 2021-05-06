const express = require("express");
const router = express.Router();
const {reportController}=require("../controllers")

router.get("/getReport", reportController.GetReport);
router.get("/getSdgDigitalDevelopment",reportController.GetSdgDigitalDevelopment)
router.get("/getTargetDetail/sdg/:sdgId/target/:targetId/sector/:sectorId/country/:countryId",reportController.getTargetDetail)

module.exports=router