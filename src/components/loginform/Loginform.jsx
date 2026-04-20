import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './loginform.css';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginSignupPopup = ({ setIsModalOpen, showAsPopup = true }) => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setShowForgotPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const login = useGoogleLogin({
    onSuccess: () => {
      toast.success('Google login successful!', { position: 'top-center' });
    },
    onError: () =>
      toast.error('Google login failed!', { position: 'top-center' }),
  });

  // ✅ LOGIN
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) return;

    try {
      const response = await axiosInstance.post(
        '/api/v1/auth/login',
        formData
      );

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Login successful!');
        navigate('/profile');
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed'
      );
    }
  };

  // ✅ SIGNUP (FULLY FIXED)
  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.firstName.value;
    const email = form.email.value;
    const mobile = form.mobileNumber.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // ✅ VALIDATION
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Invalid email');
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setMobileError('Enter valid 10-digit mobile');
      return;
    }
    setMobileError('');

    if (password.length < 8) {
      setPasswordError('Minimum 8 characters required');
      return;
    }
    setPasswordError('');

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // ✅ FormData (IMPORTANT)
    const signupData = new FormData();
    signupData.append('name', name);
    signupData.append('email', email);
    signupData.append('mobile', mobile);
    signupData.append('password', password);
    signupData.append('confirmPassword', confirmPassword);
    signupData.append('role', 'customer');
    signupData.append('active', 'true');

    try {
      const response = await axiosInstance.post(
        '/api/v1/auth/signup',
        signupData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data?.status === 'success') {
        toast.success('Signup successful! Please login.');
        setIsSignUp(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Signup failed'
      );
    }
  };

  const content = (
    <div className="container p-4 bg-light" style={{ marginTop: '45px', marginBottom: '30px' }}>
      <div className="row">
        <div className="col-md-5 text-center py-4">
          <button
            className={`btn ${!isSignUp ? 'btn-signup' : 'btnsuccess'} w-100 mb-3`}
            onClick={toggleForm}
          >
            Log In
          </button>

          <button
            className={`btn ${isSignUp ? 'btn-signup' : 'btnsuccess'} w-100 mb-3`}
            onClick={toggleForm}
          >
            New User? Sign Up
          </button>

          
        </div>

        <div className="col-md-7">
          {isSignUp ? (
            <form onSubmit={handleSignupSubmit}>
              <h4>Sign Up</h4>

              <input
                type="text"
                name="firstName"
                className="form-control my-3"
                placeholder="Name"
                required
              />

              <input
                type="text"
                name="mobileNumber"
                className="form-control my-3"
                placeholder="Mobile Number"
                maxLength="10"
                required
              />
              {mobileError && <div className="text-danger">{mobileError}</div>}

              <input
                type="email"
                name="email"
                className="form-control my-3"
                placeholder="Email"
                required
              />

              <div className="input-group my-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required

                  
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              {passwordError && <div className="text-danger">{passwordError}</div>}

              <input
                type="password"
                name="confirmPassword"
                className="form-control my-3"
                placeholder="Confirm Password"
                required
              />

              <button className="btn btn-signup w-100">Sign Up</button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <h4>Log In</h4>

              <input
                type="email"
                name="email"
                className="form-control my-3"
                placeholder="Email"
                onChange={handleChange}
                required
              />

              <div className="input-group my-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <button className="btn btn-signup w-100">Log In</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer />
      {showAsPopup ? (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">{content}</div>
            </div>
          </div>
        </div>
      ) : (
        content
      )}
    </>
  );
};

export default LoginSignupPopup;