import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";


const PropertyDetails = () => {

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);


  useEffect(() => {

    const fetchProperty = async () => {

      try {

        const res = await axios.get(
          `https://homehaven-house-rent-management-system.onrender.com/api/properties/${id}`
        );

        setProperty(res.data);

      } catch (err) {

        setError("Property not found.");

      } finally {

        setLoading(false);

      }

    };

    fetchProperty();

  }, [id]);

  const handleBooking = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      await axios.post(
        "https://homehaven-house-rent-management-system.onrender.com/api/bookings",
        {
          property: property._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Property booked successfully!");
      window.location.reload();

    } catch (error) {

      alert(
        error.response?.data?.message || "Booking failed."
      );

    }

  };

  if (loading) {

    return (

      <div className="container text-center mt-5">

        <h3>Loading Property...</h3>

      </div>

    );

  }

  if (error) {

    return (

      <div className="container mt-5">

        <div className="alert alert-danger">

          {error}

        </div>

      </div>

    );

  }

  console.log(property);
  console.log(property.images);

  return (

    <div className="container py-5">

      <div className="row g-4">

        {/* Left Section */}

        <div className="col-lg-8">

          <div className="card shadow border-0 rounded-4">

            <img
              src={
                property.images && property.images.length > 0
                  ? property.images[0]
                  : "https://via.placeholder.com/900x450?text=No+Image"
              }
              alt="Property"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            />

            <div className="card-body p-4">

              <h2 className="fw-bold text-success mb-4">

                {property.propertyType}

              </h2>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <h6 className="text-muted">Ad Type</h6>

                  <h5>{property.adType}</h5>

                </div>

                <div className="col-md-6 mb-3">

                  <h6 className="text-muted">Amount</h6>

                  <h5>₹ {property.amount}</h5>

                </div>

                <div className="col-md-6 mb-3">

                  <h6 className="text-muted">Owner Contact</h6>

                  <h5>{property.contact}</h5>

                </div>

                <div className="col-md-6 mb-3">

                  <h6 className="text-muted">Availability</h6>

                  <h5>{property.status}</h5>

                </div>

              </div>

              <hr />

              <h5 className="fw-bold mb-3">

                Property Address

              </h5>

              <p>

                {property.address}

              </p>

              <hr />

              <h5 className="fw-bold mb-3">

                Description

              </h5>

              <p>

                {property.description}

              </p>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="col-lg-4">

          <div
            className="card shadow border-0 rounded-4"
            style={{
              position: "sticky",
              top: "90px",
            }}
          >

            <div className="card-body p-4">

              <h3 className="fw-bold text-success mb-4">
                Property Summary
              </h3>

              <div className="mb-3">

                <h6 className="text-muted">
                  Property Type
                </h6>

                <h5>
                  {property.propertyType}
                </h5>

              </div>

              <div className="mb-3">

                <h6 className="text-muted">
                  Amount
                </h6>

                <h4 className="fw-bold">
                  ₹ {property.amount}
                </h4>

              </div>

              <div className="mb-4">

                <h6 className="text-muted">
                  Status
                </h6>

                <span
                  className={
                    property.status === "Available"
                      ? "badge bg-success"
                      : "badge bg-danger"
                  }
                >
                  {property.status}
                </span>

              </div>

              <button
                className="btn btn-success w-100 py-2 mb-3"
                onClick={handleBooking}
                disabled={property.status !== "Available"}
              >
                {property.status === "Available"
                  ? "Book Property"
                  : "Not Available"}
              </button>

              <Link
                to="/home"
                className="btn btn-outline-secondary w-100"
              >
                Back to Home
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default PropertyDetails;