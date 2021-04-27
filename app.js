const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const appRouter = require("./routes");
const response = require("./response/response");
const app = express();
// const { eventsHandler } = require('./middleware/middleware.eventHandler')
const port = 8181;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/v1", appRouter);
app.use("/ping", (req, res) => {
  res.send("PONG!");
});

app.use((err, req, res, next) => {
  res.status(500);
  if (err)
    res.send(
      response({ success: false, message: err.toString(), payload: null })
    );
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
