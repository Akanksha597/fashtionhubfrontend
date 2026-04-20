import React, { useState, useEffect } from "react";
import "./OrderConfirmation.css";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../api/axiosInstance";
import Order from '../../assets/image/cardboard-box-with-cargo-checklist-pencil_107791-16644.jpg';


const OrderConfirmation = (props) => {
  const userData = JSON.parse(localStorage.getItem("user")) || {}; // Declare userData before use
  const { cartItems, removeFromCart } = useCart();
  const [addresses, setAddresses] = useState(userData.address || []);
  const [formData, setFormData] = useState({
    user_id: userData._id || "",
    name: userData.name || "",
    email: userData.email || "",
    mobile: userData.mobile || "",
    addressLine1: userData.addressLine1 || "",
    addressLine2: "",
    city: "",
    state: "Maharashtra",
    country: "India",
    pincode: "",
    type: "", // Will store either 'delivery' or 'shipping'
    index: null, // To store the index of the address being edited
  });

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
            <strong>Address Line 1:</strong> {latestAddress.addressLine1}
          </div>
          <div className="mb-1">
            <strong>Address Line 2:</strong> {latestAddress.addressLine2}
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
          <div className="mb-1">
            <strong>Pincode:</strong> {latestAddress.pincode}
          </div>
        </div>
      );
    } else {
      return <p>No address available.</p>; // Fallback if no address is found
    }
  };

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: [],
  });
  const [cartItemsData, setCartItemsData] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setProfileData({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        address: userData.address,
      });
    }
  }, []);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCartItemsData(cartItems);
    }
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    removeFromCart(id); // Remove item using context function
  };

  const placeOrder = async () => {
    let tempUserData = localStorage.getItem('user'), userData;
    if (tempUserData) {
      userData = JSON.parse(tempUserData);
    }
    let orderData = {};
    let cartTempData = JSON.parse(JSON.stringify(cartItems));

    console.log('userData:::::', userData);

    if (cartItems && cartItems.length) {
      let dbCart = [];
      cartItems.map(item => {
        dbCart.push({
          productId: item._id,
          qty: item.quantity,
          unit: item.selectPunit,
          price: item.selectPprice,
        });
      });
      if (dbCart && dbCart.length) {
        orderData.dbCart = dbCart;
      }
    }

    if (total) {
      orderData.grandTotal = total;
    }

    // Handle discountAmount (with fallback)
    const discountAmount = props?.data?.discountAmt || 0; // Default to 0 if undefined
    if (discountAmount) {
      orderData.discountAmount = discountAmount;
      orderData.paymentMethod = "Cash on Delivery";
      orderData.paymentMode = "cod";
    }

    if (userData && userData.address && userData.address.length) {
      userData.address.map(add => {
        if (add && add.type && add.type === 'Billing') {
          orderData.shippingAddress = add;
        }
        if (add && add.type && add.type === 'delivery') {
          orderData.deliveryAddress = add;
        }
      });
    }

    if (total) {
      orderData.totalAmount = total - discountAmount;
    }

    if (userData && userData.email) {
      orderData.customerEmail = userData.email;
    }
    if (userData && userData.mobile) {
      orderData.customerPhoneNumber = userData.mobile;
    }

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
          cartTempData.map(item => {
            removeFromCart(item._id, item.selectPunit);
          });
        }
        toast.success('order Created successfully!', { position: 'top-center' });
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

  return (
    <div className="order-confirmation container my-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <img
          src={Order}
          alt="Success Icon"
          className="mb-3 orderimage"
        />
        <h2 className="text-success">SUCCESS!</h2>
        <p className="lead">Yay! Your order has been successfully placed</p>
      </div>

      {/* Order Details */}
      <div className="order-details mb-4 p-4">
        <h5 className="fw-bold">Order Details</h5>
        <p>
          Order number: <span className="fw-semibold">OR-3527707</span>
        </p>
        <p>
          Contact: <span className="fw-semibold">{profileData.mobile}</span>
        </p>
        <p>
          Email: <span className="fw-semibold">{profileData.email}</span>
        </p>
        <p>
          Delivery: <span className="fw-semibold">3-7 Days</span>
        </p>
      </div>

      {/* Product Details */}
      {cartItemsData && cartItemsData.length > 0 ? (
        cartItemsData.map((cartdata) => (
          <div className="row mb-4 align-items-center" key={cartdata._id}>
            <div className="col-md-3 text-center">
              <img
                src={cartdata.gallery || "/images/placeholder.png"}
                style={{ width: "50%" }}
                alt="Product"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-5">
              <h6 className="fw-bold">
                {cartdata.selectedPTitle}
              </h6>
              <p>
                Unit: <span className="fw-semibold"> {cartdata.selectPunit || "N/A"}</span>
              </p>
              <p>
                Qty: <span className="fw-semibold">{cartdata.quantity || "N/A"}</span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Price: <span className="fw-semibold">₹{cartdata.selectPprice || "N/A"}</span>
              </p>
              <p>
                Payment Method: <span className="fw-semibold">Postpaid</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Your Cart is empty!</p>
      )}

      {/* Billing and Shipping */}
      {userData && userData.address && userData.address.length > 0 ? (
        userData.address.map((add, index) => (
          <div className="row order-details mb-4 p-4" key={index}>
            <div className="col-md-8">
              <h5>Billing Address</h5>
              {renderAddressList(add)}
            </div>
            <div className="col-md-4">
              <div className="">
                <p className="order-confirm">
                  Sub Total: <span className="fw-semibold">₹ {total}</span>
                </p>
                <p className="order-confirm">
                  Discount Amount: <span className="fw-semibold">₹{props?.data?.discountAmt || 0}</span>
                </p>
                <p className="order-confirm">
                  Total Amount <span className="fw-semibold"> ₹ {total - (props?.data?.discountAmt || 0)}</span>
                </p>
                <p className="order-confirm">
                  Paymethod: <span className="fw-semibold">Postpaid</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p style={{ color: 'red' }}>No addresses found.</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-5">
        <button className="btn btn-success">Go Back To Shopping</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
