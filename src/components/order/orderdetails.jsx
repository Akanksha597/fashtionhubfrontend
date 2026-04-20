import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag } from "react-icons/fa"; 
import orderi from "../../assets/image/7 (1).png";
import "./OrderDetails.css"; 
import Footer from "../footer/Footer";

const OrderDetails = () => {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);


  useEffect(() => {
    const mockOrder = {
      orderId: "#BH1139287",
      date: "30-09-2024",
      status: "Unfulfilled",
      total: "258.00",
      shippingCharges: "70.00",
      shippingAddress: {
        name: "vaishnavi kshirsagar",
        addressLine1: "D.No: PG 12 - govinda villa, area",
        city: "Pune",
        district: "Haveli",
        state: "Maharashtra",
        zip: "412308",
      },
      items: [
        {
          name: "Micro Star - 10 ml",
          vendor: "FMC",
          variant: "10 ml",
          quantity: 1,
          image: orderi, 
        },
      ],
      paymentMethod: "Credit Card",
    };


    setOrder(mockOrder);
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }


  const subtotal = parseFloat(order.total);
  const shippingCharges = parseFloat(order.shippingCharges);
  const finalTotal = (subtotal + shippingCharges).toFixed(2); 

  return (
    <>
    <div className="container my-5">
      <h2 className=" order-color mb-4 ">Order Details</h2>
      <div className="card shadow-lg p-4 border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-dark">
            Order Id: <span className="text-success">{order.orderId}</span>
          </h5>
          <button className="btn btn-warning text-white btn-sm px-4">
            {order.status}
          </button>
        </div>
        <p className="text-muted mb-4">
          <strong>Order placed on:</strong> {order.date}
        </p>
        <div className="row mb-5">
          <div className="col-md-6">
            <h6 className="text-secondary">
              <FaMapMarkerAlt className="mr-2" /> Shipping Address
            </h6>
            <div className="border p-3 rounded bg-light">
              <p className="font-weight-bold mb-1">{order.shippingAddress.name}</p>
              <p className="m-0">{order.shippingAddress.addressLine1}</p>
              <p className="m-0">
                {order.shippingAddress.city}, {order.shippingAddress.district}
              </p>
              <p className="m-0">
                {order.shippingAddress.state}, {order.shippingAddress.zip}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="text-secondary">
              <FaCreditCard className="mr-2" /> Payment & Summary
            </h6>
            <div className="border p-3 rounded bg-light">
              <p className="m-0"><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p className="m-0"><strong>Sub Total:</strong> ₹{subtotal.toFixed(2)}</p>
              <p className="m-0"><strong>Shipping Charges:</strong> ₹{shippingCharges.toFixed(2)}</p>
              <h5 className="mt-3 text-dark"><strong>Total: ₹{finalTotal}</strong></h5>
            </div>
          </div>
        </div>

        <h6 className="mt-4 text-secondary">
          <FaShoppingBag className="mr-2" /> Order Items
        </h6>
        {order.items.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center mb-3 border-bottom pb-3 order-item-hover"
            style={{ transition: "background-color 0.3s" }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="img-thumbnail"
              style={{ width: "80px", height: "80px", borderRadius: "8px" }}
            />
            <div className="ml-3">
              <h6 className="font-weight-bold">{item.name}</h6>
              <p className="mb-0 text-muted">
                Vendor: {item.vendor} <br />
                Variant: {item.variant} <br />
                Quantity: {item.quantity}
              </p>
            </div>
            <div className="ml-auto">
              <h6 className="text-success font-weight-bold"> price:₹{subtotal.toFixed(2)}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OrderDetails;
