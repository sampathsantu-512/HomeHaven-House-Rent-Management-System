const express = require("express");

const {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  deleteBooking,
  markBooked,
  markPending,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Renter
router.post("/", protect, createBooking);

router.get("/my", protect, getMyBookings);

// Owner
router.get("/owner", protect, getOwnerBookings);

// Delete Booking
router.delete("/:id", protect, deleteBooking);

//booking status update
router.put("/:id/booked", protect, markBooked);

//booking pending
router.put("/:id/pending", protect, markPending);

module.exports = router;