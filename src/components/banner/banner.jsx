import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './banner.css';
import banner1 from '../../assets/image/11 (1).png';
import banner2 from '../../assets/image/12.png';
import banner3 from '../../assets/image/posterimg1.png';
import banner4 from '../../assets/image/proimg2.png';

const Banner = () => {
  return (
  
    <div className="category-container" >
      <h1 style={{display:"flex" , justifyContent:"center"}}>EXCLUSIVE</h1>
      <Container fluid>
        <Row className="text-center g-3"> 
         
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center">
          <Link to="/product" className='product-banner'>
            <img src={banner2} alt="Banner 2" className="img-fluid" />
            </Link>
          </Col>
           <Col xs={12} sm={6} md={3} className="d-flex justify-content-center">
          <Link to="/product" className='product-banner'>
            <img src={banner1} alt="Banner 1" className="img-fluid" />
            </Link>
          </Col>
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center">
          <Link to="/product" className='product-banner'>
            <img src={banner3} alt="Banner 3" className="img-fluid" />
            </Link>
          </Col>
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center">
          <Link to="/product" className='product-banner'>
            <img src={banner4} alt="Banner 4" className="img-fluid" />
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;