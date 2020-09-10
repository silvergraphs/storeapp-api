var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

const { User } = require("../../db");

// Configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Read all users (GET)
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Create user (POST)
router.post("/", async (req, res) => {
  const { name, email, userType } = req.body;
  if (name && email && userType) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          name: name,
          email: email,
          userType: userType,
        },
      });
      if (created) {
        const { id, name, email, userType } = user.dataValues;
        res.send("User created successfully");
        console.log(
          `[StoreApp] New user created (ID: ${id} - Name: ${name} - Email: ${email} - User Type: ${userType})`
        );
      } else {
        res.send("User email already exists");
      }
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  } else {
    res.send("No enough data received");
  }
});

/* // Read (GET)
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

// Delete (DELETE)
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
}); */

module.exports = router;
