import React, { useState, useEffect } from "react";
import {
  Clock as FiClock,
  ShoppingBag as FiShoppingBag,
  Truck as FiTruck,
  Gift as FiGift,
} from "lucide-react";

const PromotionalBanners = () => {
  // Countdown timer state for flash deal
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1;
        const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
        const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

        return {
          hours: newHours >= 0 ? newHours : 0,
          minutes: newMinutes >= 0 ? newMinutes : 59,
          seconds: newSeconds >= 0 ? newSeconds : 59,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const offers = [
    {
      id: 1,
      title: "FLASH SALE",
      subtitle: "50% OFF SELECTED ITEMS",
      description: "Limited time only! Hurry before it's gone.",
      icon: <FiClock className="text-2xl" />,
      timer: true,
      bgColor: "bg-gradient-to-r from-pink-500 to-rose-500",
      textColor: "text-white",
      cta: "Shop Now",
    },
    {
      id: 2,
      title: "BUY 1 GET 1",
      subtitle: "ON ALL FOOTWEAR",
      description: "Limited stock available. No code needed.",
      icon: <FiShoppingBag className="text-2xl" />,
      bgColor: "bg-gradient-to-r from-amber-400 to-orange-500",
      textColor: "text-gray-900",
      cta: "View Collection",
    },
    {
      id: 3,
      title: "FREE SHIPPING",
      subtitle: "ON ORDERS OVER $50",
      description: "Applies to all US orders.",
      icon: <FiTruck className="text-2xl" />,
      bgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
      textColor: "text-white",
      cta: "Start Shopping",
    },
    {
      id: 4,
      title: "GIFT WITH PURCHASE",
      subtitle: "FREE BEAUTY KIT",
      description: "With $100+ beauty orders.",
      icon: <FiGift className="text-2xl" />,
      bgColor: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
      textColor: "text-white",
      cta: "Discover More",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Hot Deals & Offers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`${offer.bgColor} ${offer.textColor} rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  {offer.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{offer.title}</h3>
                  <p className="font-semibold text-sm">{offer.subtitle}</p>
                </div>
              </div>

              <p className="mb-4 opacity-90 text-sm flex-grow">
                {offer.description}
              </p>

              {offer.timer && (
                <div className="mb-4 flex items-center gap-2 bg-black/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <FiClock />
                  <span className="font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              )}

              <button
                className={`mt-auto w-full py-2 px-4 rounded-lg font-medium text-center ${
                  offer.textColor === "text-white"
                    ? "bg-white/20 hover:bg-white/30"
                    : "bg-black/10 hover:bg-black/20"
                } backdrop-blur-sm transition-colors`}
              >
                {offer.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Full-width Banner */}
      <div className="mt-10 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-12 md:w-2/3">
            <h3 className="text-2xl font-bold mb-2">SEASONAL SALE</h3>
            <p className="text-lg mb-4">
              Up to 70% off winter collection. Ends soon!
            </p>
            <button className="px-6 py-2 bg-white text-teal-700 font-bold rounded-full hover:bg-gray-100 transition-all">
              Shop Winter Collection
            </button>
          </div>
          <div className="md:w-1/3 h-48 md:h-auto bg-[url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80')] bg-cover bg-center" />
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
