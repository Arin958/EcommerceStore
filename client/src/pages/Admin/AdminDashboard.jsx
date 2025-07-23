import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDashboardData } from "../../store/Admin/adminDashboard";
import { Users as FiUsers, ShoppingCart as FiShoppingCart, DollarSign as FiDollarSign, Package as FiPackage, CheckCircle as FiCheckCircle, PieChart as FiPieChart } from "lucide-react";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { adminDashboardData } = useSelector((state) => state.adminDashboard);
  

  useEffect(() => {
    dispatch(fetchAdminDashboardData());
  }, [dispatch]);

  if (!adminDashboardData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const {
    adminCount,
    averageOrderValue,
    completedOrders,
    lastMonthSignUps,
    lowStockProducts,
    outOfStockProducts,
    pendingOrders,
    recentSignUps,
    revenueLast7Days,
    roleDistribution,
    totalOrders,
    totalProducts,
    totalRevenue,
    totalUsers,
    verifiedCount
  } = adminDashboardData;

  // Card component for reusability
  const StatCard = ({ icon, title, value, change, isPositive }) => (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<FiDollarSign size={20} />} 
          title="Total Revenue" 
          value={`$${totalRevenue}`} 
          change="+100% this month" 
          isPositive={true} 
        />
        
        <StatCard 
          icon={<FiShoppingCart size={20} />} 
          title="Total Orders" 
          value={totalOrders} 
          change="+100% this month" 
          isPositive={true} 
        />
        
        <StatCard 
          icon={<FiUsers size={20} />} 
          title="Total Users" 
          value={totalUsers} 
          change={`+${recentSignUps} new`} 
          isPositive={recentSignUps > 0} 
        />
        
        <StatCard 
          icon={<FiPackage size={20} />} 
          title="Total Products" 
          value={totalProducts} 
          change={`${outOfStockProducts} out of stock`} 
          isPositive={outOfStockProducts === 0} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Order Summary Card */}
        <div className="bg-white rounded-lg shadow p-6 col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
            <FiPieChart className="text-blue-500" size={20} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed Orders</span>
              <span className="font-medium">{completedOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Orders</span>
              <span className="font-medium">{pendingOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Order Value</span>
              <span className="font-medium">${averageOrderValue}</span>
            </div>
          </div>
        </div>

        {/* Inventory Status Card */}
        <div className="bg-white rounded-lg shadow p-6 col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Inventory Status</h2>
            <FiPackage className="text-blue-500" size={20} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Out of Stock</span>
              <span className={`font-medium ${outOfStockProducts > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {outOfStockProducts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Low Stock</span>
              <span className={`font-medium ${lowStockProducts > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                {lowStockProducts}
              </span>
            </div>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="bg-white rounded-lg shadow p-6 col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">User Statistics</h2>
            <FiUsers className="text-blue-500" size={20} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Admins</span>
              <span className="font-medium">{adminCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Verified Users</span>
              <span className="font-medium">{verifiedCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recent Signups</span>
              <span className="font-medium">{recentSignUps}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {totalOrders > 0 ? (
            <div className="flex items-start pb-4 border-b border-gray-100">
              <div className="p-2 rounded-full bg-green-50 text-green-500 mr-4">
                <FiCheckCircle size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-800">New order completed</p>
                <p className="text-sm text-gray-500">Order #123 for ${totalRevenue}</p>
                <p className="text-xs text-gray-400 mt-1">Just now</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No recent orders yet</p>
          )}
          
          {recentSignUps > 0 && (
            <div className="flex items-start pb-4 border-b border-gray-100">
              <div className="p-2 rounded-full bg-blue-50 text-blue-500 mr-4">
                <FiUsers size={18} />
              </div>
              <div>
                <p className="font-medium text-gray-800">New user registered</p>
                <p className="text-sm text-gray-500">1 new user this week</p>
                <p className="text-xs text-gray-400 mt-1">2 days ago</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;