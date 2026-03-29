import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Navbar = () => {
  const { user, handleLogout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp </h1>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-gray-300">Home</Link>

        {user ? (
          <>
            <span className="text-sm">Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;