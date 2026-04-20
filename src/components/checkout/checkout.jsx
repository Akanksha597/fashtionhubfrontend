import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './checkout.css';

const Checkout = () => {
  const { cartItems } = useCart();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const validateMobileNumber = (number) => /^\d{10}$/.test(number);
  const validatePincode = (code) => /^\d{6}$/.test(code);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateMobileNumber(mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!validatePincode(pincode)) {
      alert('Please enter a valid 6-digit pincode.');
      return;
    }

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxRate = 0.05; // 5%
    const tax = subtotal * taxRate;
    const totalPrice = subtotal + tax;

    const productDetails = cartItems
      .map(
        (item) =>
          `Product Name: ${item.title || item.name}\nQuantity: ${item.quantity}\nPrice: ₹${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n\n');

  //   const message = `Delivery Details:\n
  //     Name: ${firstName} ${lastName}\n
  //     Mobile: +91${mobileNumber}\n
  //     Address: ${flatNumber ? flatNumber + ', ' : ''}${streetAddress}\n
  //     Pincode: ${pincode}\n
  //     City: ${city}\n
  //     District: ${district}\n
  //     State: ${state}\n
  //     Landmark: ${landmark || 'N/A'}\n
  //     Payment Method: ${paymentMethod}\n\n
  //     Product Details:\n\n${productDetails}\n\n
  //     Subtotal: ₹${subtotal.toFixed(2)}\n
  //     Tax (5%): ₹${tax.toFixed(2)}\n
  //     Total Price: ₹${totalPrice.toFixed(2)}`;

  //   const encodedMessage = encodeURIComponent(message);
  //   const whatsappUrl = `https://api.whatsapp.com/send/?phone=918888678929&text=${encodedMessage}&type=phone_number&app_absent=0`;
  //   window.open(whatsappUrl, '_blank');










  
  };

  return (
    <div className="delivery-form-container">
      <div className="form-card">
        <h2 className="form-title">Delivery Address</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
  <label>First Name <span className="text-danger">*</span></label>
  <input
    type="text"
    className="form-control"
    placeholder="Enter your first name"
    value={firstName}
    onChange={(e) => {
      const value = e.target.value;
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFirstName(value);
      }
    }}
    required
  />
</div>
<div className="form-group">
  <label>Last Name <span className="text-danger">*</span></label>
  <input
    type="text"
    className="form-control"
    placeholder="Enter your last name"
    value={lastName}
    onChange={(e) => {
      const value = e.target.value;
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setLastName(value);
      }
    }}
    required
  />
</div>

          <div className="form-group">
            <label>Mobile Number <span className="text-danger">*</span></label>
            <div className="">
              <div className="prepend">
                
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Flat / House No (If Any)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your flat/house number"
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Street / Area / Colony / Village / Mandal / Taluk <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pincode <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>City <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>District <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>State <span className="text-danger">*</span></label>
              <select
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Landmark (Optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Payment Method <span className="text-danger">*</span></label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="PayOnline"
                checked={paymentMethod === 'PayOnline'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Pay Online</label>
            </div>
          </div>
          <button type="submit" className="submit-btn">Proceed to pay</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;







