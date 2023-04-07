import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Homepage.css";
import LoginFormModal from "../LoginFormModal/index";
import SignUpForm from "../SignupFormModal";
import { useModal } from "../../context/Modal";
import TEATIME from "../../images/TEATIME.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  const { setModalContent } = useModal();

  const openLoginFormModal = () => {
    setModalContent(<LoginFormModal />);
  };

  const openSignUpFormModal = () => {
    setModalContent(<SignUpForm />);
  };

  const handleLogout = () => {
    history.push("/");
    dispatch(logout());
  };

  const handleGoToServers = () => {
    history.push("/servers");
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="home-nav-left">
          <Link to="/" className="home-logo-link">
            <img src={TEATIME} alt="Discord Logo" className="home-logo" />
          </Link>
        </div>
        <footer className="home-footer">
          <p className="home-footer-text">Created by Henry Tam</p>
          <div className="home-footer-icons">
            <a
              href="https://github.com/henrytamm/tea-time"
              className="home-footer-icon-link"
            >
              <i className="fab fa-github home-footer-icon"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/henry-t95/"
              className="home-footer-icon-link"
            >
              <i className="fab fa-linkedin home-footer-icon"></i>
            </a>
          </div>
        </footer>
        <div className="home-nav-right">
          {currentUser ? (
            <>
              <button className="home-button" onClick={handleGoToServers}>
                Go to servers
              </button>
              <button className="home-button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="home-button" onClick={openLoginFormModal}>
                Log In
              </button>
              <button className="home-button" onClick={openSignUpFormModal}>
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>
      <div className="home-content">
        <h1 className="home-header">Imagine a place...</h1>
        <p className="home-subheader">
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. Where just you and a handful of friends can
          spend time together. A place that makes it easy to talk every day and
          hang out more often.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
