import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
