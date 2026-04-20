import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./coupen.css"; 
import couponBanner from '../../assets/image/coupen.png';
import Footer from "../footer/Footer";
import Selling from "../homeselling";
const CouponCard = ({ discount, code, days, hours, minutes, seconds }) => {
  const [time, setTime] = useState({
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });

  const [showNotification, setShowNotification] = useState(false); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (time.seconds > 0) {
        setTime((prevTime) => ({
          ...prevTime,
          seconds: prevTime.seconds - 1,
        }));
      } else if (time.minutes > 0) {
        setTime((prevTime) => ({
          ...prevTime,
          minutes: prevTime.minutes - 1,
          seconds: 59,
        }));
      } else if (time.hours > 0) {
        setTime((prevTime) => ({
          ...prevTime,
          hours: prevTime.hours - 1,
          minutes: 59,
          seconds: 59,
        }));
      } else if (time.days > 0) {
        setTime((prevTime) => ({
          ...prevTime,
          days: prevTime.days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59,
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setShowNotification(true); 
      setTimeout(() => setShowNotification(false), 2000); 
    });
  };

  return (

    <div className="card m-3 shadow coupen-card" style={{ width: "24rem" }}>
      <div className="card-body">
        <h5 className="card-title" style={{ color: 'white' }}>Up to {discount}% OFF</h5>
        <p className="card-text" style={{ color: 'white' }}>Use the code to get your discount:</p>
        <div className="d-flex justify-content-between">
          <span className="badge bg-secondary m-2 ">{code}</span>
          <button className="btn btn-primary" onClick={handleCopyCode} style={{ color: 'white', backgroundColor: '#ff6600', border: 'orange', height: '40px' }}>Copy Code</button>
        </div>
        <div className="countdown mt-3">
          <h6>Offer Expires In:</h6>
          <div className="d-flex justify-content-between offer-div">
            <span className="badge bg-dark" style={{ width: "64px", height: "26px" }}>{time.days} Days</span>
            <span className="badge bg-dark">{time.hours} Hours</span>
            <span className="badge bg-dark">{time.minutes} Min</span>
            <span className="badge bg-dark">{time.seconds} Sec</span>
          </div>
        </div>
        {showNotification && (
          <div className="alert alert-success mt-3">
            Code copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

const Coupons = () => {
  const couponsData = [
    {
      discount: 10,
      code: "GST10006",
      days: 15,
      hours: 19,
      minutes: 12,
      seconds: 30,
    },
    {
      discount: 15,
      code: "GTS45682",
      days: 15,
      hours: 19,
      minutes: 12,
      seconds: 30,
    },
  ];

  return (
    <>
      <div>

        <div className="container-ouvercompay" style={{ backgroundImage: `url(${couponBanner})` }}>

        </div>


        <div className="container d-flex justify-content-around flex-wrap mt-2">
          {couponsData.map((coupon, index) => (
            <CouponCard key={index} {...coupon} />
          ))}
        </div>
      </div>
      <Selling>
        
      </Selling>
      <Footer></Footer>
    </>
  );
};

export default Coupons;
