import React, { useState, useEffect } from "react";
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import AddItemPopup from '../AddItemPopup';
import axiosInstance from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


const Checkout = (props) => {
  
  
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [discountAmt, setdiscountAmt] = useState(0);
  const [couponData, setCouponData] = useState({});
  const [cartItemsData, setCartItemsData] = useState(cartItems);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handleAddItemClick = () => {
  setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const calculateTotal = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      const price = item?.selectPprice || 0;
      const quantity = item.quantity || 1;
      subtotal += price * quantity;
    });
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + 0).toFixed(2)
    };
  };

  const { subtotal, tax, total } = calculateTotal();
  const [finalAmt, setFinalAmt] = useState(total);

  const handleQuantityChange = (id, size, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, size, quantity);
    } else {
      handleRemoveItem(id, size); // Remove the item if quantity is 0
    }
  };

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size);
  };

  useEffect(() => {
    if (couponData && couponData.discount && couponData.discountType) {
      let discountedTotal;
      if (couponData.discountType === "percentage") {
        discountedTotal = total * (couponData.discount / 100);
      } else {
        discountedTotal = couponData.discount;
      }
      const finalAmount = total - discountedTotal;
      setDiscountAmt(discountedTotal);
      setFinalAmt(finalAmount.toFixed(2));
    } else {
      setFinalAmt(total);
    }
  }, [total, couponData]);

    const callData = (data) => {
    console.log('data ::::', data);
    setCouponData(data);
    if (data && data.discount && data.discountType) {
      let discountedTotal;
      if (data.discountType == 'percentage') {
        discountedTotal = total * (data.discount / 100);
      } else {
        discountedTotal = data.discount;
      }
      const totalAmt = total - discountedTotal;
      setDiscountAmt(discountedTotal);
      setFinalAmt(totalAmt.toFixed(2));
      toast.success('Coupon applied successfully!', { position: 'top-center' });
    } else {
      toast.error('Coupon Not Found', { position: 'top-center' });
    }
  };

  const dispatch = useDispatch();
  const [formType, setFormType] = useState(""); // Tracks adding or editing
  let userData = JSON.parse(localStorage.getItem("user")) || {};
  const [addresses, setAddresses] = useState(userData.address || []);
  const [formData, setFormData] = useState({
    user_id: userData._id || "",
    name: userData.name || "",
    email: userData.email || "",
    mobile: userData.mobile || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    type: formType,
    index: null, // For editing existing addresses
    alternativename: "",
    alternativeMobile: "",
    Area: ""
  });
  console.log("this is form type :: ", formType)


  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const [postOfficeList, setPostOfficeList] = useState([]);

  const getDataFromPostOfficeApi = (e) => {
    const pinCode = e.target.value;

    if (pinCode && pinCode.length === 6) {
      const url = `https://api.postalpincode.in/pincode/${pinCode}`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          if (data && data[0].Status === "Success") {
            const postOffices = data[0].PostOffice || [];
            if (postOffices.length > 0) {
              // Extract all the names of the Post Offices
              const officeNames = postOffices.map((office) => office.Name);

              // Update state with the names
              setPostOfficeList(officeNames);

              // Optionally set the first Post Office as the default
              setFormData((prev) => ({
                ...prev,
                city: postOffices[0].District || "",
                state: postOffices[0].State || "",
                Area: officeNames[0] || "", // Set the first name as default
              }));

              toast.success("Post Office details fetched successfully!");
            } else {
              setPostOfficeList([]);
              toast.warn("No Post Offices found for the entered Pincode.");
            }
          } else {
            setPostOfficeList([]);
            toast.error("Invalid Pincode. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setPostOfficeList([]);
          toast.error("Unable to fetch details. Please check your connection.");
        });
    }
  };

  const resetForm = () => {
    setFormData({
      user_id: userData._id || "",
      name: userData.name || "",
      email: userData.email || "",
      mobile: userData.mobile || "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      type: "",
      index: null,
      Area: "",
      alternativeMobile: "",
      alternativename: ""
    });

    setFormType(null);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated. Please login.");
      return;
    }

    const newAddress = {
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      type: formData.type,
      alternativename: formData.alternativename,
      alternativeMobile: formData.alternativeMobile,
      Area: formData.Landmark
    };

    const updatedAddresses = [...addresses];
    if (formData.index !== null) {
      updatedAddresses[formData.index] = newAddress; // Edit existing address
    } else {
      updatedAddresses.push(newAddress);
    }
    delete userData.__v;
    const updatedData = {
      ...userData,
      address: updatedAddresses,
    };

    try {
      const response = await dispatch(updateUser(updatedData));

      if (response.meta.requestStatus === "fulfilled") {
        const updatedUser = response.payload.data.user;
        console.log('updatedUserupdatedUser :::', updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update user in localStorage
        setAddresses(updatedUser.address); // Update addresses state
        toast.success("Address updated successfully!");
        resetForm(); // Reset the form after submission
      } else {
        toast.error("Failed to update address. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
   const getSizeDetails = (product, size) => {
    return product.availableSizes.find(s => s.size === size);
  };

  const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [isPopupOpen, setIsPopupOpen] = useState(false);  // Ensure this state is initialized
    const [discountAmt, setdiscountAmt] = useState(0);
    const [couponData, setcouponData] = useState({});


    const handleQuantityChange = (id, size, quantity) => {
      if (quantity > 0) {
        updateQuantity(id, size, quantity);
      } else {
        handleRemoveItem(id, size); // Remove the item if quantity is 0
      }
    };

    const handleRemoveItem = (id, size) => {
      removeFromCart(id, size);
    };

    const calculateTotal = () => {
      let subtotal = 0;
      cartItems.forEach(item => {
        const price = item?.selectPprice || 0;
        const quantity = item.quantity || 1;
        subtotal += price * quantity;
      });
      const tax = subtotal * 0.05;
      return {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: (subtotal + tax).toFixed(2),
      };
    };



    useEffect(() => {
      if (couponData && couponData.discount && couponData.discountType) {
        let discountedTotal;
        if (couponData.discountType === "percentage") {
          discountedTotal = total * (couponData.discount / 100);
        } else {
          discountedTotal = couponData.discount;
        }
        const finalAmount = total - discountedTotal;
        setDiscountAmt(discountedTotal);
        setFinalAmt(finalAmount.toFixed(2));
      } else {
        setFinalAmt(total);
      }
    }, [total, couponData]);


    const { subtotal, tax, total } = calculateTotal();
    const [finalAmt, setfinalAmt] = useState(total);
    const handleAddItemClick = () => {
      setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };
    useEffect(() => {
      console.log('total useEffect::::', total)
      if (couponData && couponData.discount && couponData.discountType) {
        if (couponData.discountType == 'percentage') {
          const discountedTotal = (total * (couponData.discount / 100))
          let totalAmt = total - discountedTotal
          console.log('discountedTotal ::::', { discountedTotal, finalAmt })
          setdiscountAmt(discountedTotal)
          setfinalAmt(totalAmt)
        } else {
          const discountedTotal = couponData.discount
          let totalAmt = total - discountedTotal
          setdiscountAmt(discountedTotal)
          setfinalAmt(totalAmt)
          console.log('discountedTotal else::::', discountedTotal)
        }
      } else {
        setfinalAmt(total)
      }
    }, [total])
    const callData = (data) => {

      setcouponData(data)
      if (data && data.discount && data.discountType) {
        if (data.discountType == 'percentage') {
          const discountedTotal = (total * (data.discount / 100))
          let totalAmt = total - discountedTotal

          setdiscountAmt(discountedTotal)
          setfinalAmt(totalAmt)
          toast.success('Coupon applied successfully!', { position: 'top-center' })
        } else {
          const discountedTotal = data.discount
          let totalAmt = total - discountedTotal
          setdiscountAmt(discountedTotal)
          setfinalAmt(totalAmt)
          console.log('discountedTotal else::::', discountedTotal)
          toast.success('Coupon applied successfully!', { position: 'top-center' })
        }
      }
      else {
        // toast.success('Google login successful!', { position: 'top-center' })
        console.log('dataelse ::::', data)
        toast.error('Coupon Not Found', { position: 'top-center' })
      }
    }
  }
  // To store the index of the address being edited
  const placeOrder = async () => {
    let tempUserData = localStorage.getItem('user'), userData
    if (tempUserData) {
      userData = JSON.parse(tempUserData)
    }
    let orderData = {}
    let cartTempData = JSON.parse(JSON.stringify(cartItems))
    console.log('userData:::::', userData)
    // return
    if (cartItems && cartItems.length) {
      let dbCart = []
      cartItems.map(item => {
        dbCart.push({
          productId: item._id,
          qty: item.quantity,
          unit: item.selectPunit,
          price: item.selectPprice,
        })
      })
      if (dbCart && dbCart.length) {
        orderData.dbCart = dbCart
      }
    }
    if (total) {
      orderData.grandTotal = total
    }
    if (props.data && props.data.discountAmt) {
      orderData.discountAmount = props.data.discountAmt;
      orderData.paymentMethod = "Cash on Delivery";
      orderData.paymentMode = "cod";
    }
    
    if (userData && userData.address && userData.address.length) {
      userData.address.map(add => {
        if (add && add.type && add.type === 'Billing') {
          orderData.shippingAddress = add
        }
        if (add && add.type && add.type === 'delivery') {
          orderData.deliveryAddress = add
        }
      })

    }
    if (total) {
      orderData.totalAmount = total - props.data?.discountAmt || 0; // Default to 0 if undefined

    }
    if (userData && userData.email) {
      orderData.customerEmail = userData.email
    }
    if (userData && userData.mobile) {
      orderData.customerPhoneNumber = userData.mobile
    }

    try {
      const response = await axiosInstance.post('/api/v1/orders/createOrder', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      console.log('order created Successfully:', response.data);
      if (response.data && response.data) {
        if (cartTempData && cartTempData.length) {
          cartTempData.map(item => {
            removeFromCart(item._id, item.selectPunit);
          })
        }
        toast.success('order Created successfully!', { position: 'top-center' })
        await wait(2000)
        navigate('/product');
      }
    } catch (error) {
      console.error('Login Failed:', error.response ? error.response.data : error.message);
      toast.error('Something Went Wrong!', { position: 'top-center' })
      // Show error toast message
    }
    // console.log('placeOrder: orderDataorderData::',orderData)
  }
  const wait = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }


  


  return (
    <>
      <div className="container py-4">
        <h3 className="mb-3">Checkout</h3>
        <p>You are almost there!</p>

        <ToastContainer />
        <div className="row">
          <div className="col-lg-8">
            <h5>New Shipping Address</h5>
            <form onSubmit={handleFormSubmit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="alternativename"
                    value={formData.alternativename}
                    onChange={(e) => setFormData({ ...formData, alternativename: e.target.value })}

                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Mobile Number *"
                    name="Alternative Number"
                    value={formData.alternativeMobile}
                    onChange={(e) => setFormData({ ...formData, alternativeMobile: e.target.value })}
                    required
                    pattern="^\d{10}$"
                    title="Please enter exactly 10 digits."

                  />
                  {formData.alternativeMobile && !/^\d{10}$/.test(formData.alternativeMobile) && (
                    <div className="text-danger mt-2">Please enter a valid 10-digit mobile number.</div>
                  )}

                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-8 mb-3">
                  <textarea
                    type="text"
                    name="addressLine1"
                    className="form-control"
                    placeholder="Address Line"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    placeholder="Pincode"
                    pattern="^\d{6}$"
                    value={formData.pincode}
                    onChange={(e) => {
                      setFormData({ ...formData, pincode: e.target.value });
                      getDataFromPostOfficeApi(e);
                    }}

                  />
                </div>
                  </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <select
                    name="Landmark"
                    className="form-control"
                    value={formData.Area}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        Area: e.target.value, // Update selected value in formData
                      }));
                    }}
                  >
                    <option value="" disabled>
                    Area
                    </option>
                    {postOfficeList.map((officeName, index) => (
                      <option key={index} value={officeName}>
                        {officeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    value={formData.city}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    placeholder="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success mb-3 ">
                Save Address
              </button>
            </form>
          </div>
          <div className="col-lg-4">
            <h5>Order Summary</h5>
            <div className="border p-3 mb-3">
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>{subtotal}</span>

              </div>

              <div className="d-flex justify-content-between">
                <span>Discount Amount</span>
                <span>{discountAmt}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                {finalAmt && <h3> ₹{finalAmt}</h3>}
              </div>
            </div>

            <div className="coupon-section mb-4">
              <div className="row ">
                <div className="col-8 text-start">
                  <h5>Coupon Discount?</h5>
                </div>
                <div className="col-4 text-end">
                  <button className="add-to-button w-100" onClick={handleAddItemClick}>
                    Add Coupon
                  </button>
                </div>
              </div>
            </div>
            <button className="btn btn-success w-100 mb-2">Online</button>
            <button className="btn btn-secondary w-100" onClick={placeOrder}>Cash on Delivery</button>
          </div>
        </div>
        <hr />
        {/* Product Section */}
        {cartItemsData && cartItems && cartItems.length > 0 && cartItems.map(cartdata => {
          return (
            <div className="d-flex align-items-center" key={cartdata.id}>
              <img
                src={cartdata.gallery ? cartdata.gallery : '/images/placeholder.png'} // Replace with the product image URL
                alt="Product"
                className="img-fluid"
                style={{ width: "100px", height: "auto" }}
              />
              <div className="ms-3">
                <h6>{cartdata.selectedPTitle}</h6> {/* Assuming cartdata has 'name' */}
                <p className="mb-1">Unit: {cartdata.selectPunit || 'N/A'}</p>
                <p className="mb-1">Qty: {cartdata.quantity || 'N/A'}</p>
                <p>Price: {cartdata.selectPprice || 'N/A'}</p> {/* Use quantity if available */}

              </div>
              <div className="ms-auto">
                <strong>₹{cartdata.quantity * cartdata.selectPprice || '0'}</strong> {/* Assuming cartdata has 'price' */}
                <button className="btn btn-link text-danger d-block" onClick={() => handleRemoveItem(cartdata.id)}>Remove</button>
              </div>
            </div>
          );
        })}

      </div>
      <AddItemPopup isOpen={isPopupOpen} onClose={handleClosePopup} callData={callData} />
    </>
  );

};



export default Checkout;








