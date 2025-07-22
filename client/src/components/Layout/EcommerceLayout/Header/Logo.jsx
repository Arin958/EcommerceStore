import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Logo = () => (
  <Link to="/" className="flex items-center space-x-2 z-50 group">
    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
      <ShoppingBag className="h-5 w-5 text-white" />
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      StyleHub
    </span>
  </Link>
);

export default Logo;