const express = require("express");

const {
  createProperty,
  getProperties,
  getMyProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// ======================
// Public Routes
// ======================

router.get("/", getProperties);


router.get("/my", protect, getMyProperties);

// ======================
// Protected Routes
// ======================

router.get("/:id", getProperty);

// ======================
// Owner Routes
// ======================


// Create Property with Image Upload
router.post(
  "/",
  protect,
  upload.single("image"),
  createProperty
);

// Update Property
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProperty
);

// Delete Property
router.delete("/:id", protect, deleteProperty);

module.exports = router;