import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './campaign.css';
import campaignBanner1 from '../../assets/image/campaignoffer3.png';
import campaignBanner from '../../assets/image/campoffer.png';
import campaignBanner2 from '../../assets/image/campoffer2.png';
import Footer from '../footer/Footer';
import { Carousel } from 'react-bootstrap';


const CampaignCard = ({ offer }) => {
  const navigate = useNavigate();


  const handleViewProductsClick = () => {
    navigate(`/campaigns/${offer.festival}`); 
  };

  
  const calculate24HourTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeLeft = midnight - now;

    return {
      hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeLeft / 1000 / 60) % 60),
      seconds: Math.floor((timeLeft / 1000) % 60),
    };
  };


  const calculateDaysLeft = () => {
    const now = new Date();
    const festivalEndDate = new Date(offer.endDate);
    const difference = festivalEndDate - now;
    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const [timeLeft, setTimeLeft] = useState(calculate24HourTimeLeft());
  const [daysLeft, setDaysLeft] = useState(calculateDaysLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculate24HourTimeLeft());
      setDaysLeft(calculateDaysLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="campaign-card">
      <h3>{offer.title}</h3>
      <div className="countdown-days">
        {daysLeft > 0 ? <div>{daysLeft} <span>Days</span></div> : <div>Offer Ended</div>}
      </div>
      <div className="countdown-timer">
        {daysLeft > 0 && (
          <>
            <div>{timeLeft.hours || '0'} <span>Hours</span></div>
            <div>{timeLeft.minutes || '0'} <span>Min</span></div>
            <div>{timeLeft.seconds || '0'} <span>Sec</span></div>
          </>
        )}
      </div>
      {daysLeft > 0 && (
        <button className="view-products-btn" onClick={handleViewProductsClick}>
          View Products
        </button>
      )}
    </div>
  );
};


const Campaign = () => {
  const [selectedFestival, setSelectedFestival] = useState('All');


  const festivalOffers = [
    { title: 'Diwali special offer', endDate: '2024-11-15', festival: 'Diwali' },
    { title: 'Christmas special offer', endDate: '2024-12-25', festival: 'Christmas' },
  ];


  const filteredOffers = selectedFestival === 'All'
    ? festivalOffers
    : festivalOffers.filter(offer => offer.festival === selectedFestival);

  return (
    <div>

      <Carousel indicators={false} controls={false}>
        <Carousel.Item>
          <div className="container-ouvercompay" style={{ backgroundImage: `url(${campaignBanner})` }} />
        </Carousel.Item>
        <Carousel.Item>
          <div className="container-ouvercompay" style={{ backgroundImage: `url(${campaignBanner1})` }} />
        </Carousel.Item>
        <Carousel.Item>
          <div className="container-ouvercompay" style={{ backgroundImage: `url(${campaignBanner2})` }} />
        </Carousel.Item>
      </Carousel>


     
      <div className="campaign-container">
        {filteredOffers.map((offer, index) => (
          <CampaignCard key={index} offer={offer} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Campaign;
