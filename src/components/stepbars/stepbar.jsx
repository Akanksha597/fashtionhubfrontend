import React, { useState, useEffect } from 'react';
import LoginSignupPopup from '../loginform/Loginform';
import CheckoutPage from '../deliveryAddress/delivery';
import PaymentPage from '../payment/payment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stepbar.css';
import { useLocation } from 'react-router-dom';

const StepBar = () => {
  const location = useLocation();
  const orderData = location.state || {};
  console.log('orderData::::', orderData);

  const checkAuth = () => {
    return Boolean(localStorage.getItem('token'));
  };

  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [step, setStep] = useState(isAuthenticated ? 2 : 1);

  useEffect(() => {
    const tokenExists = checkAuth();
    setIsAuthenticated(tokenExists);
    if (tokenExists) {
      setStep(2);
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('userToken', 'sampleToken'); // Example token for demonstration
    setIsAuthenticated(true);
    setStep(2); // Move to Address step after login
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return <LoginSignupPopup showAsPopup={false} onLoginSuccess={handleLoginSuccess} />;
      case 2:
        return <CheckoutPage />;
      case 3:
        return <PaymentPage data={orderData} />;
      default:
        return <LoginSignupPopup showAsPopup={false} onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '1100px' }}>
      {/* Step Indicator */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div
          className="text-center"
          onClick={() => !isAuthenticated && setStep(1)} // Prevent unauthorized navigation
          style={{ cursor: isAuthenticated ? 'not-allowed' : 'pointer' }}
        >
          <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
          </div>
          <small className="mt-2 d-block">Login</small>
        </div>
        <div className={`step-line ${step > 1 ? 'active' : ''}`} />
        <div
          className="text-center"
          onClick={() => isAuthenticated && setStep(2)} // Only allow if logged in
          style={{ cursor: isAuthenticated ? 'pointer' : 'not-allowed', opacity: isAuthenticated ? 1 : 0.5 }}
        >
          <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
          </div>
          <small className="d-block">Address</small>
        </div>
        <div className={`step-line ${step > 2 ? 'active' : ''}`} />
        <div
          className="text-center"
          onClick={() => isAuthenticated && setStep(3)} // Only allow if logged in
          style={{ cursor: isAuthenticated ? 'pointer' : 'not-allowed', opacity: isAuthenticated ? 1 : 0.5 }}
        >
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
          </div>
          <small className="mt-2 d-block">Payment</small>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="stepbar-btn2"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          Previous
        </button>
        <button
          className="stepbar"
          onClick={() => {
            if (isAuthenticated) setStep(step + 1);
          }}
          disabled={!isAuthenticated || step === 3} // Disable if not logged in or at the last step
        >
          Save & Continue
        </button>
      </div>

      {/* Form Content */}
      <div className="form-container">{renderForm()}</div>
    </div>
  );
};

export default StepBar;
