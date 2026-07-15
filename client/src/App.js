import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProperty from "./pages/AddProperty";
import Dashboard from "./pages/Dashboard";
import PropertyDetails from "./pages/PropertyDetails";
import MyBookings from "./pages/MyBookings";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import RenterDashboard from "./pages/RenterDashboard";

function App() {
  return (
    <Router>
      <div className="bg-light min-vh-100">

        {/* Navbar will be shown later only after login */}
        {/* <Navbar /> */}

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/home" element={<RenterDashboard />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/add-property" element={<AddProperty />} />

            <Route path="/property/:id" element={<PropertyDetails />} />

            <Route path="/my-bookings" element={<MyBookings />} />

            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;