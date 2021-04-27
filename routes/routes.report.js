const express = require("express");
const router = express.Router();
const {reportController}=require("../controllers")

router.get("/getReport", reportController.GetReport);

module.exports=router