import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
        Welcome to Blog App 🚀
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 text-center max-w-xl mb-6">
        Create, share and explore amazing blog posts. Login or register to get started.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Register
        </Link>
      </div>

    </main>
  );
};

export default Home;