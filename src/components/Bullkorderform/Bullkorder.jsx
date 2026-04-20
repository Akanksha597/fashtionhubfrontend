import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BulkOrderForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [userType, setUserType] = useState('');
  const [products, setProducts] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  // Validation
  const validateForm = () => {
    if (!name || !email || !mobile || !state || !userType || !products) {
      toast.error('Please fill in all required fields!');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address!');
      return false;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    try {
      const productList = products.split(',').map((product) => product.trim());

      const response = await axiosInstance.post('/api/v1/bulk/create', {
        name,
        email,
        mobile,
        state,
        city,
        userType,
        productNames: productList,
        additionalInfo,
      });

      toast.success('Bulk order inquiry submitted successfully!');
      console.log(response.data.reverse());
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '25px' }}>
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%', transition: 'none', boxShadow: 'none' }}>
        <h3 className="text-center text-success mb-3">Bulk Order Inquiries</h3>
        <p className="text-center text-muted">Please fill the form and we will call you back</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter your mobile number" required />
          </div>

          <div className="mb-3">
            <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
            <select className="form-select" id="state" value={state} onChange={(e) => setState(e.target.value)} required>
              <option value="">Please Select</option>
              <option value="California">Maharashtra</option>
             
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" />
          </div>

          <div className="mb-3">
            <label htmlFor="userType" className="form-label">User Type <span className="text-danger">*</span></label>
            <select className="form-select" id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="">Please Select</option>
              <option value="Customer">Customer</option>
              <option value="Supplier">Supplier</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="products" className="form-label">Products Names <span className="text-danger">*</span></label>
            <textarea className="form-control" id="products" value={products} onChange={(e) => setProducts(e.target.value)} rows="2" placeholder="Add product names, separated by commas..." required></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="additionalInfo" className="form-label">Additional Info</label>
            <textarea className="form-control" id="additionalInfo" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows="2" placeholder="Add additional info..."></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success w-100">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BulkOrderForm;
