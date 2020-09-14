var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

const { User } = require("../../db");

// Configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Read all users (GET)
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Read specific user from ID (GET)
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (user) {
      // If the user exists
      res.json(user); // Prints the JSON
    } else {
      err = {
        statusCode: 404,
        msg: "User not found",
      };
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

// Create user (POST)
router.post("/", async (req, res, next) => {
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
        res.json({
          success: true,
          msg: "User created successfully",
        });
        console.log(
          `[StoreApp] New user created (ID: ${id} - Name: ${name} - Email: ${email} - User Type: ${userType})`
        );
      } else {
        err = {
          statusCode: 412,
          msg: "User email already exists",
        };
        next(err);
      }
    } catch (err) {
      next(err);
    }
  } else {
    err = {
      statusCode: 400,
      msg: "No enough data received",
    };
    next(err);
  }
});

// Update user (PUT)
router.put("/:userId", async (req, res, next) => {
  const { name, email } = req.body;
  // Check if all data is received
  if (name && email) {
    // First check if the email already exists on db
    const isIdUnique = (email) =>
      User.findOne({ where: { email: email } })
        .then((token) => token !== null)
        .then((isUnique) => isUnique);

    isIdUnique(email).then(async (isUnique) => {
      if (isUnique) {
        err = {
          statusCode: 412,
          msg: "User email already exists",
        };
        next(err); // If email exists reports the error to the middleware
      } else {
        try {
          // Runs the update code
          await User.update(req.body, {
            where: { id: req.params.userId },
          });
          res.json({
            success: true,
            msg: "User updated successfully",
          });
          console.log(
            `[StoreApp] User updated (ID: ${req.params.userId} - Name: ${name} - Email: ${email})`
          );
        } catch (err) {
          next(err);
        }
      }
    });
  } else {
    // If not enough data received, reports the error to the middleware
    err = {
      statusCode: 400,
      msg: "No enough data received",
    };
    next(err);
  }
});

// Delete user (DELETE)
router.delete("/:userId", async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.userId } });
    res.json({
      success: true,
      msg: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
