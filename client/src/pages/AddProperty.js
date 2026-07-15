import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProperty = () => {
  const [propertyType, setPropertyType] = useState("");
  const [adType, setAdType] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("propertyType", propertyType);
      formData.append("adType", adType);
      formData.append("address", address);
      formData.append("contact", contact);
      formData.append("amount", amount);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "https://homehaven-house-rent-management-system.onrender.com/api/properties",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Property Added Successfully");
      navigate("/owner-dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to add property."
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="fw-bold text-success mb-2">Add New Property</h3>
              <p className="text-muted mb-4">
                Fill in the details below to list your property.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Property Type</label>
                    <select
                      className="form-select"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      required
                    >
                      <option value="">Select Property Type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ad Type</label>
                    <select
                      className="form-select"
                      value={adType}
                      onChange={(e) => setAdType(e.target.value)}
                      required
                    >
                      <option value="">Select Ad Type</option>
                      <option value="Rent">Rent</option>
                      <option value="Sale">Sale</option>
                    </select>
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="form-label">Property Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                  </div>




                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Write about your property..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Save Property
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;