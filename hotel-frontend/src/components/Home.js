import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hotelBg from "../assets/hotel-bg.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="w-full relative">

      {/* Hero Section */}
      <section
        className="h-screen w-full relative flex flex-col justify-center items-center text-white text-center"
        style={{
          backgroundImage: `url(${hotelBg})`,
          backgroundAttachment: "fixed", // parallax effect
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Hero content */}
        <h1
          data-aos="fade-up"
          className="relative text-5xl md:text-6xl font-bold drop-shadow-lg z-10"
        >
          Welcome to DreamStay
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative mt-4 text-lg md:text-xl max-w-xl z-10"
        >
          Discover luxury stays and budget-friendly hotels across the world.
        </p>
        <button
          data-aos="zoom-in"
          data-aos-delay="400"
          onClick={() => navigate("/hotels")}
          className="relative mt-8 bg-blue-600 px-6 py-3 rounded-xl text-lg font-medium shadow-lg hover:bg-blue-700 transition z-10"
        >
          Explore Hotels
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2
          data-aos="fade-up"
          className="text-3xl font-bold text-gray-800 mb-12"
        >
          Why Choose Us?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-6">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition transform duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              Affordable Prices
            </h3>
            <p className="mt-3 text-gray-600">
              Find the best deals that suit your budget.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition transform duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              24/7 Support
            </h3>
            <p className="mt-3 text-gray-600">
              We are here to help you anytime, anywhere.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition transform duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              Easy Booking
            </h3>
            <p className="mt-3 text-gray-600">
              Book your stay in just a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white text-center">
        <h2
          data-aos="fade-right"
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          About Us
        </h2>
        <p
          data-aos="fade-left"
          className="max-w-3xl mx-auto text-gray-600 text-lg"
        >
          DreamStay is your trusted partner for finding hotels worldwide.
          Whether you want a luxury resort, a budget-friendly stay, or a
          family-friendly option, we’ve got you covered.
        </p>
      </section>

      {/* Contact Section */}
      <footer
        data-aos="fade-up"
        className="bg-gray-900 text-white py-12 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>Email: support@dreamstay.com</p>
        <p>Phone: +94 71 234 5678</p>
        <p>Address: Colombo, Sri Lanka</p>
        <p className="mt-6 text-gray-400">
          © 2025 DreamStay. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
