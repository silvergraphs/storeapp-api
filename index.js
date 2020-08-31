const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const connectionData = {
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "store",
};

const connection = mysql.createConnection(connectionData);

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("[StoreApp] Connected to database");
});

const app = express();
const port = 3080;

app.use(cors());

app.get("/api", (_req, res) => {
  res.send("Welcome to Store API");
});

// Create
app.get("/api/users/add", (req, res) => {
  const { name, email, userType } = req.query;
  if (!name || !email || !userType) {
    res.send("No data received");
  } else {
    ADD_NEW_USER =
      "INSERT INTO `User` (`name`, `email`, `userType`) VALUES ('" +
      name +
      "', '" +
      email +
      "', '" +
      userType +
      "')";
    connection.query(ADD_NEW_USER, (err, _user) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Si el codigo de error es entrada duplicada
          res.send("User already exists"); // Avisa que el usuario ya existe
        } else {
          res.send(err);
        }
      } else {
        res.send("User added");
        console.log(
          `[StoreApp] New user added to database (Name: ${name} - Email: ${email})`
        );
      }
    });
  }
});

// Read
app.get("/api/users", (_req, res) => {
  SELECT_ALL_USERS = "SELECT * FROM `User`";
  connection.query(SELECT_ALL_USERS, (err, users) => {
    const data = {
      data: users,
    };
    if (err) {
      return res.send(err);
    } else {
      return res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`[StoreApp] Listening at http://${connectionData.host}:${port}`);
});
