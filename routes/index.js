const express = require("express");
const router = express.Router();
const reportRoute = require("./routes.report");

// const { routeMiddleware } = require("../middleware/middleware.authorization");


// router.use(routeMiddleware)
router.use("/report", reportRoute);

module.exports = router;