
import React, { useState } from 'react';
import './loginsignup.css'; 




const Loginsignup = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup
  const [name, setName] = useState(''); // For Signup name
  const [mobile, setMobile] = useState(''); // For Signup mobile number

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (isLogin) {
     
      console.log('Logging in with', { email, password });
    } else {

  
      console.log('Signing up with', { email, password });

      // Signup logic here
      console.log('Signing up with', { name, mobile, email, password });

    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="text-center">{isLogin ? 'Login' : 'Sign Up'}</h3>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}" // Restricts to 10-digit numbers
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </div>
          )}
          <div className='form-btn'>
            <button type="submit" className="button btn-primary btn-block">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="toggle-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Loginsignup;

