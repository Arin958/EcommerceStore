// components/PublicRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
