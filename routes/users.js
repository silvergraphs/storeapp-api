var express = require("express");
const { restart } = require("nodemon");
var router = express.Router();
const bodyParser = require("body-parser");

// Configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Create (POST)
router.post("/", (req, res) => {
  const { name, email, userType } = req.body;
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
          console.log("[StoreApp] Error adding new user \n" + err);
        }
      } else {
        res.send("User added");
        console.log(`[StoreApp] New user added to database (Email: ${email})`);
      }
    });
  }
});

// Read (GET)
router.get("/", (_req, res) => {
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

// Update (PUT)
router.put("/", (req, res) => {
  let { userId, name, email } = req.body;
  if (!userId) {
    res.send("No user ID received");
  } else {
    UPDATE_USER = "UPDATE `User` SET ";
    if (name) {
      name = "`name` = '" + name + "', ";
      UPDATE_USER += name;
    }
    if (email) {
      email = "`email` = '" + email + "' ";
      UPDATE_USER += email;
    }
    if (!name && !email) {
      res.send("Email or name required");
    } else {
      UPDATE_USER += "WHERE `User`.`idUser` = " + userId + " ";
    }
    connection.query(UPDATE_USER, (err, user) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Si el codigo de error es entrada duplicada
          res.send("Email already exists"); // Avisa que el usuario ya existe
        } else {
          res.send(err);
          console.log(
            "[StoreApp] Error updating user ID " + userId + "\n" + err
          );
        }
      } else {
        res.send("User updated");
        console.log(`[StoreApp] User updated (ID: ${userId} - ${email})`);
      }
    });
  }
});

// Delete
router.delete("/", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.send("No user ID received");
  } else {
    DELETE_USER = "DELETE FROM `User` WHERE `User`.`idUser` = " + userId + "";
    connection.query(DELETE_USER, (err, _user) => {
      if (err) {
        res.send(err);
        console.log(
          "[StoreApp] Error deleting user ID " + userId + " \n" + err
        );
      } else {
        res.send("User deleted");
        console.log(`[StoreApp] User deleted from database (ID: ${userId})`);
      }
    });
  }
});

// Working POST

router.post("/test", (req, res) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  res.send(req.body);
});

module.exports = router;
