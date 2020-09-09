const express = require("express");
const cors = require("cors");

var indexRouter = require("./routes/api");
var usersRouter = require("./routes/users");
var categoryRouter = require("./routes/category");

const db = require("./db");

const app = express();
const port = 3080;

// CORS
app.use(cors());

// Routes
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/category", categoryRouter);

// Tests database connection
db.testConnection();

// Starts Express server
app.listen(port, () => {
  console.log(`[StoreApp-Server] Listening at port ${port}`);
});
