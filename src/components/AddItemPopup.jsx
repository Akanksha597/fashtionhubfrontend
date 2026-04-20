import React, { useState } from 'react';
import './Addpopup.css';
import axiosInstance from '../api/axiosInstance';

const AddItemPopup = ({ isOpen, onClose ,callData}) => {
  const [code, setcode] = useState('');

  const handleAddItem =async () => {
    let api =  `/api/v1/coupons/varify/${code}`
    console.log('make api:', api);
    console.log('make code:', code);
    try {
      const response = await axiosInstance.get(api, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add Bearer token
        },
      });
  
      console.log('API Response:', response.data);
      if (response.data.data && response.data.data.coupon) {
        callData(response.data.data.coupon)
      }else{
        callData(null)
      }
    } catch (error) {
      console.error('Error in API Call:', error.response ? error.response.data : error.message);
    }
    console.log(`Adding item with code: ${code}`);
    onClose();
  };

  const handleClose = () => {
    setcode(''); // Optionally reset the item code
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
     
      <div className="popup-content">
      <span className="popup-close" onClick={handleClose}>X</span>
        <div className="popup-header">
          <h4>Add Coupon Code</h4>
         
        </div>
        <div className="d-flex align-items-center">
          <input
            type="text"
            name=''
            className="form-control me-2"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setcode(e.target.value)}
          />
          <button 
            className="btn btn-outline-secondary" 
            onClick={handleAddItem}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemPopup;
