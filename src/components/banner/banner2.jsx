import React from 'react';
import { Carousel } from 'react-bootstrap';
import ban1 from '../../assets/Home/homesecondbanner.png';

import { Link } from 'react-router-dom';
 
import './banner2.css'; 

const Banner2= () => {
  return (
    <div className='mb-3' >
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
        {/* <Carousel.Item>
        <Link to="/product" >
          <img
            className="d-block  banner-imageban"
            src={ban2}
            alt="Second slide"
          />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
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

export default Banner2;