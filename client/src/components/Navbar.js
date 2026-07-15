import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg bg-white shadow-sm sticky-top ${shrink ? "navbar-shrink" : ""}`}
      style={{ borderBottom: "1px solid #E5E7EB" }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
          style={{
            color: "#10B981",
            fontSize: "1.6rem",
          }}
        >
          <FaHome className="me-2" />
          HomeHaven
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/add-property">
                Add Property
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/my-bookings">
                My Bookings
              </Link>
            </li>

            <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
              <Link
                to="/login"
                className="btn btn-outline-success me-lg-3 w-100"
              >
                Login
              </Link>
            </li>

            <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
              <Link
                to="/register"
                className="btn btn-success w-100"
              >
                Register
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;