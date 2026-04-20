import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import { useCart } from "../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CheckoutPage.css";
import axios from "axios";

const InputField = ({ label, type = "text", value, onChange }) => (
  <div className="form-group mb-3">
    <label className="form-label">{label}</label>
    <input type={type} className="form-control" value={value} onChange={onChange} />
  </div>
);

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const dispatch = useDispatch();
  let  userData = JSON.parse(localStorage.getItem("user")) || {};
console.log('userData ::::::::::::::::',userData)
  const [formType, setFormType] = useState(""); // Tracks adding or editing
  const [addresses, setAddresses] = useState(userData.address || []);
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [formData, setFormData] = useState({
    user_id: userData._id || "",
    name: userData.name || "",
    email: userData.email || "",
    mobile: userData.mobile || "",
    addressLine1: "",

    city: "",
    state: "",
    country: "India",
    pincode: "",
    type: formType,
    index: null, // For editing existing addresses
    alternativename: "",
    alternativeMobile: "",
    Landmark: "",
  });
  console.log("this is form type :: ", formType)
  // Form submission handler
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
      Landmark: formData.Landmark
    };

    const updatedAddresses = [...addresses];
    if (formData.index !== null) {
      updatedAddresses[formData.index] = newAddress; // Edit existing address
    } else {
      updatedAddresses.push(newAddress); // Add new address
    }
    delete userData.__v;
    const updatedData = {
      ...userData,
      address: updatedAddresses,
    };
    // console.log('updatedData:::::',updatedData)
    // return
    try {
      const response = await dispatch(updateUser(updatedData));

      if (response.meta.requestStatus === "fulfilled") {
        const updatedUser = response.payload.data.user;
        console.log('updatedUserupdatedUser :::',updatedUser)
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
  const hasDeliveryAddress = addresses.some((addr) => addr.type === "delivery");
const hasshippingAddress = addresses.some((addr) => addr.type === "Billing");


  // Reset the form
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
      Landmark: "",
      alternativeMobile: "",
      alternativename: ""
    });

    setFormType(null);
  };
 
 
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // Edit an existing address
  const handleEditAddress = (address, index) => {
    // console.log('address, index ::::',{address, index})
    // return
    setFormData({
      user_id: userData._id || "",
      name: userData.name || "",
      email: userData.email || "",
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      type: address.type,
      Landmark:address.Landmark,
      index: index, // Store the index of the address being edited
      alternativename: address.alternativename,
      alternativeMobile: address.alternativeMobile,
      
    });
    setFormType("edit");
  };

  // Render the list of addresses
  const renderAddressList = () =>
    addresses.map((address, index) => (
      <div key={index} className="container my-5 p-4 border rounded shadow-sm bg-light">
         <div className="mb-1">
         
          <strong>Name:</strong> {address.alternativename}
        </div>
        <div className="mb-1">
        <strong>Mobile:</strong> {address.alternativeMobile}
        </div>
        <div className="mb-1">
          <strong>Address Line :</strong> {address.addressLine1}
        </div>
        <div className="mb-1">
          <strong>Landmark:</strong> {address.Landmark}
        </div>
       
        <div className="mb-1">
          <strong>Pincode:</strong> {address.pincode}
        </div>
       
        <div className="mb-1">
          <strong>City:</strong> {address.city}
        </div>
        <div className="mb-1">
          <strong>State:</strong> {address.state}
        </div>
        <div className="mb-1">
          <strong>Country:</strong> {address.country}
        </div>
        
       
        {/* <button className="stepbar-btn2 me-3" onClick={() => handleEditAddress(address, index)}>
          Edit Address  
        </button> */}
        <button type="button" class="btn btn-outline-success"  onClick={() => handleEditAddress(address, index)}>Edit Address </button>
      </div>
    ));

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
                  Landmark: officeNames[0] || "", // Set the first name as default
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
  const setUserFornData = (data)=>{
    console.log('::::::::setUserFornData:::::::::::',data)
    setFormType(data)
    setFormData((previousdata)=>({...previousdata,type:data}))
  }

  return (
    <div className="container my-5 p-4 border rounded shadow-sm bg-light">
      <ToastContainer />
      {formType && (
        <form onSubmit={handleFormSubmit} className="mt-5 p-0 p-md-4 ">
          <h4 className="mb-4">{formType === "edit" ? "Edit Address" : `Add ${formType} Address`}</h4>
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
                <div className="col-md-6 mb-3">
                  <select
                    name="Landmark"
                    className="form-control"
                    value={formData.Landmark}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        Landmark: e.target.value, // Update selected value in formData
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

          

       
              <button type="submit" className="stepbar-btn2">
            Save Address
          </button>
          <button type="button" className="stepbar-btn2 m-4" onClick={() => resetForm()}>
            Cancel
          </button>
        </form>
      )}

      {!formType && (

<div className="text-center">
  <button
    className="stepbar-btn2 me-3"
    onClick={() => setUserFornData("delivery")}
  
  >
    {hasDeliveryAddress ? "Delivery Address Added" : "+ Add Delivery Address"}
  </button>
  <button
    className="stepbar-btn2 ms-3"
    onClick={() => setUserFornData("Billing")}

  >
    {hasshippingAddress ? "Billing Address Added" : "+ Add Billing Address"}
  </button>
</div>

      )}
      
      
 


      <div className="mt-5">{renderAddressList()}

      </div>

    </div>
  );
};

export default CheckoutPage;
