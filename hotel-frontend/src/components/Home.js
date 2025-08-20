import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hotelBg from "../assets/hotel-bg.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css"; // import the css

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="home">

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${hotelBg})` }}
      >
        <div className="overlay"></div>

        <h1 data-aos="fade-up">Welcome to DreamStay</h1>
        <p data-aos="fade-up" data-aos-delay="200">
          Discover luxury stays and budget-friendly hotels across Sri Lanka.
        </p>
        <button
          data-aos="zoom-in"
          data-aos-delay="400"
          onClick={() => navigate("/hotels")}
        >
          Explore Hotels
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 data-aos="fade-up">Why Choose Us?</h2>
        <div className="features-grid">
          <div data-aos="fade-up" data-aos-delay="100" className="feature-card">
            <h3>Affordable Prices</h3>
            <p>Find the best deals that suit your budget.</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="300" className="feature-card">
            <h3>24/7 Support</h3>
            <p>We are here to help you anytime, anywhere.</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="500" className="feature-card">
            <h3>Easy Booking</h3>
            <p>Book your stay in just a few clicks.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2 data-aos="fade-right">About Us</h2>
        <p data-aos="fade-left">
          DreamStay is your trusted partner for finding hotels worldwide.
          Whether you want a luxury resort, a budget-friendly stay, or a
          family-friendly option, we’ve got you covered.
        </p>
      </section>

      {/* Contact Section */}
      <footer className="contact" data-aos="fade-up">
        <h2>Contact Us</h2>
        <p>Email: support@dreamstay.com</p>
        <p>Phone: +94 71 234 5678</p>
        <p>Address: Colombo, Sri Lanka</p>
        <p className="copy">© 2025 DreamStay. All rights reserved.</p>
      </footer>
    </div>
  );
}
