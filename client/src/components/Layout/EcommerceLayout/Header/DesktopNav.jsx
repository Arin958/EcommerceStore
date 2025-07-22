import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DesktopNav = () => {


  return (
    <nav className="hidden md:flex space-x-8 items-center">
      {["Home", "Shop", "Category", "About"].map((item) => {
        const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
        return (
          <Link
            key={item}
            to={path}
            className="text-gray-700 hover:text-indigo-600 transition-colors font-medium relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
