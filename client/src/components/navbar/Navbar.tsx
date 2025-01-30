import { Link, useLocation } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import authStore from "../../store/authStore";

export const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const logout = authStore((state) => state.logout);

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "Home";
    if (path.startsWith("/products")) return "Products";
    if (path === "/cart") return "Cart";
    if (path === "/order") return "Orders";
    if (path === "/profile") return "Profile";
    if (path === "/login") return "Login";
    if (path === "/register") return "Register";

    return "";
  };

  return (
    <nav className="bg-[#fafafa] shadow-md">
      <div className="container mx-auto px-4">
        <div className="w-full flex justify-between items-center h-16">
          <div className="flex-1">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Store Logo
            </Link>
          </div>

          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex-1 flex justify-end">
            {isLoggedIn ? (
              <div className="flex gap-4">
                <div>
                  <Link
                    to="/cart"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FaShoppingCart className="w-6 h-6 text-gray-600" />
                  </Link>
                </div>
                <div className="relative group">
                  <Link
                  to=""
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FaUser className="w-6 h-6 text-gray-600" />
                  </Link>
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl hidden group-hover:block">
                    <Link
                      to="/order"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
