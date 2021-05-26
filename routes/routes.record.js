const express = require("express");
const router = express.Router();
const {recordController}=require("../controllers")

router.get("/getRecord", recordController.GetRecord);
router.put("/updateRecord", recordController.updateRecord);


module.exports=router