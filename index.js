const express = require("express");
const cors = require("cors");

var indexRouter = require("./routes/api");

const db = require("./db");

const app = express();
const port = 3080;

// * CORS
app.use(cors());

// * Routes
app.use("/api", indexRouter);

// Tests database connection
db.testConnection();

// * Middlewares

// Error handling
const errorHandler = (err, req, res, next) => {
  console.error(`[StoreApp] Error at ${req.method} ${req.url}`);
  console.error(err);

  response = {
    success: false,
    msg: err.msg || "Internal server error",
  };

  res.status(err.statusCode || 500).json(response);
};
app.use(errorHandler);

// Starts Express server
app.listen(port, () => {
  console.log(`[StoreApp-Server] Listening at port ${port}`);
});
