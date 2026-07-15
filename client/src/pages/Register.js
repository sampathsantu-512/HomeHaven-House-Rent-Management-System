import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [roleFocused, setRoleFocused] = useState(false);
  const roleWrapperRef = useRef(null);

  const navigate = useNavigate();

  const roleOptions = [
    { label: "Renter", value: "rent" },
    { label: "Owner", value: "owner" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleWrapperRef.current && !roleWrapperRef.current.contains(event.target)) {
        setRoleOpen(false);
        setRoleFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleSelectStyle = roleFocused
    ? {
        borderColor: "#198754",
        boxShadow: "0 0 0 .2rem rgba(25, 135, 84, 0.25)",
        outline: "none",
      }
    : {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!role) {
        alert("Please select a user type.");
        return;
      }

      const response = await axios.post(
        "https://homehaven-house-rent-management-system.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed.";

      alert(message);
    }
  };

  return (
    <div className="container py-4 py-md-5">
      <div className="row justify-content-center align-items-center">

        <div className="col-12 col-sm-10 col-md-8 col-lg-5">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">

                <h2 className="fw-bold text-success">
                  Create Account
                </h2>

                <p className="text-muted mb-0">
                  Join HomeHaven and find your perfect rental home.
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Select User Type
                  </label>

                  <div className="custom-select-dropdown" ref={roleWrapperRef}>
                    <button
                      type="button"
                      className={`custom-select-toggle ${roleFocused ? "focused" : ""}`}
                      onClick={() => {
                        setRoleOpen(!roleOpen);
                        setRoleFocused(true);
                      }}
                      style={{
                        ...roleSelectStyle,
                        height: "38px",
                        padding: "0.375rem 0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className={!role ? "custom-select-placeholder" : ""}>
                        {role
                          ? roleOptions.find((option) => option.value === role)?.label
                          : "Select User Type"}
                      </span>
                      <span className="custom-select-arrow">▾</span>
                    </button>

                    {roleOpen && (
                      <ul
                        className="custom-select-list"
                        style={{
                          marginTop: "6px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          boxShadow: "0 .5rem 1rem rgba(0,0,0,0.08)",
                        }}
                      >
                        {roleOptions.map((option) => (
                          <li
                            key={option.value}
                            className={`custom-select-item ${role === option.value ? "active" : ""}`}
                            onClick={() => {
                              setRole(option.value);
                              setRoleOpen(false);
                              setRoleFocused(false);
                            }}
                            style={{
                              padding: "0.375rem 0.75rem",
                              height: "38px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                >
                  Create Account
                </button>

              </form>

              <hr className="my-4" />

              <p className="text-center mb-0">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-success fw-bold text-decoration-none"
                >
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;