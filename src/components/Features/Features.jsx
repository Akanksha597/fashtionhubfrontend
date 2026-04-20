// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaShippingFast, FaExchangeAlt, FaCreditCard, FaHeadset, FaTruck } from "react-icons/fa";
// import './Features.css';

// const FeatureBox = ({ icon, title, description }) => {
//   return (
//     <Col xs={12} sm={6} md={4} lg={2} className="feature-box">
//       <div className="icon-container">{icon}</div>
//       <h6 className="fw-bold mt-2">{title}</h6>
//       <p className="text-muted">{description}</p>
//     </Col>
//   );
// };
  
// const Features = () => {
//   return (
//     <div className="features-container  justify-content-center text-center ">
//        <div className="scroll-container justify-content-center text-center ">
//       <Row className="justify-content-center text-center feature-row">
//         <FeatureBox icon={<FaTruck />} title="Free Delivery*" description="On all orders above ₹500" />
//         <FeatureBox icon={<FaShippingFast />} title="6-7 Days Shipping*" description="Delivering across Maharashtra" />
//         <FeatureBox icon={<FaExchangeAlt />} title="Easy Returns" description="For damaged or quality issues" />
//         <FeatureBox icon={<FaCreditCard />} title="All Payment Modes" description="Cards, UPI, Net Banking, COD" />
//         <FeatureBox icon={<FaHeadset />} title="Customer Support" description="7am to 10pm, Mon-Sat" />
//       </Row>
//     </div>
//     </div>
//   );
// };

// export default Features;



import React from "react";
import { FaPercent, FaUndoAlt, FaTruck } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import './Features.css';

export default function InfoBar() {
  const items = [
    
    { icon: <FaUndoAlt />, title: "Return Policy", sub: "Dedicated support" },
    { icon: <FaTruck />, title: "Free Delivery", sub: "For all order above 100" },
    { icon: <RiSecurePaymentLine />, title: "Secure Payment", sub: "100% secure payment" }
  ];

  return (
<div className="infobar-container my-4">
  <div className="infobar-scroll">
    {items.map((item, index) => (
      <div
        key={index}
        className="d-flex align-items-center infobar-item"
      >
        <div className="infobar-icon">{item.icon}</div>
        <div>
          <h6 className="infobar-title">{item.title}</h6>
          <p className="infobar-sub">{item.sub}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

