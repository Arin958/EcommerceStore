import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import EmailVerificationCode from "../pages/Auth/EmailVerification";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import EcommerceHomepage from "../pages/Home/Home";
import PublicRoute from "../components/protectedRoutes/publicRoutes";
import EcommerceLayout from "../components/Layout/EcommerceLayout/EcommerceLayout";
import AdminLayout from "../components/Layout/AdminLayout/AdminLayout";
import DashboardPage from "../pages/Admin/DashboardPage";
import AdminProductPage from "../pages/Admin/ProductAdmin";
import AddProductForm from "../pages/Admin/AddProductPage";
import NewArrival from "../components/Product/NewArrival";
import ProductsPage from "../pages/Products/ProductPage";
import ProductDetails from "../components/Product/ProductDetails";
import Checkout from "../pages/Checkout/Checkout";
import OrderList from "../pages/Order/Orders";
import OrderDetails from "../components/Order/OrderDetails";
import Category from "../pages/Category/Category";
import CategoryProduct from "../components/Category/CategoryProduct";
import OrderPage from "../pages/Admin/OrderPage";
import UserPage from "../pages/Admin/UserPage";
import AdminDashboard from "../pages/Admin/AdminDashboard";

// adjust path accordingly

const Routers = () => {
  return (
    <Routes>
      {/* 🔒 Auth pages wrapped in PublicRoute */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route path="/verify-email" element={<EmailVerificationCode />} />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
        }
      />

      {/* ✅ Homepage (you can protect this too if needed) */}

      <Route element={<EcommerceLayout />}>
        {/* ✅ Homepage */}
        <Route path="/" element={<EcommerceHomepage />} />
        <Route path="/shop" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:category" element={<CategoryProduct />} />

        {/* Add other routes that should use the layout here */}
        {/* Example: */}
        {/* <Route path="/products" element={<ProductsPage />} /> */}
        {/* <Route path="/account" element={<AccountPage />} /> */}
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="admin">
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="users" element={<UserPage />} />

          <Route path="products/addproduct" element={<AddProductForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
