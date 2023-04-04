import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import LoginFormModal from "../LoginFormModal/index";
import SignUpForm from "../SignupFormModal";
import { useModal } from "../../context/Modal";
import TEATIME from "../../images/TEATIME.png"


function HomePage() {
  const { setModalContent } = useModal();

  const openLoginFormModal = () => {
    setModalContent(<LoginFormModal />);
  };

  const openSignUpFormModal = () => {
    setModalContent(<SignUpForm />);
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="home-nav-left">
          <Link to="/" className="home-logo-link">
            <img
              src={TEATIME}
              alt="Discord Logo"
              className="home-logo"
            />
          </Link>
        </div>
        <div className="home-nav-right">
          <button className="home-button" onClick={openLoginFormModal}>
            Log In
          </button>
          <button className="home-button" onClick={openSignUpFormModal}>
            Sign up
          </button>
        </div>
      </nav>
      <div className="home-content">
        <h1 className="home-header">Imagine a place...</h1>
        <p className="home-subheader">
          ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
        </p>
      </div>
    </div>
  );
}

export default HomePage;

