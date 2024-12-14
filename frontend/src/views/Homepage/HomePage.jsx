import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";

const HomePage = () => {
  const navigate = useNavigate();
  const { token } = useStateContext();
  const handleLoginClick = () => {
    if (token) {
      navigate("/admin-dashboard");
    } else {
      navigate("/login");
    }
  };
  const handleRegisterClick = () => {
    if (token) {
      navigate("/user");
    } else {
      navigate("/register");
    }
  };
  return (
    <div className="HomePage">
      <header className="header">
        <div className="logo">S</div>
        <nav className="nav">
          <button className="nav-button" onClick={handleLoginClick}>
            Student Portal
          </button>
          <button className="nav-button" onClick={handleRegisterClick}>
            Register
          </button>
        </nav>
      </header>
      <section className="hero-section">
        <h1>Welcome to Susipvan Education Institute</h1>
        <p>
          Located in the heart of Gampaha, Susipvan is dedicated to nurturing
          future leaders with the highest quality education. Join our journey of
          excellence.
        </p>
      </section>
      <section className="info-section">
        <h2>About Susipvan</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Teachers</h3>
            <p>
              Over 50 qualified and experienced educators to guide your learning
              journey.
            </p>
          </div>
          <div className="info-card">
            <h3>Students</h3>
            <p>
              Serving over 2000 students annually with a wide range of courses
              and activities.
            </p>
          </div>
          <div className="info-card">
            <h3>Contact Us</h3>
            <p>
              Address: Susipvan Institute, Gampaha
              <br />
              Phone: +94 123 456 789
              <br />
              Email: info@susipvan.lk
            </p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 Susipvan Education Institute. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
