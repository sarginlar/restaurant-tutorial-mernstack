import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signup } from "../api/auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "Rıfat",
    email: "sarginlar@gmail.com",
    password: "dene123",
    password2: "dene123",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  // distructure
  const { username, email, password, password2, successMsg, errorMsg, loading } = formData;
  /************
   * EVEN HANDLERS
   ************/
  const handleChange = (evt) => {
    // console.log(evt);
    setFormData({ ...formData, [evt.target.name]: evt.target.value, successMsg: "", errorMsg: "" });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    //client side validation
    if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({ ...formData, errorMsg: "Password do not mach" });
    } else {
      //SUCCESS
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });
      signup(data)
        .then((response) => {
          console.log("Axios signup success:", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error:", err);
          setFormData({ ...formData, loading: false, errorMsg: err.response.data.errorMessage });
        });
    }
  };
  /************
   * VIEWS
   ************/
  const showSignupForm = () => (
    <form className='signup-form' onSubmit={handleSubmit} noValidate>
      {/*username */}
      <div className='form-group input-group mb-3'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
            <i className='fa fa-user'></i>
          </span>
        </div>
        <input type='text' name='username' value={username} className='form-control' placeholder='Username' aria-label='Username' aria-describedby='basic-addon1' onChange={handleChange} />
      </div>
      {/* email */}
      <div className='form-group input-group mb-3'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
            <i className='fa fa-envelope'></i>
          </span>
        </div>
        <input type='text' name='email' value={email} className='form-control' placeholder='Email address' aria-label='Email address' aria-describedby='basic-addon1' onChange={handleChange} />
      </div>
      {/* creat password */}
      <div className='form-group input-group mb-3'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
            <i className='fas fa-lock'></i>
          </span>
        </div>
        <input type='text' name='password' value={password} className='form-control' placeholder='creat password' aria-label='password' aria-describedby='basic-addon1' onChange={handleChange} />
      </div>
      {/* confirm password */}
      <div className='form-group input-group mb-3'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
            <i className='fa fa-envelope'></i>
          </span>
        </div>
        <input type='text' name='password2' value={password2} className='form-control' placeholder='confirm password' aria-label='Username' aria-describedby='basic-addon1' onChange={handleChange} />
      </div>
      <div className='form-group '>
        <button type='submit' className='btn btn-primary btn-block'>
          Signup
        </button>
      </div>
      {/* already have account */}
      <p className='text-center text-white'>
        Have an account <Link to='/signin'>Log in</Link>
      </p>
    </form>
  );

  return (
    <div className='signup-container'>
      <div className='row vh-100'>
        <div className='col-md-5 mx-auto align-self-center'>
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className='text-center pb-4'> {showLoading()}</div>}
          {showSignupForm()}

          {/*<p style={{ color: "white" }}>{JSON.stringify(formData)}</p>*/}
        </div>
      </div>
    </div>
  );
};

export default Signup;
