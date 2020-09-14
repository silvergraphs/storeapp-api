var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

const { Category } = require("../../db");

// Configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Read all categories (GET)
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// Read specific category from ID (GET)
router.get("/:categoryId", async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.categoryId },
    });
    if (category) {
      // If the category exists
      res.json(category); // Prints the JSON
    } else {
      err = {
        statusCode: 404,
        msg: "Category not found",
      };
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

// Create category (POST)
router.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (name) {
    try {
      const [category, created] = await Category.findOrCreate({
        where: { name: name },
        defaults: {
          name: name,
        },
      });

      if (created) {
        const { id, name } = category.dataValues;
        res.json({
          success: true,
          msg: "Category created successfully",
        });
        console.log(
          `[StoreApp] New category created (ID: ${id} - Name: ${name})`
        );
      } else {
        err = {
          statusCode: 412,
          msg: "Category already exists",
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

// Update category (PUT)
router.put("/:categoryId", async (req, res, next) => {
  const { name } = req.body;
  // Check if all data is received
  if (name) {
    // First check if the category name already exists on db
    const isIdUnique = (name) =>
      Category.findOne({ where: { name: name } })
        .then((token) => token !== null)
        .then((isUnique) => isUnique);

    isIdUnique(name).then(async (isUnique) => {
      if (isUnique) {
        err = {
          statusCode: 412,
          msg: "Category already exists",
        };
        next(err); // If category exists reports the error to the middleware
      } else {
        try {
          // Runs the update code
          await Category.update(req.body, {
            where: { id: req.params.categoryId },
          });
          res.json({
            success: true,
            msg: "Category updated successfully",
          });
          console.log(
            `[StoreApp] Category updated (ID: ${req.params.categoryId} - Name: ${name})`
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

// Delete category (DELETE)
router.delete("/:categoryId", async (req, res, next) => {
  try {
    await Category.destroy({ where: { id: req.params.categoryId } });
    res.json({
      success: true,
      msg: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
