import { Link } from "react-router-dom";

const QuickLinks = () => (
  <div>
    <h4 className="text-lg font-semibold mb-4">Shop</h4>
    <ul className="space-y-2">
      {["All Products", "New Arrivals", "Best Sellers", "Sale"].map((item) => (
        <li key={item}>
          <Link
            to={`/${item.toLowerCase().replace(" ", "-")}`}
            className="text-gray-400 hover:text-indigo-400 transition"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default QuickLinks;