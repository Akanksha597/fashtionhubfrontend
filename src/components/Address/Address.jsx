import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../footer/Footer';
import './Address.css'; 

function AddAddress() {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    mobileNumber: '',
    flatNo: '',
    addressLine: '',
  });
  const [savedAddresses, setSavedAddresses] = useState([]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };
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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedAddresses([...savedAddresses, address]);
    setShowModal(false);  
    
    setAddress({
      fullName: '',
      mobileNumber: '',
      flatNo: '',
      addressLine: '',
    });
  };

  
  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const exampleAddress = `Lat: ${latitude}, Lon: ${longitude}`; 
        setAddress({
          ...address,
          addressLine: exampleAddress,
        });
      }, (error) => {
        console.error("Error fetching location:", error);
        alert("Unable to retrieve location.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const renderAddressList = (add) => {
    if (add && Object.keys(add).length > 0) {
      const latestAddress = add // Get the last address
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
  

  return (
    <>
      <div className="container my-4 address-container">
        <h2 className="text-center">My Addresses</h2>
        <div className="text-center">
          <button
            className="btn add-address-btn"
            onClick={() => setShowModal(true)}
          >
            Add New Address
          </button>
        </div>


        {savedAddresses.length > 0 && savedAddresses.map((addr, index) => (
          <div className="saved-address card mt-4" key={index}>
            <div className="card-body">
              <h5 className="card-title">Saved Address {index + 1}</h5>
              <p><strong>Full Name:</strong> {addr.fullName}</p>
              <p><strong>Mobile Number:</strong> {addr.mobileNumber}</p>
              <p><strong>Flat/House No (if any):</strong> {addr.flatNo}</p>
              <p><strong>Street/Area/Colony/Village:</strong> {addr.addressLine}</p>
            </div>
          </div>
        ))}


        {showModal && (
          <div className="modal show custom-modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Address</h5>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="mobileNumber"
                        value={address.mobileNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Flat/House No (if any)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="flatNo"
                        value={address.flatNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Street/Area/Colony/Village</label>
                      <input
                        type="text"
                        className="form-control"
                        name="addressLine"
                        value={address.addressLine}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AddAddress;
