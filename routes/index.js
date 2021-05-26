const express = require("express");
const router = express.Router();
const reportRoute = require("./routes.report");
const surveyRoute = require("./routes.survey");
const recordRoute = require("./routes.record");

// const { routeMiddleware } = require("../middleware/middleware.authorization");


// router.use(routeMiddleware)
router.use("/report", reportRoute);
router.use("/survey", surveyRoute)
router.use("/record", recordRoute);


module.exports = router;