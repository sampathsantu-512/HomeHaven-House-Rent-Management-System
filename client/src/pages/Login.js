import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://homehaven-house-rent-management-system.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      console.log("Logged In User:", user);

      // Save Login Data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome ${user.name}!`);

      // Redirect Based on Role
      switch (user.role?.toLowerCase()) {
        case "admin":
          navigate("/admin-dashboard");
          break;

        case "owner":
          navigate("/owner-dashboard");
          break;

        case "rent":
          navigate("/home");
          break;

        default:
          alert("Unknown user role!");
          console.log("Returned Role:", user.role);
          navigate("/");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed.";

      alert(message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">

              <h2 className="fw-bold text-success mb-2">
                Welcome Back
              </h2>

              <p className="text-muted mb-4">
                Login to continue to HomeHaven
              </p>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg"
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
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                >
                  Login
                </button>

              </form>

              <hr className="my-4" />

              <p className="text-center mb-0">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-success fw-bold text-decoration-none"
                >
                  Register
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;