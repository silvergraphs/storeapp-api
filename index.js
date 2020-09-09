const express = require("express");
const cors = require("cors");

var indexRouter = require("./routes/api");

const db = require("./db");

const app = express();
const port = 3080;

// CORS
app.use(cors());

// Routes
app.use("/api", indexRouter);

// Tests database connection
db.testConnection();

// Starts Express server
app.listen(port, () => {
  console.log(`[StoreApp-Server] Listening at port ${port}`);
});
