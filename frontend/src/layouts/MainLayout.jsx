import { Outlet } from "react-router-dom";
import Navbar from "../features/auth/components/Navbar"
import Footer from "../features/auth/components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />

      <main className="flex-grow p-4 bg-gray-100">
        <h1>Layout Working</h1>
        <Outlet /> {/*  yaha page inject hoga */}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;