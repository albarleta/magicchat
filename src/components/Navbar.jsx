import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaComments, FaSignOutAlt } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

function Navbar() {
  const user = true;
  //   const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          TroubleShoot Pro
        </Link>
        {user ? (
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="flex items-center space-x-1">
              <FaHome className="text-lg" />
              <span>Dashboard</span>
            </Link>
            <Link to="/chat" className="flex items-center space-x-1">
              <FaComments className="text-lg" />
              <span>Chat</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
