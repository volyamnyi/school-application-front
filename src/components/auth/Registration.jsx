import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userRegister } from "../../utils/ApiFunctions";

const Registration = () => {
  const [registration, setRegistration] = useState({
    email: "",
    password: "",
    password_confirm: "",
    userType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (registration.password !== registration.password_confirm) {
      setErrorMessage("Registration error : passwords do not match");
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return;
    }
    try {
      const result = await userRegister(registration);
      setSuccessMessage("Registration successful");
      setErrorMessage("");
      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password_confirm: "",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };
  const handleSelectUserTypeChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setRegistration({ ...registration, [name]: value });

  };

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img
                  className="img-fluid"
                  src="assets/img/login.png"
                  alt="Logo"
                />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  {errorMessage && (
                    <p className="alert alert-danger">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="alert alert-success">{successMessage}</p>
                  )}
                  <h1>Sign Up</h1>
                  <p className="account-subtitle">
                    Enter details to create your account
                  </p>
                  <form onSubmit={handleRegistration}>
                    <div className="form-group local-forms">
                      <label>
                        Choose your role
                        <span className="login-danger">*</span>
                      </label>
                      <select
                        required
                        className="form-control"
                        id="userType"
                        name="userType"
                        value={registration.userType}
                        onChange={handleSelectUserTypeChange}
                      >
                        <option value="">Choose your role</option>
                        <option value="TEACHER">TEACHER</option>
                        <option value="PARENT">PARENT</option>
                        <option value="STUDENT">STUDENT</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>
                        Email <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleInputChange}
                        value={registration.email}
                      />
                      <span className="profile-views">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                    <div className="form-group">
                      <label>
                        Password <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control pass-input"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                        value={registration.password}
                      />
                      <span
                        className={`profile-views ${
                          showPassword ? `feather-eye` : `feather-eye-off`
                        } toggle-password`}
                        onClick={handleToggleShowPassword}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Confirm password <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control pass-confirm"
                        type={showPassword ? "text" : "password"}
                        id="password_confirm"
                        name="password_confirm"
                        onChange={handleInputChange}
                        value={registration.password_confirm}
                      />
                      <span
                        className={`profile-views ${
                          showPassword ? `feather-eye` : `feather-eye-off`
                        } toggle-password`}
                        onClick={handleToggleShowPassword}
                      />
                    </div>
                    <div className=" dont-have">
                      Already Registered? <Link to="/login">Login</Link>
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
