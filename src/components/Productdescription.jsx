import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Image, Table } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";

import Treding from "./homeTreding";
import ReviewPage from "./Review";
import Selling from "./homeselling";
import Footer from "./footer/Footer";
import { useCart } from "../context/CartContext";

import {
  fetchProductById,
  fetchProducts,
} from "../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import demoImage from "../../src/assets/image/demo.png";
import DOMPurify from "dompurify";
import "./Productdescription.css";
// import ReactImageMagnify from "react-image-magnify";
const ProductDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { cartItems, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [loadingButton, setLoadingButton] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
   const [selectedImage, setSelectedImage] = useState("");
  const { products, currentProduct, loading } = useSelector(
    (state) => state.product
  );
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

useEffect(() => {
  if (currentProduct) {
    setSelectedSize(currentProduct?.unitPricePairs?.[0]);

    const images = [
      currentProduct?.thumbnail,
      ...(currentProduct?.gallery || []),
    ].filter(Boolean);

    if (images.length > 0) {
      setSelectedImage(images[0]); // ✅ SET DEFAULT IMAGE
    }

    dispatch(
      fetchProducts({
        keyword: currentProduct?.productCategory?.name || "",
      })
    );
  }
}, [currentProduct, dispatch]);
  console.log("this is category wise product", products);
  const isAllVariationAvailable = (unitPricePairs) => {
    let flag = true;
    for (let i = 0; i < unitPricePairs?.length; i++) {
      let pair = unitPricePairs[i];
      if (pair.stock <= 0) {
        flag = false;
        break;
      }
    }
    setAvailable(flag);
    return flag;
  };

  const handleSizeChange = (size, index) => {
    setActiveIndex(index);
    setSelectedSize(size);
  };

  const calculatePercentageOff = (value) => {
    if (value?.lisedPrice) {
      return ((value.lisedPrice - value.price) / value.lisedPrice) * 100;
    }
    return null;
  };

  const savingsPercent = selectedSize?.lisedPrice
    ? (
        ((selectedSize.lisedPrice - selectedSize.price) /
          selectedSize.lisedPrice) *
        100
      ).toFixed(0)
    : null;

  const handleAddToCart = useCallback(() => {
    if (selectedSize && currentProduct) {
      setLoadingButton(currentProduct._id);
      const productWithSize = {
        _id: currentProduct._id,
        quantity: 1,
        name: currentProduct.productName,
        selectPunit: selectedSize.unit,
        selectPprice: selectedSize.price,
        gallery: currentProduct.thumbnail,
      };
      addToCart(productWithSize);

      setTimeout(() => setLoadingButton(null), 1000);
    }
  }, [currentProduct, selectedSize, addToCart]);

  const handleBuyNow = useCallback(() => {
    if (selectedSize && currentProduct) {
      setLoadingButton(currentProduct._id);
      const productWithSize = {
        _id: currentProduct._id,
        quantity: 1,
        name: currentProduct.productName,
        selectPunit: selectedSize.unit,
        selectPprice: selectedSize.price,
        gallery: currentProduct.thumbnail,
      };
      addToCart(productWithSize);
      navigation("/cart");
    }
  }, [currentProduct, selectedSize, addToCart]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          className="spinner-grow text-success"
          role="status"
          style={{ width: "5rem", height: "5rem" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  console.log("this is selected size", selectedSize);
  return (
    <>
      <Container className="product-description-page">
        <Row>
          {/* <Col md={6} className="text-center">
          <Image src={currentProduct?.thumbnail}
              alt={currentProduct?.productName} fluid className="mb-3" />
          
        </Col> */}
        <Col md={6}>
            <div className="image-section">

              {/* THUMBNAILS */}
              <div className="thumbnail-list">
                {[currentProduct?.thumbnail, ...(currentProduct?.gallery || [])]
                  .filter(Boolean)
                  .map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="thumb"
                      className={`thumbnail-img ${
                        selectedImage === img ? "active-thumb" : ""
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
              </div>

              {/* MAIN IMAGE */}
              <div className="main-image-container">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: currentProduct?.productName,
                      isFluidWidth: true,
                      src: selectedImage,
                    },
                    largeImage: {
                      src: selectedImage,
                      width: 1200,
                      height: 1200,
                    },
                  }}
                />
              </div>

            </div>
          </Col>

          {/* Right Section - Product Details */}
          <Col md={6}>
            <div className="d-flex justify-content-between align-items-center">
              <h4>{currentProduct?.productName}</h4>
              {/* <div>
                <FaRegHeart className="me-3" size={20} />
                <BsWhatsapp size={20} />
              </div> */}
            </div>
            <p className="text-muted">
              {" "}
              {currentProduct &&
              currentProduct?.productCategory &&
              currentProduct?.productCategory?.name
                ? currentProduct?.productCategory.name
                : ""}
            </p>
            <h5 className="fw-bold">
              Price: ₹
              {(selectedSize && selectedSize?.price) ||
                currentProduct?.unitPricePairs[0]?.price}{" "}
              {selectedSize?.lisedPrice && (
                <del className="text-muted"> ₹{selectedSize?.lisedPrice}</del>
              )}
              {savingsPercent && (
                <span className="text-danger">{savingsPercent}% OFF</span>
              )}
            </h5>

            <p className="text-primary">Inclusive of all taxes</p>

            {/* Variants */}

            <h6 className="mt-3">Variants</h6>
            <div
              className=" variant-container"
              style={{
                color: selectedSize?.stock > 0 ? "black" : "white",
              }}
              // Added className for styling
            >
              {currentProduct &&
                currentProduct?.unitPricePairs?.map((size, index) => {
                  const discountedPrice = calculatePercentageOff(size);
                  return (
                    <div
                      key={index}
                      className="variant-card m-2 p-2 border rounded"
                      style={{
                        width: "160px",
                        textAlign: "center",

                        border:
                          activeIndex === index
                            ? "2px solid green"
                            : "1px solid #ccc",
                        backgroundColor:
                          size.stock > 0
                            ? activeIndex === index
                              ? "#eaffea"
                              : "white"
                            : " #ccc",
                        cursor: size.stock > 0 ? "pointer" : "not-allowed",
                        // position: "relative",

                        flexShrink: 0, // Ensures the boxes do not shrink
                      }}
                      onClick={() => {
                        if (size.stock > 0) handleSizeChange(size, index);
                      }}
                    >
                      {discountedPrice && (
                        <div
                          className="offer-tag"
                          style={{
                            // position: "absolute",
                            marginTop: "-10px",
                            // transform: "translateX(-50%)",
                            backgroundColor: "#ff6800",
                            color: "white",
                            fontSize: "0.7rem",
                            padding: "3px 6px",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            width: "50%",
                          }}
                        >
                          {discountedPrice.toFixed(0)}% OFF
                        </div>
                      )}
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          marginBottom: "4px",
                        }}
                      >
                        {size.unit}
                      </div>
                      <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        ₹{size.price}
                      </div>
                      {size?.lisedPrice && (
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <s>₹{size?.lisedPrice}</s>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="payment-option" style={{ marginTop: "10px" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/34/34735.png"
                alt="Payment Option"
                style={{ width: "30px", height: "30px", marginRight: "5px" }}
              />
              <span>Online Payment Available</span>
            </div>

            {/* Additional Info */}
            <div className="additional-info mt-3">
              <p>
                <i
                  className="fas fa-map-marker-alt"
                  style={{ color: "green" }}
                ></i>{" "}
                Country of Origin India
              </p>
              <p>
                <i className="fas fa-lock icon " style={{ color: "green" }}></i>{" "}
                Secure Payments
              </p>
              <p>
                <i
                  className="fas fa-check-circle icon"
                  style={{ color: "green" }}
                ></i>{" "}
                In stock, Ready to Ship
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-3">
              <Button
                variant="warning"
                style={{
                  backgroundColor: available ? "" : "#ccc",
                  cursor: available ? "pointer" : "not-allowed",
                }}
                className="me-2 px-4"
                onClick={handleAddToCart}
                disabled={!available}
              >
                {/* {available} ? "Add to Cart" :"out of stock"    */}
                {available ? "Add to Cart" : "out of stock"}
              </Button>

            <Button
  variant="success"
  style={{
    backgroundColor: available ? "rgb(27, 94, 32)" : "#ccc",
    cursor: available ? "pointer" : "not-allowed",
    border: "none", // optional for cleaner look
  }}
  className="px-4"
  onClick={handleBuyNow}
  disabled={!available}
>
  {available ? "Buy Now" : "Out of Stock"}
</Button>

            </div>
          </Col>
        </Row>
        {/* Product Description */}
        <Container className="mt-4">
          {/* Product Description Section */}
          <Row>
            <Col>
              <div className="">
                <h2 className="fw-bold " style={{ textAlign: "left" }}>
                  Product Description
                </h2>
                <p
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      currentProduct?.description || ""
                    ),
                  }}
                ></p>
              </div>
            </Col>
          </Row>
          {/* Special Remark Section */}
          {/* <Row className="mt-4">
            <Col>
              <div className="">
                <h4 className="fw-bold">Special Remark:</h4>
                <Table bordered hover responsive className="mt-3">
                  <thead className="bg-light">
                    <tr>
                      <th>Crop Name</th>
                      <th>Common Name of Pest</th>
                      <th>Dosage per Acre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProduct?.tableData?.map((info, index) => (
                      <tr key={index}>
                        <td>{info.cropName}</td>
                        <td>{info.commonNameOfPest}</td>
                        <td>{info.dosagePerAcre}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p>
                  <strong>Pickup Address: </strong>Baramati, Taluka: Baramati
                </p>
                <p>
                  <strong>Manufacturer: </strong>Nagnath Agrotech Pvt Ltd
                </p>
              </div>
            </Col>
          </Row> */}
          {/* Image Section */}
    
          {/* Selling Section */}
        </Container>
      </Container>
      <div className="mb-5">
        <Selling products={products} />
      </div>

      <div className="mb-3"></div>
      {/* <div className="mb-3">
        <ReviewPage productId={currentProduct?._id} />
      </div> */}
      {/* <Footer /> */}
    </>
  );
};

export default ProductDescription;
