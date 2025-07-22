import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSideBar/Sidebar";

export default function AdminLayout() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user || user?.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </span>
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-600"></span>
              </button>

              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img
                    loading="lazy"
                    src={user?.user?.avatar || "/default-avatar.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full ring-2 ring-purple-200 hover:ring-purple-400 transition-all"
                  />
                  <span className="hidden md:block text-gray-700 font-medium group-hover:text-purple-600 transition-colors">
                    {user?.user?.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown menu (hidden by default) */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block border border-gray-100">
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-indigo-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
