import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../store/Order/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.order);

 


  const ordersList = orders?.orders;
  console.log(orders);


  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  // Sample status colors
  const statusColors = {
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Orders
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            View your order history and track shipments
          </p>
        </div>

        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow overflow-hidden rounded-lg transition-all hover:shadow-lg"
            >
              <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h3 className="text-lg font-medium text-white">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-indigo-600">
                      {order.paymentMethod}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[order.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Order Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Total Amount
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:mt-0 sm:col-span-2">
                      ${order.totalPrice.toFixed(2)}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Shipping Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}, 
                      ${order.shippingAddress.address}, ${order.shippingAddress.city}, 
                      ${order.shippingAddress.country} ${order.shippingAddress.postalCode}`}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="px-4 py-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Order Items
                </h4>
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                        {item.image && item.image.length > 0 ? (
                          <img
                            loading="lazy"
                            src={item.image[0]}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p>${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <p>
                            Size:{" "}
                            <span className="font-medium">{item.size}</span>
                          </p>
                          <p>
                            Qty:{" "}
                            <span className="font-medium">{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
