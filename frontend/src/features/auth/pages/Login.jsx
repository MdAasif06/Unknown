import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  Hook always top
  useEffect(() => {
  if (user) {
    navigate("/");
  }
}, [user, navigate]); // correct

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await handleLogin({ email, password });
      toast.success("Login successful ");
    } catch (error) {
      console.log("Frontend Error:", error);
      toast.error(error?.message || "Invalid email or password ❌");
    }
  };
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              placeholder="Enter email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className=" cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform active:scale-105 font-semibold"
          >
            Login
          </button>
        </form>

        {/* Extra */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
