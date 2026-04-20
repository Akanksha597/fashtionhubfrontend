import React from "react";
import { BsBoxSeam, BsTruck } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Button } from "react-bootstrap";
import moment from "moment";
import "./ordertracking.css";
const OrderTracking = ({ order, handleShowModal }) => {
  const steps = [
    { key: "ORDERED", label: "Ordered", icon: <BsBoxSeam /> },
    { key: "SHIPPED", label: "Shipped", icon: <BsTruck /> },
    { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: <BsTruck /> },
    { key: "DELIVERED", label: "Delivered", icon: <FaHome /> },
  ];

  const currentStep = steps.findIndex(s => s.key === order.orderStatus);

  const createdAt = moment(order.createdAt);
  const estimatedDelivery = createdAt.clone().add(7, "days");

  // ✅ Dynamic Dates (important)
  const statusDates = {
    ORDERED: createdAt.format("DD MMM"),
    SHIPPED: createdAt.clone().add(1, "days").format("DD MMM"),
    OUT_FOR_DELIVERY: createdAt.clone().add(5, "days").format("DD MMM"),
    DELIVERED: estimatedDelivery.format("DD MMM"),
  };

  return (
    <div className="tracking-card premium glass">

      {/* Header */}
      <div className="tracking-header">
        <h6>{order.orderStatus.replaceAll("_", " ")}</h6>
        <p>Estimated Delivery: {estimatedDelivery.format("DD MMM YYYY")}</p>
      </div>

      {/* Animated Progress */}
      <div className="progress premium-bar">
        <div
          className="progress-bar animated-bar"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`
          }}
        />
      </div>

      {/* Steps */}
      <div className="tracking-steps-premium">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;

          return (
            <div className="step-premium" key={step.key}>
              
              <div className={`icon-box ${isActive ? "active pulse" : ""}`}>
                {step.icon}
              </div>

              <span className={isActive ? "active-text" : ""}>
                {step.label}
              </span>

              {/* ✅ DATE ADDED */}
              <small className="step-date">
                {statusDates[step.key]}
              </small>
            </div>
          );
        })}
      </div>

      {/* Button */}
      <Button
        variant="outline-danger"
        size="sm"
        className="mt-3 "
        onClick={() => handleShowModal(order)}
        disabled={order.orderStatus === "DELIVERED"}
      >
        Cancel Order
      </Button>
    </div>
  );
};

export default OrderTracking;