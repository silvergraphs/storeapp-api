var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

const { User, Application, Category } = require("../../db");

// Configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Read all applications (GET)
router.get("/", async (req, res, next) => {
  try {
    const applications = await Application.findAll();
    res.json(applications);
  } catch (err) {
    next(err);
  }
});

// Read specific application from ID (GET)
router.get("/:appId", async (req, res, next) => {
  try {
    const application = await Application.findOne({
      where: { id: req.params.appId },
    });
    if (application) {
      // If the application exists
      // Obtains app category name
      const category = await Category.findOne({
        where: { id: application.Category_id },
      });
      const data = { application, category };
      res.json(data); // Prints the JSON
    } else {
      err = {
        statusCode: 404,
        msg: "Application not found",
      };
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

// Create application (POST)
router.post("/", async (req, res, next) => {
  const { name, price, logo, Category_id, User_id } = req.body;
  if (name && price && Category_id && User_id) {
    try {
      // Checks if the user is User or Developer
      const user = await User.findOne({
        where: { id: User_id },
      });

      console.log(user.userType);

      if (user.userType == "user") {
        err = {
          statusCode: 400,
          msg: "Users cant add apps (User_id provided is not a developer)",
        };
        next(err);
      } else {
        const [application, created] = await Application.findOrCreate({
          where: { name: name },
          defaults: {
            name: name,
            price: price,
            logo: logo,
            Category_id: Category_id,
            User_id: User_id,
          },
        });

        if (created) {
          const { id, name } = application.dataValues;
          res.json({
            success: true,
            msg: "Application created successfully",
          });
          console.log(
            `[StoreApp] New application created (ID: ${id} - Name: ${name})`
          );
        } else {
          err = {
            statusCode: 412,
            msg: "Application name already exists",
          };
          next(err);
        }
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

// Update application (PUT)
router.put("/:appId", async (req, res, next) => {
  const { price, logo } = req.body;
  // Check if all data is received
  if (price) {
    try {
      // Runs the update code
      await Application.update(
        { price: price, logo: req.body.logo },
        {
          where: { id: req.params.appId },
        }
      );
      res.json({
        success: true,
        msg: "Application updated successfully",
      });
      console.log(`[StoreApp] Application updated (ID: ${req.params.appId})`);
    } catch (err) {
      next(err);
    }
  } else {
    // If not enough data received, reports the error to the middleware
    err = {
      statusCode: 400,
      msg: "No enough data received",
    };
    next(err);
  }
});

// Delete application (DELETE)
router.delete("/:appId", async (req, res, next) => {
  try {
    await Application.destroy({ where: { id: req.params.appId } });
    res.json({
      success: true,
      msg: "Application deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
