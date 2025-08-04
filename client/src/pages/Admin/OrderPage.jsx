import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAllOrders,
  updateOrderStatus,
  deleteOrder 
} from "../../store/Order/orderAdminSlice";
import { format } from "date-fns";
import {
  Truck as LocalShipping,
  CreditCard as Payment,
  CheckCircle2 as CheckCircle,
  Hourglass as HourglassEmpty,
  User as Person,
  Search,
  Edit,
  Trash2 as Delete,
  RefreshCw as Refresh,
  Filter as FilterList,
} from "lucide-react";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orderAdmin);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const orderList = orders?.orders || [];

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates(prev => ({ ...prev, [orderId]: newStatus }));
  };

  const saveStatusUpdate = (orderId) => {
    const newStatus = statusUpdates[orderId];
    if (newStatus) {
      dispatch(updateOrderStatus({ orderId, status: newStatus }))
        .then(() => dispatch(fetchAllOrders()));
    }
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteOrder(orderToDelete._id))
      .then(() => {
        dispatch(fetchAllOrders());
        setDeleteDialogOpen(false);
      });
  };

  const filteredOrders = orderList.filter(order => {
    const matchesSearch = 
      order?.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      (filterStatus === "paid" && order.isPaid) ||
      (filterStatus === "unpaid" && !order.isPaid) ||
      order.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  console.log(filteredOrders)

  const statusOptions = [
    { value: "Processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const getStatusBadge = (status, isPaid) => {
    const statusClasses = {
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-purple-100 text-purple-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };

    const statusIcons = {
      Processing: <HourglassEmpty className="w-4 h-4 mr-1" />,
      Shipped: <LocalShipping className="w-4 h-4 mr-1" />,
      Delivered: <CheckCircle className="w-4 h-4 mr-1" />,
      Cancelled: <Delete className="w-4 h-4 mr-1" />,
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusIcons[status]}
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "PPpp");
  };

  const calculateOrderTotal = (order) => {
    return order.orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Order Management</h1>
        <div>
          <button
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => dispatch(fetchAllOrders())}
          >
            <Refresh className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center">
              <FilterList className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <LocalShipping className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value="all"
                disabled
              >
                <option value="all">All Shipping</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
          <div className="bg-blue-600 h-1.5 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">#{order._id.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                            {order?.user?.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order?.user?.name}</div>
                          <div className="text-sm text-gray-500">{order?.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusBadge(order.status, order.isPaid)}
                        {statusUpdates[order._id] && (
                          <button
                            className="ml-2 text-indigo-600 hover:text-indigo-900"
                            onClick={() => saveStatusUpdate(order._id)}
                            title="Save changes"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${calculateOrderTotal(order).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <select
                          value={statusUpdates[order._id] || order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="block w-full pl-3 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <button
                          className="px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                          onClick={() => saveStatusUpdate(order._id)}
                          disabled={!statusUpdates[order._id]}
                        >
                          Update
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteClick(order)}
                          title="Delete order"
                        >
                          <Delete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Delete className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Order Deletion</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete order #{orderToDelete?._id.slice(-8)}?
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Customer: {orderToDelete?.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ${orderToDelete && calculateOrderTotal(orderToDelete).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;