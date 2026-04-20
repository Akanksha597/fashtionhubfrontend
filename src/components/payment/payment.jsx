import React, { useState } from "react";
import { useCart } from '../../context/CartContext';
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const PaymentPage = (props) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const userData = JSON.parse(localStorage.getItem("user")) || {}; // Declare userData before use

  const [addresses, setAddresses] = useState(userData.address || []);
  const [formData, setFormData] = useState({
    user_id: userData._id || "",
    name: userData.name || "",
    email: userData.email || "",
    mobile: userData.mobile || "",
    addressLine1: userData.addressLine1 || "",
    Landmark: "",
    city: "",
    state: "Maharashtra",
    country: "India",
    pincode: "",
    type: "", // Will store either 'delivery' or 'shipping'
    index: null, // To store the index of the address being edited
  });

  const [cartItemsData, setCartItemsData] = useState(cartItems);

  const calculateTotal = () => {
    let subtotal = 0;

    cartItems.forEach((item) => {
      const price = item?.selectPprice || 0;
      const quantity = item.quantity || 1;
      subtotal += price * quantity;
    });

    const tax = subtotal * 0.05;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + 0).toFixed(2),
    };
  };

  const { subtotal, tax, total } = calculateTotal();

  // Updated placeOrder function with address validation
  const placeOrder = async () => {
    // Check if delivery or billing address is available
    let deliveryAddress = userData?.address?.find(add => add.type === 'delivery');
    let billingAddress = userData?.address?.find(add => add.type === 'Billing');
  
    if (!deliveryAddress && !billingAddress) {
      toast.error('Please provide at least one address (billing or delivery) to proceed with the order.', { position: 'top-center' });
      return;
    } else {
      // If only one address is present, use it for both delivery and shipping
      if (!deliveryAddress) deliveryAddress = billingAddress;
      if (!billingAddress) billingAddress = deliveryAddress;
    }
    
    // Removed userData2 and used userData correctly
    let orderData = {};
    let cartTempData = JSON.parse(JSON.stringify(cartItems));
    console.log('userData:::::', userData);
  
    if (cartItems && cartItems.length) {
      let dbCart = [];
      cartItems.forEach(item => {
        const productId = item._id || item.id; // Handle both `_id` and `id`
        if (productId) {
          dbCart.push({
            productId, // Assign productId correctly
            qty: item.quantity || 1,
            unit: item.selectPunit || "",
            price: item.selectPprice || 0,
          });
        } else {
          console.error("Missing productId for item:", item);
        }
      });
  
      if (dbCart && dbCart.length) {
        orderData.dbCart = dbCart;
      }
    }
  
    if (total) {
      orderData.grandTotal = total;
    }
  
    if (props.data.discountAmt) {
      orderData.discountAmount = props.data.discountAmt;
      orderData.paymentMethod = "Cash on Delivery";
      orderData.paymentMode = "cod";
    }
  
    // Add address details
    if (userData && userData.address && userData.address.length) {
      userData.address.forEach(add => {
        if (add && add.type && add.type === 'Billing') {
          orderData.shippingAddress = add;
        }
        if (add && add.type && add.type === 'delivery') {
          orderData.deliveryAddress = add;
        }
      });
    }
  
    if (total) {
      orderData.totalAmount = total - props.data.discountAmt;
    }
  
    if (userData && userData.email) {
      orderData.customerEmail = userData.email;
    }
  
    if (userData && userData.mobile) {
      orderData.customerPhoneNumber = userData.mobile;
    }
  
    console.log(orderData, 'data received');
  
    try {
      const response = await axiosInstance.post('/api/v1/orders/createOrder', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('order created Successfully:', response.data);
      if (response.data && response.data) {
        if (cartTempData && cartTempData.length) {
          cartTempData.forEach(item => {
            removeFromCart(item._id, item.selectPunit);
          });
        }
        toast.success('Order created successfully!', { position: 'top-center' });
        await wait(2000);
        navigate('/product');
      }
    } catch (error) {
      console.error('Login Failed:', error.response ? error.response.data : error.message);
      toast.error('Something Went Wrong!', { position: 'top-center' });
    }
  };
  

  const wait = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const orderconfirmation = () => {
    // Simulate order processing delay
    setTimeout(() => {
      navigate("/Orderconfirmation");
    }, 2000); // 2-second delay before navigation
  };

  const renderAddressList = (add) => {
    if (add && Object.keys(add).length > 0) {
      const latestAddress = add; // Get the last address
      return (
        <div>
          <div className="mb-1">
            <strong>Name:</strong> {latestAddress.alternativename}
          </div>
          <div className="mb-1">
            <strong>Mobile:</strong> {latestAddress.alternativeMobile}
          </div>
          <div className="mb-1">
            <strong>Address Line:</strong> {latestAddress.addressLine1}
          </div>
          <div className="mb-1">
            <strong>Pincode:</strong> {latestAddress.pincode}
          </div>
          <div className="mb-1">
            <strong>Landmark:</strong> {latestAddress.Landmark}
          </div>
          <div className="mb-1">
            <strong>City:</strong> {latestAddress.city}
          </div>
          <div className="mb-1">
            <strong>State:</strong> {latestAddress.state}
          </div>
          <div className="mb-1">
            <strong>Country:</strong> {latestAddress.country}
          </div>
        </div>
      );
    } else {
      return <p>No address available.</p>; // Fallback if no address is found
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm bg-light">
      <ToastContainer />
      <div className="row">
        {/* Check for user data and addresses */}
        {userData && userData.address && userData.address.length > 0 ? (
          userData.address.map((add, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="">
                <div className="card-body">
                  <h5 style={{ color: 'green', fontWeight: 'bold' }}>
                    {index === 0 ? "Delivery Address" : "Billing Address"}
                  </h5>
                  {renderAddressList(add)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p style={{ color: 'red' }}>No addresses found.</p>
          </div>
        )}
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="">
            <div className="card-body">
              <h5 className="" style={{ color: 'green', fontWeight: 'bold' }}>Contact Number: </h5>
              {formData.mobile}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="">
            <div className="card-body">
              <h5 className="" style={{ color: 'green', fontWeight: 'bold' }}>Shipping option: </h5>
              <p>There are no shipping options available at your location.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-5 p-2 border rounded shadow-sm bg-light">
        <div className="card-body">
          <h5 className="" style={{ color: 'green', fontWeight: 'bold' }}>Order Summary</h5>
          <div className="scrollable-card-container">
            <table className="table">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Variants</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              {cartItemsData && cartItems && cartItems.length && cartItems.map(cartdata => {
                return (
                  <tbody>
                    <tr style={{ textAlign: "center" }}>
                      <td>
                        <img
                          src={cartdata.gallery ? cartdata.gallery : '/images/placeholder.png'}
                          alt="Product"
                          width={100}
                          height={150}
                          className="img-fluid cfinalAmtart-item-image"
                        />
                      </td>
                      <td>{cartdata.name}</td>
                      <td>{cartdata.selectPunit}</td>
                      <td>{cartdata.quantity}</td>
                      <td>{cartdata.quantity * cartdata.selectPprice}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div className="col-md-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckIndeterminate" checked />
                <label className="form-check-label" for="flexCheckIndeterminate">
                  COD
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckIndeterminate" disabled />
                <label className="form-check-label" for="flexCheckIndeterminate">
                  ONLINE
                </label>
              </div>
            </div>
            <div className="text-end col-md-8">
              <p><strong>Sub Total:</strong> ₹{total}</p>
              <p><strong>Discount Amount:</strong> ₹{props.data.discountAmt}</p>
              <p><strong>Total Amount:</strong> ₹{total - props.data.discountAmt}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success mt-4" onClick={placeOrder}>
          Submit
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center mt-4"></footer>
    </div>
  );
};

export default PaymentPage;
