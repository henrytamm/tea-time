import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignUpForm from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setEmail("demo@aa.io");
    setPassword("password");
  };

  const { setModalContent } = useModal();

  const openSignupModal = () => {
    setModalContent(<SignUpForm />);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
      <h1 className="login-header">Welcome back!</h1>
        <ul className="login-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-email-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <label className="login-password-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="password-input"
          />
        </label>
        <button type="submit" className="login-button">
          Log In
        </button>
        <h1 className="login-demo-login">Looking around?</h1>
        <button onClick={handleDemoLogin} className="demo-login-button">
          Demo Login
        </button>
        <div className="login-register">
          Don't have an account yet?
          <button
            className="login-form-signup-link"
            type="button"
            onClick={openSignupModal}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;

