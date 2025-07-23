import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

import {
  createCheckOut,
  finalizeCheckout,
  capturePayPalOrder,
} from "../../store/Checkout/Checkout";
import PaypalButtonWrapper from "../../components/Paypal/PaypalButton";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);
  const { checkout } = useSelector((state) => state.checkout);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [shipping, setShipping] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    country: "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const proceedToPayment = () => {
    setStep(2);
  };

  const buildShippingAddress = () => ({
    firstName: shipping.firstName,
    lastName: shipping.lastName,
    address: shipping.address,
    city: shipping.city,
    postalCode: shipping.postalCode,
    country: shipping.country,
    phoneNumber: shipping.phone,
  });

  const handleCodCheckout = async () => {
    const orderData = {
      shippingAddress: buildShippingAddress(),
      paymentMethod: "Cash on Delivery",
      checkoutItems: cart.products,
      totalPrice: cart.totalPrice,
    };

    await dispatch(createCheckOut(orderData));
    if (checkout?._id) {
      await dispatch(finalizeCheckout(checkout._id));
    }
  };

  const handlePayPalSuccess = async (details, orderID) => {
    const orderData = {
      orderID,
      shippingAddress: buildShippingAddress(),
      paymentMethod: "PayPal",
      checkoutItems: cart.products.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: Array.isArray(item.image) ? item.image : [item.image],
      })),
      totalPrice: cart.totalPrice,
      paypalDetails: details,
    };

   

    try {
      // First create and capture the PayPal order
      const result = await dispatch(capturePayPalOrder(orderData)).unwrap();
      

      // The response should contain the checkout ID
      if (result?.checkout?._id) {
        // Now finalize with the correct checkout ID
        await dispatch(finalizeCheckout(result.checkout._id)).unwrap();
        navigate("/order-list");
      } else {
        console.error("No checkout ID received from capturePayPalOrder");
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };
  const handlePayPalError = (err) => {
    console.error("PayPal error:", err);
  };

  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Shipping Information
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              value={shipping.firstName}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              value={shipping.lastName}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              name="address"
              value={shipping.address}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              name="city"
              value={shipping.city}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              name="postalCode"
              value={shipping.postalCode}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              name="country"
              value={shipping.country}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              name="phone"
              value={shipping.phone}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              value={shipping.email}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>
          <div className="divide-y divide-gray-200">
            {cart.products?.map((item, index) => (
              <div key={index} className="py-4 flex items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-white border border-gray-200 rounded-md overflow-hidden">
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.name}</h3>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="mt-1 flex justify-between text-sm text-gray-500">
                    <div>
                      <p>Size: {item.size}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${cart.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={proceedToPayment}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
        >
          Continue to Payment
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: "USD",
        }}
      >
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Method
            </h2>
            <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
          </div>

          <div className="space-y-4 mb-8">
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMethod === "Cash on Delivery"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setPaymentMethod("Cash on Delivery")}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    paymentMethod === "Cash on Delivery"
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "Cash on Delivery" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="font-medium text-gray-800">
                  Cash on Delivery
                </span>
              </div>
              {paymentMethod === "Cash on Delivery" && (
                <p className="mt-2 text-sm text-gray-600 ml-8">
                  Pay with cash upon delivery
                </p>
              )}
            </div>

            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMethod === "PayPal"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setPaymentMethod("PayPal")}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    paymentMethod === "PayPal"
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "PayPal" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="font-medium text-gray-800">PayPal</span>
                <img
                  loading="lazy"
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                  alt="PayPal"
                  className="ml-2 h-6"
                />
              </div>
              {paymentMethod === "PayPal" && (
                <p className="mt-2 text-sm text-gray-600 ml-8">
                  Pay securely with your PayPal account
                </p>
              )}
            </div>
          </div>

          {/* Order Summary in Payment Step */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              Your Order
            </h3>
            <div className="space-y-3">
              {cart.products?.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-200 rounded-md overflow-hidden mr-3">
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between font-medium text-gray-900">
                <span>Total</span>
                <span>${cart.totalPrice?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {paymentMethod === "Cash on Delivery" && (
            <button
              onClick={handleCodCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
            >
              Place Order (Cash on Delivery)
            </button>
          )}

          {paymentMethod === "PayPal" && (
            <div className="mt-6">
              <PaypalButtonWrapper
                amount={cart.totalPrice}
                onSuccess={handlePayPalSuccess}
                onError={handlePayPalError}
              />
            </div>
          )}

          <button
            onClick={() => setStep(1)}
            className="mt-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Shipping
          </button>
        </div>
      </PayPalScriptProvider>
    );
  }

  return null;
};

export default Checkout;
