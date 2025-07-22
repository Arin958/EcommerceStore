import React from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Shield, Calendar, LogOut } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  
  // Format last login date
  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-lg text-indigo-600">
            {user.role === 'admin' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                <Shield className="w-4 h-4 mr-1" /> Admin Account
              </span>
            )}
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Avatar */}
            <div className="md:w-1/3 bg-gradient-to-b from-indigo-500 to-purple-600 p-8 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-white mb-4">
                  <span className="text-4xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {user.role === 'admin' && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Shield className="w-3 h-3 mr-1" /> ADMIN
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-white mt-4">{user.name}</h2>
              <p className="text-indigo-100">{user.email}</p>
            </div>

            {/* Right Side - Details */}
            <div className="md:w-2/3 p-8">
              <div className="space-y-6">
                {/* Personal Info Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Info Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">User Role</p>
                      <p className="text-gray-900">
                        {user.role === 'admin' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded bg-indigo-100 text-indigo-800 text-sm">
                            Administrator
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-800 text-sm">
                            Standard User
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Login</p>
                      <p className="text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                        {formatLastLogin(user.lastLogin)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">User ID</p>
                      <p className="text-gray-900 font-mono text-sm break-all">
                        {user.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="pt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Features (only visible to admins) */}
        {user.role === 'admin' && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                Admin Dashboard Quick Access
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a 
                  href="/admin/users" 
                  className="p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <h4 className="font-medium text-purple-700">User Management</h4>
                  <p className="text-sm text-gray-500 mt-1">View and manage all users</p>
                </a>
                <a 
                  href="/admin/products" 
                  className="p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <h4 className="font-medium text-purple-700">Product Catalog</h4>
                  <p className="text-sm text-gray-500 mt-1">Manage products and inventory</p>
                </a>
                <a 
                  href="/admin/orders" 
                  className="p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <h4 className="font-medium text-purple-700">Order Management</h4>
                  <p className="text-sm text-gray-500 mt-1">View and process orders</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;