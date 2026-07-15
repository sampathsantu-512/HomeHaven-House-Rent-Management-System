import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://homehaven-house-rent-management-system.onrender.com/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(response.data);
    } catch (error) {
      console.log(error);
      toast.success("Failed to load bookings");
    }
  };

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://homehaven-house-rent-management-system.onrender.com/api/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking Cancelled Successfully");
      window.location.reload();

      fetchBookings();
    } catch (error) {
      console.log(error);
      toast.success("Failed to cancel booking");
    }
  };

  return (
    <div className="container py-4 py-md-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold text-white">
          My Bookings
        </h2>

        <p className="text-light">
          View and manage all your booked properties.
        </p>
      </div>

      {bookings.length === 0 ? (

        <div className="text-center py-5">
          <h4 className="text-white">No bookings found.</h4>
        </div>

      ) : (

        <div className="row">

          {bookings.map((booking) => (

            <div
              className="col-12 col-sm-6 col-lg-4 mb-4"
              key={booking._id}
            >

              <div className="card border-0 shadow rounded-4 h-100">

                <img
                  src={
                    booking.property?.images?.length > 0
                      ? booking.property.images[0]
                      : "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  className="card-img-top"
                  alt={booking.property?.propertyType || "Property"} style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <h5 className="fw-bold">
                    {booking.property?.propertyType || "Property Deleted"}
                  </h5>

                  <p className="text-muted mb-2">
                    {booking.property?.address || "Address not available"}
                  </p>

                  <p className="mb-2">
                    <strong>Price:</strong> ₹
                    {booking.property?.amount || 0}
                  </p>

                  <p className="mb-3">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">
                      {booking.status || "Booked"}
                    </span>
                  </p>

                  <button
                    className="btn btn-danger mt-auto w-100"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Cancel Booking
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyBookings;