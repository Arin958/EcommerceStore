import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const BrandInfo = () => (
  <div className="space-y-4">
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
        <ShoppingBag className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-bold text-white">StyleHub</span>
    </Link>
    <p className="text-gray-400">
      Curated fashion for the modern lifestyle. Quality products with exceptional service.
    </p>
  </div>
);

export default BrandInfo;