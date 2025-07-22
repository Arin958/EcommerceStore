import { Link } from "react-router-dom";

const CustomerService = () => (
  <div>
    <h4 className="text-lg font-semibold mb-4">Help</h4>
    <ul className="space-y-2">
      {["Contact Us", "FAQs", "Shipping", "Returns"].map((item) => (
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

export default CustomerService;