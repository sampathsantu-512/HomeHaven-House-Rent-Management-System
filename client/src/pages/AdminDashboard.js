import React from "react";

const AdminDashboard = () => {
  return (
    <div className="container py-5">
      <h1 className="text-success fw-bold">Admin Dashboard</h1>
      <p>Welcome, Administrator!</p>

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h4>Total Users</h4>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h4>Total Properties</h4>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h4>Total Bookings</h4>
              <h2>0</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;