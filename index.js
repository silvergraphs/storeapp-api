const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

var indexRouter = require("./routes/api");
var usersRouter = require("./routes/users");

// Connection settings
const connectionData = {
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "store",
};

connection = mysql.createConnection(connectionData);

// Connects to database
connection.connect((err) => {
  if (err) {
    console.log(`[StoreApp] Failed to connect to database\n[StoreApp] ${err}`);
  } else {
    console.log(`[StoreApp] Connected to database`);
  }
});

const app = express();
const port = 3080;

// CORS
app.use(cors());

// Routes
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`[StoreApp] Listening at port ${port}`);
});
