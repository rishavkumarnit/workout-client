import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="flex text-xl justify-between  bg-gray-400 px-8 py-2">
      <Link to="/">
        <h1 className="font-bold hover:cursor-pointer">Workoutbuddy</h1>
      </Link>

      {user && (
        <div className="flex gap-2">
          <span>{user.email}</span>
          <button
            className="text-red-700 hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {!user && (
        <div className="flex gap-8">
          <Link to="/signup">
            <p className="hover:cursor-pointer">Sign up</p>
          </Link>
          <Link to="/login">
            <p className="hover:cursor-pointer">Login</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
