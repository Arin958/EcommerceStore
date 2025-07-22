import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../../store/Order/orderSlice";
import { useParams } from "react-router-dom";
import {
  CheckCircle2 as CheckCircleIcon,
  Clock as ClockIcon,
  Truck as TruckIcon,
  CreditCard as CreditCardIcon,
} from "lucide-react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const orderDetails = order.order;

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);

  if (!order)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Order Details
          </h1>
          <p className="mt-2 text-sm text-gray-600">Order ID: {order._id}</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          {/* Order Status */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Order Status</h2>
                <p className="mt-1 flex items-center">
                  {order.status === "Processing" ? (
                    <>
                      <ClockIcon className="h-5 w-5 mr-2" />
                      Processing
                    </>
                  ) : (
                    <>
                      <TruckIcon className="h-5 w-5 mr-2" />
                      Shipped
                    </>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">Order placed on</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h3>
            {orderDetails.orderItems.map((item, index) => (
              <div key={index} className="flex py-4">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    loading="lazy"
                    src={item.image[0]}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>${orderDetails.totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Shipping Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Shipping Address
                </h4>
                <p className="mt-1 text-sm text-gray-900">
                  {orderDetails.shippingAddress.firstName}{" "}
                  {orderDetails.shippingAddress.lastName}
                </p>
                <p className="text-sm text-gray-900">
                  {orderDetails.shippingAddress.address}
                </p>
                <p className="text-sm text-gray-900">
                  {orderDetails.shippingAddress.city},{" "}
                  {orderDetails.shippingAddress.postalCode}
                </p>
                <p className="text-sm text-gray-900">
                  {orderDetails.shippingAddress.country}
                </p>
                <p className="text-sm text-gray-900">
                  Phone: {orderDetails.shippingAddress.phoneNumber}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Payment Method
                </h4>
                <div className="mt-1 flex items-center">
                  <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">
                    {orderDetails.paymentMethod}
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  {orderDetails.isPaid ? (
                    <>
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900">
                        Paid on{" "}
                        {new Date(orderDetails.paidAt).toLocaleDateString()}
                      </span>
                    </>
                  ) : (
                    <>
                      <ClockIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-900">
                        Payment pending
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Customer Information
            </h3>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Customer</h4>
              <p className="mt-1 text-sm text-gray-900">
                {orderDetails.user.name}
              </p>
              <p className="text-sm text-gray-900">{orderDetails.user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Print Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
