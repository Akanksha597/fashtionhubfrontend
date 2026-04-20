import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import aboutBanner from "../../assets/About/banner.png";

const AboutBanner = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      fluid
      className="px-0 d-flex align-items-center"
      style={{
        backgroundImage: `url(${aboutBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: isLargeScreen ? "300px" : "150px", // ✅ height only on lg+
      }}
    >
      <Row className="justify-content-start w-100 mx-0">
        <Col xs={12} md={10} lg={8} className="p-4">
          <h1
            style={{
              fontWeight: "700",
              color: "#275813ff",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              marginLeft: "2.5rem",
            }}
          >
           About Us
          </h1>
          {/* <h2
            style={{
              fontWeight: "300",
              color: "#fff",
              fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
            }}
          >
            at Your <span style={{ color: "#ffc107" }}>Doorstep</span>
          </h2> */}
        </Col>
      </Row>
    </Container>
  );
};

export default AboutBanner;
