const Booking = require("../models/Booking");
const Property = require("../models/Property");


// =================================
// Create Booking
// =================================
const createBooking = async (req, res) => {
  try {

    const property = await Property.findById(req.body.property);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.status !== "Available") {
      return res.status(400).json({
        message: "Property is not available",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      property: req.body.property,
      status: "Pending",
    });

    // Change property status immediately
    property.status = "Pending";
    await property.save();

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =================================
// Get Logged In User Bookings
// =================================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("property")
      .populate("user", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =================================
// Get Owner Bookings
// =================================
const getOwnerBookings = async (req, res) => {
  try {
    console.log("Logged in owner:", req.user._id);

    const properties = await Property.find({
      owner: req.user._id,
    });

    console.log("Owner Properties:", properties);

    const propertyIds = properties.map((property) => property._id);

    console.log("Property IDs:", propertyIds);

    const bookings = await Booking.find({
      property: { $in: propertyIds },
    })
      .populate("property")
      .populate("user", "name email");

    console.log("Bookings:", bookings);

    res.json(bookings);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// =================================
// Delete Booking
// =================================
const deleteBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Make the property available again
    const property = await Property.findById(booking.property);

    if (property) {
      property.status = "Available";
      await property.save();
    }

    await booking.deleteOne();

    res.json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const markBooked = async (req, res) => {
  try {
    console.log("Booking ID:", req.params.id);

    const booking = await Booking.findById(req.params.id).populate("property");

    console.log("Booking:", booking);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "Booked";
    await booking.save();

    booking.property.status = "Unavailable";
    await booking.property.save();

    res.json({
      message: "Property marked as booked",
    });

  } catch (error) {
    console.log("MARK BOOKED ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const markPending = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id).populate("property");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "Pending";
    await booking.save();

    booking.property.status = "Pending";
    await booking.property.save();

    res.json({
      message: "Property marked as pending",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  deleteBooking,
  markBooked,
  markPending,
};