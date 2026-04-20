import React from "react";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const Orderstatus = () => {
  return (
    <Container className="p-3">
      <Row className="">
        {/* Order Summary */}
        <Col md={12} className="mb-3">
        
          <h6 className="fw-bold">Order Details</h6>
          <div className="d-flex align-items-center">
            <img
              src="https://via.placeholder.com/80" // Placeholder image
              alt="Product"
              className="me-3 rounded"
            />
            <div>
              <p className="mb-1 fw-bold">SHIVANSH Formal Regular Sleeve...</p>
              <p className="text-muted mb-1">XS • Cash ₹171</p>
              <p className="text-muted">All Returns</p>
            </div>
          </div>
        </Col>

        {/* Order Status */}
        <Col md={12} className="mb-3">
     
            
        {/* Order Status */}
        <Col md={12} className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <BsBox size={24} className="me-2 text-warning" />
            <div>
              <h6 className="fw-bold mb-0">Order Placed</h6>
              <p className="text-muted mb-0">Delivery by Wed, 12 Feb</p>
            </div>
          </div>
          <div className="position-relative mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <FaCheckCircle className="text-success" />
              <IoMdCheckmarkCircleOutline className="text-secondary" />
              <IoMdCheckmarkCircleOutline className="text-secondary" />
              <IoMdCheckmarkCircleOutline className="text-secondary" />
            </div>
            <div className="progress mt-1" style={{ height: "6px" }}>
              <div className="progress-bar bg-primary" style={{ width: "30%" }}></div>
            </div>
            <div className="position-absolute top-0 start-0 translate-middle" style={{ left: "30%" }}>
              <span className="badge bg-dark text-white p-2 rounded-pill shadow-sm">Shipping Soon!</span>
            </div>
          </div>
          <div className="d-flex justify-content-between text-muted small">
            <div className="text-success d-flex flex-column align-items-center">
              <FaCheckCircle className="mb-1" /> Ordered
              <br /> 04 Feb
            </div>
            <div className="d-flex flex-column align-items-center">
              <IoMdCheckmarkCircleOutline className="mb-1 text-secondary" /> Shipped
              <br /> 05 Feb
            </div>
            <div className="d-flex flex-column align-items-center">
              <IoMdCheckmarkCircleOutline className="mb-1 text-secondary" /> Out for Delivery
              <br /> 12 Feb
            </div>
            <div className="d-flex flex-column align-items-center">
              <IoMdCheckmarkCircleOutline className="mb-1 text-secondary" /> Delivery
              <br /> 12 Feb
            </div>
          </div>
          <Button variant="outline-danger" className="mt-3" size="sm">
            Cancel Order
          </Button>
        </Col>
 

        </Col>

        {/* Delivery Address */}
        <Col md={12} className="mb-3">
          <h6 className="fw-bold">Delivery Address</h6>
          <p className="text-muted mb-1">Akanksha CHAUnd</p>
          <p className="text-muted mb-1">
            avishkar bldg, bhekari nagar hp petrol pump saswad road,
            Bhekari school, Pune, Maharashtra, 412308
          </p>
          <p className="text-muted">8767810486</p>
          <Button variant="outline-primary" size="sm">Change</Button>
        </Col>

        {/* Price Details */}
        <Col md={12} className="border-top pt-3">
          <div className="d-flex justify-content-between fw-bold">
            <span>Total Product Price</span>
            <span>₹171</span>
          </div>
          <Button variant="link" className="p-0">View Bill</Button>
          <div className="d-flex justify-content-between fw-bold mt-2">
            <span>Cash On Delivery</span>
            <span>₹171</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Orderstatus;
