import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate=useNavigate()
  const { handleRegister, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
   try {
     e.preventDefault();
    await handleRegister({username,email,password})
    toast.success("Registered successfully");
    navigate("/login")
   } catch (error) {
    toast.error(error.message || "Register failed");
   }
  };
  if(loading){
    return <main><h1>Loading......</h1></main>
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              onChange={(e)=>{setUsername(e.target.value)}}
              type="text"
              name="username"
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              onChange={(e)=>{setEmail(e.target.value)}}
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
              onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform active:scale-105 font-semibold"
          >
            Register
          </button>
        </form>

        {/* Extra */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
