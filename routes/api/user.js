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

// Read specific user from ID (GET)
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
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
        res.json({
          success: true,
          msg: "User created successfully",
        });
        console.log(
          `[StoreApp] New user created (ID: ${id} - Name: ${name} - Email: ${email} - User Type: ${userType})`
        );
      } else {
        res.status(412).json({
          success: false,
          msg: "User email already exists",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "No enough data received",
    });
  }
});

// Update user (PUT)
router.put("/:userId", async (req, res) => {
  const { name, email, userType } = req.body;
  if (name && email && userType) {
    try {
      await User.update(req.body, {
        where: { id: req.params.userId },
      });
      res.json({
        success: true,
        msg: "User updated successfully",
      });
      console.log(
        `[StoreApp] User updated (ID: ${req.params.userId} - Name: ${name} - Email: ${email} - User Type: ${userType})`
      );
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "No enough data received",
    });
  }
});

// Delete user (DELETE)
router.delete("/:userId", async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.userId } });
    res.json({
      success: true,
      msg: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
