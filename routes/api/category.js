var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

const { Category } = require("../../db");

// Configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Read all categories (GET)
router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

// Read specific category from ID (GET)
router.get("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.categoryId },
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create category (POST)
router.post("/", async (req, res) => {
  if (req.body.name) {
    try {
      const [category, created] = await Category.findOrCreate({
        where: { name: req.body.name },
        defaults: {
          name: req.body.name,
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
        res.status(412).json({
          success: false,
          msg: "Category already exists",
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

// Update category (PUT)
router.put("/:categoryId", async (req, res) => {
  if (req.body.name) {
    try {
      await Category.update(req.body, {
        where: { id: req.params.categoryId },
      });
      res.json({
        success: true,
        msg: "Category updated successfully",
      });
      console.log(
        `[StoreApp] Category updated (ID: ${req.params.categoryId} - New name: ${req.body.name})`
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

// Delete category (DELETE)
router.delete("/:categoryId", async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.categoryId } });
    res.json({
      success: true,
      msg: "Category deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
module.exports = router;
