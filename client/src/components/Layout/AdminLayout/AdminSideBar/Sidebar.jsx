import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    {
      path: "/admin/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      label: "Dashboard",
    },
    {
      path: "/admin/products",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      label: "Products",
    },
    {
      path: "/admin/orders",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      label: "Orders",
    },
    {
      path: "/admin/users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      label: "Users",
    },
    {
      path: "/admin/categories",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
      label: "Categories",
    },
    {
      path: "/admin/settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      label: "Settings",
    },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-gradient-to-b from-indigo-800 to-purple-900">
        {/* Header */}
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-indigo-700 to-purple-800 shadow-lg">
          <h1 className="text-white font-bold text-xl tracking-tight">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-white/10 text-white shadow-md"
                    : "text-indigo-100 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    location.pathname === item.path
                      ? "text-purple-300"
                      : "text-indigo-200 group-hover:text-purple-200"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={item.icon}
                  />
                </svg>
                {item.label}
                {location.pathname === item.path && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-purple-300"></span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex bg-white/5 p-4 backdrop-blur-sm border-t border-white/10">
          <div className="flex items-center">
            <div>
              <img
                loading="lazy"
                className="inline-block h-10 w-10 rounded-full ring-2 ring-purple-300"
                src="/default-avatar.png"
                alt="Admin User"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <Link
                to="/admin/settings"
                className="text-xs font-medium text-purple-200 hover:text-white transition-colors"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
