import React from "react";
import { Image, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./homeproduct.css";
import productImage from "../assets/image/1.png";
import productImage2 from "../assets/image/6.png";
import productImage3 from "../assets/image/22.png";



function Homeproduct() {
  const products = [
    {
      id: 1,
      title: "Micro Star",
      weight: '1kg',
      price: "₹ 200",
      image: productImage,
      link: "/product"
    },
    {
      id: 2,
      title: "Fulvi Star",
      weight: '1kg',
      price: "₹ 200",
      image: productImage2,
      link: "/product"
    },
    {
      id: 3,
      title: "Magic Star",
      weight: '1kg',
      price: "₹ 200",
      image: productImage3,
      link: "/product"
    },
    {
      id: 1,
      title: "Micro Star",
      weight: '1kg',
      price: "₹ 200",
      image: productImage,
      link: "/product"
    },
    {
      id: 2,
      title: "Fulvi Star",
      weight: '1kg',
      price: "₹ 200",
      image: productImage2,
      link: "/product"
    },
    {
      id: 3,
      title: "Magic Star",
      weight: '1kg',
      price: "₹ 200",
      image: productImage3,
      link: "/product"
     }
   
  ];

  return (
    <Container fluid className="homeproduct-full-page-background ">
      <h1 className="homeproduct-title mb-5">Our Featured Products</h1>
      <Row className="justify-content-center">
        <Col lg={4} md={10} className="homeproduct-product-column">
          {products.map((product) => (
            <Row className="homeproduct-product-card " key={product.id}>
              <Col lg={5} className="homepro d-flex align-item-center justify-content-center">
                <Image src={product.image} className="homeproduct-product-image" />
              </Col>
              <Col className="homeproduct-product-details p-3">
                <h2 className="homeproduct-product-title">{product.title}</h2>
                <p className="homeproduct-product-price mb-o">{product.weight}</p>
                <p className="homeproduct-product-price mb-o">{product.price}</p>
                <Link to={product.link} className="homeproduct-product-link">
                
                  <button className="add-to-button">Add to Cart</button>

                </Link>
              </Col>
            </Row>
          ))}
        </Col>
        <Col lg={6} md={12} className="homeproduct-poster-column">
          <div className="homeproduct-poster-card">
            <Image src={posterImage} className="homeproduct-poster-image" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Homeproduct;
