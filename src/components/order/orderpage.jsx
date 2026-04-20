import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; 
import orderi from "../../assets/image/7 (1).png"; 
import "./orderpage.css"
import Footer from "../footer/Footer";
const OrderHistory = () => {
  const [orders, setOrders] = useState([
    {
      orderId: "#BH1139287",
      date: "30-09-2024",
      status: "Order Placed",
      total: "₹258.00",
      items: [
        {
          name: "Micro Star - 500 ml",
          vendor: "FMC",
          variant: "10 ml",
          quantity: 1,
          image: orderi, 
        },
      ],
    },
  ]);

  return (
    <>
    <div className="container my-5">
      <h2 className="mb-4">Order History</h2>
      {orders.map((order, index) => (
        <div key={index} className="border p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>
              Order Id: <span className="text-success">{order.orderId}</span>
            </h5>
            <button className="btn btn-outline-success btn-sm">
              {order.status}
            </button>
          </div>
          <p>
            <strong>Order placed on:</strong> {order.date}
          </p>
          <div className="d-flex align-items-center">
            <img
              src={order.items[0].image}
              alt={order.items[0].name}
              className="img-thumbnail"
              style={{ width: "80px", height: "80px" }}
            />
            <div className="ml-3">
              <h6>{order.items[0].name}</h6>
              <p>
                Vendor: {order.items[0].vendor} <br />
                Variant: {order.items[0].variant} <br />
                Quantity: {order.items[0].quantity}
              </p>
            </div>
            <div className="ml-auto">
              <h5>Total: {order.total}</h5>
            </div>
          </div>
          <div className="text-right mt-3">
            <Link to={`/orderdetails/${order.orderId}`}>
              <button className="order-button">View Order Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default OrderHistory;
