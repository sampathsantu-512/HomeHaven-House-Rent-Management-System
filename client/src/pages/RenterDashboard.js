import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import MyBookings from "./MyBookings";
import { useNavigate } from "react-router-dom";

const RenterDashboard = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));


    const [properties, setProperties] = useState([]);

    const [activeTab, setActiveTab] = useState("properties");

    const [search, setSearch] = useState("");

    const [adType, setAdType] = useState("");

    const [propertyType, setPropertyType] = useState("");

    useEffect(() => {

        fetchProperties();

    }, []);

    const fetchProperties = async () => {

        try {

            const response = await axios.get(
                "https://homehaven-house-rent-management-system.onrender.com/api/properties"
            );

            setProperties(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    const filteredProperties = properties.filter((property) => {

        const matchAddress = property.address
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchAdType =
            adType === "" ||
            property.adType === adType;

        const matchPropertyType =
            propertyType === "" ||
            property.propertyType === propertyType;

        return (
            matchAddress &&
            matchAdType &&
            matchPropertyType
        );

    });

    return (

        <div
            style={{
                background: "#0F172A",
                minHeight: "100vh",
            }}
        >

            {/* Navbar */}

            <nav
                className="navbar navbar-expand-lg"
                style={{
                    background: "#111827",
                    padding: "18px 40px",
                }}
            >

                <div className="container-fluid">

                    <h2
                        className="fw-bold"
                        style={{
                            color: "#22C55E",
                        }}
                    >
                        HomeHaven
                    </h2>

                    <div className="d-flex align-items-center">

                        <h5 className="text-white me-4 mb-0">

                            Hi, {user?.name}

                        </h5>

                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>

            <div className="container py-5">

                <div
                    className="container-fluid mt-5"
                    style={{
                        background: "#1a2a44",
                        borderRadius: "20px",
                        padding: "30px 40px",
                        maxWidth: "1100px",   // increase container width
                        margin: "0 auto",
                    }}
                >
                    <div className="card-body">

                        <div className="d-flex mb-4">

                            <button
                                className={`btn ${activeTab === "properties"
                                    ? "btn-success"
                                    : "btn-dark"
                                    }`}
                                onClick={() =>
                                    setActiveTab("properties")
                                }
                            >
                                All Properties
                            </button>

                            <button
                                className={`btn ms-3 ${activeTab === "bookings"
                                    ? "btn-success"
                                    : "btn-dark"
                                    }`}
                                onClick={() =>
                                    setActiveTab("bookings")
                                }
                            >
                                Booking History
                            </button>

                        </div>
                        {activeTab === "properties" ? (

                            <>

                                <div className="row mb-4">

                                    <div className="col-md-4">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by Address"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-4">

                                        <select
                                            className="form-select"
                                            value={adType}
                                            onChange={(e) =>
                                                setAdType(e.target.value)
                                            }
                                        >

                                            <option value="">
                                                All Ad Types
                                            </option>

                                            <option value="Rent">
                                                Rent
                                            </option>

                                            <option value="Lease">
                                                Lease
                                            </option>

                                        </select>

                                    </div>

                                    <div className="col-md-4">

                                        <select
                                            className="form-select"
                                            value={propertyType}
                                            onChange={(e) =>
                                                setPropertyType(
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="">
                                                All Property Types
                                            </option>

                                            <option value="Apartment">
                                                Apartment
                                            </option>

                                            <option value="House">
                                                House
                                            </option>

                                            <option value="Villa">
                                                Villa
                                            </option>

                                            <option value="PG">
                                                PG
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div
                                    className="row mt-4"
                                    style={{
                                        rowGap: "20px",
                                    }}
                                >

                                    {filteredProperties.length === 0 ? (

                                        <div className="text-center py-5">

                                            <h4 className="text-light">
                                                No Properties Found
                                            </h4>

                                        </div>

                                    ) : (

                                        filteredProperties.map((property) => (
                                            <div
                                                className="col-lg-4 col-md-4 col-sm-6"
                                                key={property._id}
                                            >
                                                <PropertyCard property={property} />
                                            </div>

                                        ))

                                    )}

                                </div>

                            </>

                        ) : (

                            <MyBookings />

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default RenterDashboard;