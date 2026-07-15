import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const heroStyles = {
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=90')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
  };

  const navStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    background: "rgba(2, 13, 23, 0.22)",
    backdropFilter: "blur(16px)",
    padding: "18px 0",
  };

  const navButtonStyles = {
    minWidth: "140px",
  };

  const ctaButtonStyles = {
    minWidth: "220px",
  };

  return (
    <div style={heroStyles}>
      <style>{`.landing-register-btn:hover { color: #000 !important; background-color: #fff !important; border-color: rgba(255,255,255,0.92) !important; }
        .landing-login-btn:hover { color: #000 !important; background-color: #fff !important; border-color: rgba(255,255,255,0.92) !important; }
        .landing-login-btn:hover svg path, .landing-login-btn:hover svg rect { stroke: #000 !important; fill: none !important; }`}</style>
      <nav className="navbar navbar-expand-lg navbar-dark" style={navStyles}>
        <div className="container">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center text-white fw-bold"
            style={{ letterSpacing: "0.6px", fontSize: "1.85rem" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                marginRight: "10px",
                borderRadius: "10px",
                backgroundColor: "rgba(13, 79, 56, 0.18)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 11L12 4L21 11V20C21 20.5523 20.5523 21 20 21H15C14.4477 21 14 20.5523 14 20V15C14 14.4477 13.5523 14 13 14H11C10.4477 14 10 14.4477 10 15V20C10 20.5523 9.55228 21 9 21H4C3.44772 21 3 20.5523 3 20V11Z"
                  fill="#16d47a"
                />
              </svg>
            </span>
            HomeHaven
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex align-items-center">
              <Link
                to="/login"
                className="btn btn-outline-light rounded-pill me-3 landing-login-btn"
                style={{ ...navButtonStyles, borderColor: "rgba(255,255,255,0.72)", color: "#fff", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ minWidth: "18px" }}
                >
                  <rect
                    x="6"
                    y="11"
                    width="12"
                    height="9"
                    rx="2"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M8 11V8C8 6.34315 9.34315 5 11 5H13C14.6569 5 16 6.34315 16 8V11"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle cx="12" cy="15" r="1" fill="#fff" />
                </svg>
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-success rounded-pill"
                style={{ ...navButtonStyles, display: "inline-flex", alignItems: "center", gap: "8px", color: "#fff" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ minWidth: "18px" }}
                >
                  <path
                    d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", padding: "0 20px" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "18%", left: "8%", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(30, 160, 98, 0.16)", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: "18%", right: "12%", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", top: "35%", right: "22%", width: "120px", height: "120px", borderRadius: "24px", background: "rgba(255,255,255,0.08)", boxShadow: "0 0 60px rgba(0,0,0,0.22)" }} />
        </div>
        <div style={{ maxWidth: "980px", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px", padding: "12px 20px", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "rgba(22, 212, 122, 0.18)", color: "#16d47a", fontSize: "1rem" }}>
              ✓
            </span>
            <span style={{ fontSize: "0.95rem", letterSpacing: "0.4px", color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
              Find Your Perfect Home
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(3.3rem, 5vw, 5.4rem)", lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "24px" }}>
            Find Your Dream Rental <span style={{ color: "#2f7d42" }}>Home</span>
          </h1>

          <p style={{ fontSize: "1.15rem", maxWidth: "720px", lineHeight: 1.85, marginBottom: "42px", color: "rgba(255,255,255,0.84)" }}>
            Discover thousands of verified rental properties across India. Comfortable, affordable & trusted.
          </p>

          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mb-5">
            <Link
              to="/login"
              className="btn btn-success rounded-pill fw-bold"
              style={{ ...ctaButtonStyles, padding: "16px 32px", backgroundColor: "#2f7d42", borderColor: "#2f7d42", color: "#fff" }}
            >
              Explore Properties
            </Link>
            <Link
              to="/register"
              className="btn btn-outline-light rounded-pill fw-bold landing-register-btn"
              style={{ ...ctaButtonStyles, padding: "16px 32px", borderColor: "rgba(255,255,255,0.82)", color: "#fff" }}
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
