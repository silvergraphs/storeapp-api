var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

// Configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Create (POST)
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.send("No data received");
  } else {
    ADD_NEW_CATEGORY =
      "INSERT INTO `Category` (`name`) VALUES ('" + name + "')";
    connection.query(ADD_NEW_CATEGORY, (err, _category) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Si el codigo de error es entrada duplicada
          res.send("Category already exists"); // Avisa que la entrada ya existe
        } else {
          res.send(err);
          console.log("[StoreApp] Error adding new category \n" + err);
        }
      } else {
        res.send("Category added");
        console.log(`[StoreApp] New category added to database (${name})`);
      }
    });
  }
});

// Read (GET)
router.get("/", (_req, res) => {
  SELECT_ALL_CATEGORIES = "SELECT * FROM `Category`";
  connection.query(SELECT_ALL_CATEGORIES, (err, categories) => {
    const data = {
      data: categories,
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
  let { categoryId, name } = req.body;
  if (!categoryId || !name) {
    res.send("No category ID received");
  } else {
    UPDATE_CATEGORY =
      "UPDATE `Category` SET `name` = '" +
      name +
      "' WHERE `Category`.`idCategory` = " +
      categoryId +
      "";
    connection.query(UPDATE_CATEGORY, (err, category) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Si el codigo de error es entrada duplicada
          res.send("Category name already exists"); // Avisa que la entrada ya existe
        } else {
          res.send(err);
          console.log(
            "[StoreApp] Error updating category ID " + categoryId + "\n" + err
          );
        }
      } else {
        res.send("Category updated");
        console.log(`[StoreApp] Category updated (ID: ${categoryId})`);
      }
    });
  }
});

// Delete (DELETE)
router.delete("/", (req, res) => {
  const { categoryId } = req.body;
  if (!categoryId) {
    res.send("No category ID received");
  } else {
    DELETE_CATEGORY =
      "DELETE FROM `Category` WHERE `Category`.`idCategory` = " +
      categoryId +
      "";
    connection.query(DELETE_CATEGORY, (err, _category) => {
      if (err) {
        res.send(err);
        console.log(
          "[StoreApp] Error deleting category ID " + categoryId + " \n" + err
        );
      } else {
        res.send("Category deleted");
        console.log(
          `[StoreApp] category deleted from database (ID: ${categoryId})`
        );
      }
    });
  }
});

module.exports = router;
