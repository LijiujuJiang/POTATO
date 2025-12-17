import { Outlet } from "react-router-dom";
import { Navbar } from "./elements/Navbar";
import { Footer } from "./elements/Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />

      {/* 页面主体 */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
