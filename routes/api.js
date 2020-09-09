var express = require("express");
var router = express.Router();

var usersRouter = require("./api/user");
var categoryRouter = require("./api/category");

router.use("/user", usersRouter);
router.use("/category", categoryRouter);

router.get("/", function (req, res, next) {
  res.send("Welcome to Store API");
});

module.exports = router;
