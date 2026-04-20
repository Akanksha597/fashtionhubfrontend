import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../../../styles/Home/FarmBanner.css";

const FarmFreshness = () => {
  return (
    <Container fluid className="farm-freshness-banner px-0 d-flex align-items-center mt-5">
      <Row className="justify-content-start w-100 mx-0">
        <Col xs={12} md={10} lg={8} className="my-5 py-4 px-3 ps-md-5">
          <h1 className="display-3 display-md-2 display-lg-1 fw-bold text-white mb-0">Farm Freshness</h1>
          <h2 className="display-4 display-md-3 display-lg-2 fw-light text-white">
            at Your <span className="text-warning">Doorstep</span>
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmFreshness;