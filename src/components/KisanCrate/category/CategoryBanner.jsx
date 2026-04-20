import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../../../styles/Category/CategoryBanner.css";

const CategoryBanner = () => {
  return (
    <Container fluid className="farm-freshness-banner px-0 d-flex align-items-center">
      <Row className="justify-content-start w-100 mx-0">
        <Col xs={12} md={10} lg={8} className="my-5 py-4 px-3 ps-md-5">
          <h1 className="display-3 display-md-2 display-lg-1 fw-bold text-white mb-0">Fresh Vagetables</h1>
          <h2 className="display-4 display-md-3 display-lg-2 fw-light text-white">
              
              <span style={{fontSize:"48px", fontWeight:"700"}}>at</span>{' '}
              <span style={{fontSize:"84px", color:"#E87D03", fontWeight:"700"}}>Fresh</span>{' '}
              <span style={{fontSize:"84px",color:"#FFD630", fontWeight:"700"}}>Prices</span>
            
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryBanner