




import React from 'react';
import { Carousel } from 'react-bootstrap';
import ban1 from '../../../assets/Home/homebanner3.png';
import ban2 from '../../../assets/Home/homepagebanner4.png';
// import ban3 from '../../assets/image/slideimg3.png';
import { Link } from 'react-router-dom';
 
// import './banner2.css'; 

const FreshFruitBanner= () => {
  return (
    <div className ="mb-5" >
      <Carousel indicators={false} controls={false} interval={2000}>
        <Carousel.Item>
        <Link to="/product" >
          <img
            className="d-block  banner-imageban"
            src={ban1}
            alt="First slide"
          />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
        <Link to="/product" >
          <img
            className="d-block  banner-imageban"
            src={ban2}
            alt="Second slide"
          />
          </Link>
        </Carousel.Item>
        {/* <Carousel.Item>
        <Link to="/product" >
          <img
            className="d-block  banner-imageban"
            src={ban3}
            alt="Third slide"
          />
          </Link>
        </Carousel.Item> */}
        
      </Carousel>
    </div>
  );
};

export default FreshFruitBanner;