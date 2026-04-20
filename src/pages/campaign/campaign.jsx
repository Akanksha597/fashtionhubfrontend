import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../../components/productcard'; 
import { product } from '../../data/product'; 
import './campaign.css';  
import campaignBanner1 from '../../assets/image/campaignoffer3.png'; 
import campaignBanner from '../../assets/image/campoffer.png';
import campaignBanner2 from '../../assets/image/campoffer2.png';
import { Carousel } from 'react-bootstrap';
import Footer from '../../components/footer/Footer';

const CampaignPage = () => {
  const { festival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(festival);

 
  const festivalEndDates = {
    Diwali: '2024-11-15T00:00:00',
    Christmas: '2025-12-25T00:00:00',
  };

  const endDate = new Date(festivalEndDates[selectedFestival]);


  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = endDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);


    return () => clearInterval(timer);
  }, [endDate]);

  useEffect(() => {
    setSelectedFestival(festival);
  }, [festival]);

  const campaignProducts = product.filter(p => p.campaigns.includes(selectedFestival));

  return (
    <>
      <div>
    
        <Carousel indicators={false} controls={false} interval={2000}>
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

 
        <div className="text-center my-4">
          <h1>{selectedFestival} Offer 2024</h1>
          <div className="countdown">
            {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
              <span>
                {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Min {timeLeft.seconds} Sec
              </span>
            ) : (
              <span>Offer Ended</span>
            )}
          </div>
        </div>


        <Container className="py-5">
          <Row className="justify-content-center">
            {campaignProducts.length > 0 ? (
              campaignProducts.map(p => (
                <Col xs={12} sm={6} md={4} lg={3} key={p.id} className="mb-4 text-center">
                  <ProductCard product={p} />
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>No products available for the selected campaign.</p>
              </Col>
            )}
          </Row>
        </Container>
        
      </div>


      <Footer />
    </>
  );
};

export default CampaignPage;
