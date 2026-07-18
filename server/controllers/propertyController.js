const Property = require("../models/Property");

// ===============================
// Create Property
// ===============================
const createProperty = async (req, res) => {
  // console.log("CREATE PROPERTY API HIT");
  try {
    console.log("========== CREATE PROPERTY ==========");
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);
    // console.log("USER:", req.user);

    const imagePath = req.file ? req.file.path : "";

    const property = await Property.create({
      propertyType: req.body.propertyType,
      adType: req.body.adType,
      address: req.body.address,
      contact: req.body.contact,
      amount: req.body.amount,
      description: req.body.description,
      images: imagePath ? [imagePath] : [],
      owner: req.user._id,
      status: req.body.status || "Available",
    });

    res.status(201).json(property);
  } catch (error) {
    console.error("CREATE PROPERTY ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get All Properties
// ===============================
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "owner",
      "name email"
    );

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Logged In Owner Properties
// ===============================
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.user._id,
    }).populate("owner", "name email");

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Single Property
// ===============================
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Update Property
// ===============================
const updateProperty = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.images = [req.file.path];
    }

    const property = await Property.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      updateData,
      {
        new: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Delete Property
// ===============================
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getMyProperties,
  getProperty,
  updateProperty,
  deleteProperty,
};