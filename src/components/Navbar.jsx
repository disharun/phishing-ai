import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center px-3 sm:px-4 md:px-8 py-3 sm:py-4 bg-gray-900 border-b border-green-500 gap-3 sm:gap-0 w-full">
      <Link to="/" className="text-base sm:text-lg md:text-xl font-bold text-green-400 hover:text-green-300 whitespace-nowrap">
        PhishGuard AI
      </Link>

      <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
        {isAuthenticated ? (
          <>
            <Link to="/" className="hover:text-green-400 text-sm sm:text-base transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-green-400 text-sm sm:text-base transition">
              About
            </Link>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FaUser className="text-green-400" />
              <span className="text-gray-300 hidden sm:inline">{user?.name || user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-400 text-sm sm:text-base transition"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-400 text-sm sm:text-base transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold px-4 py-2 rounded-lg hover:scale-105 transition text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
