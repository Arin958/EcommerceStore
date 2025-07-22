import React from "react";
import { Star, Quote } from "lucide-react";
import {
  ChevronLeft as FiChevronLeft,
  ChevronRight as FiChevronRight,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "The quality of these dresses exceeded my expectations! I've already ordered three more in different colors. Shipping was incredibly fast too.",
    product: "Summer Floral Dress",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    review:
      "Great headphones at this price point. The noise cancellation works surprisingly well for daily commutes. Battery life is impressive!",
    product: "Wireless Noise-Canceling Headphones",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Fitness Coach",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    review:
      "These running shoes transformed my workouts. So lightweight yet supportive. I've recommended them to all my clients!",
    product: "Ultra Light Running Shoes",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Home Chef",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    review:
      "This blender is a kitchen powerhouse. Makes perfect smoothies every time and cleans up easily. Worth every penny!",
    product: "Professional Blender",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <Star key={i} className="text-amber-400" />
        ) : (
          <Star key={i} className="text-amber-400" />
        )
      )}
    </div>
  );
};

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of happy customers worldwide
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  loading="lazy"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="ml-2 text-sm text-gray-500">
                  Reviewed {testimonial.product}
                </span>
              </div>

              <Quote className="text-gray-200 text-3xl mb-4" />
              <p className="text-gray-700 italic mb-6">
                "{testimonial.review}"
              </p>

              <div className="text-xs text-gray-400">
                Verified Purchase • {Math.floor(Math.random() * 30) + 1} days
                ago
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center gap-4 mb-6">
              <img
                loading="lazy"
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
              />
              <div>
                <h4 className="font-bold text-lg">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-500 text-sm">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <StarRating rating={testimonials[currentTestimonial].rating} />
              <span className="ml-2 text-sm text-gray-500">
                Reviewed {testimonials[currentTestimonial].product}
              </span>
            </div>

            <Quote className="text-gray-200 text-3xl mb-4" />
            <p className="text-gray-700 italic mb-6">
              "{testimonials[currentTestimonial].review}"
            </p>

            <div className="text-xs text-gray-400">
              Verified Purchase • {Math.floor(Math.random() * 30) + 1} days ago
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
          >
            <FiChevronLeft className="text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
          >
            <FiChevronRight className="text-gray-700" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full ${
                  currentTestimonial === index ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
