import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import Features from "../components/Features/Features";
import Selling from "./homeselling";
import { useCart } from "../context/CartContext";

import {
  fetchProductById,
  fetchProducts,
} from "../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";

import DOMPurify from "dompurify";
import "./Productdescription.css";

const ProductDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [available, setAvailable] = useState(true);

  const { products, currentProduct, loading } = useSelector(
    (state) => state.product
  );

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  /* ================= SET DEFAULT DATA ================= */
  useEffect(() => {
    if (currentProduct) {
      setSelectedSize(currentProduct?.unitPricePairs?.[0]);

      const images = [
        currentProduct?.thumbnail,
        ...(currentProduct?.gallery || []),
      ].filter(Boolean);

      if (images.length > 0) setSelectedImage(images[0]);

      dispatch(
        fetchProducts({
          keyword: currentProduct?.productCategory?.name || "",
        })
      );

      // availability check
      const isAvailable = currentProduct?.unitPricePairs?.some(
        (p) => p.stock > 0
      );
      setAvailable(isAvailable);
    }
  }, [currentProduct, dispatch]);

  /* ================= HANDLERS ================= */
  const handleSizeChange = (size, index) => {
    if (size.stock > 0) {
      setSelectedSize(size);
      setActiveIndex(index);
    }
  };

  const handleAddToCart = useCallback(() => {
    if (!selectedSize || !currentProduct) return;

    addToCart({
      _id: currentProduct._id,
      quantity: 1,
      name: currentProduct.productName,
      selectPunit: selectedSize.unit,
      selectPprice: selectedSize.price,
      gallery: selectedImage,
    });
  }, [currentProduct, selectedSize, selectedImage, addToCart]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    navigate("/cart");
  }, [handleAddToCart, navigate]);

  const savingsPercent = selectedSize?.lisedPrice
    ? (
        ((selectedSize.lisedPrice - selectedSize.price) /
          selectedSize.lisedPrice) *
        100
      ).toFixed(0)
    : null;

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="loader">
        <div className="spinner-grow text-success"></div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <Container className="product-page py-5">
        <Row>
          {/* IMAGE SECTION */}
          <Col md={6}>
            <div className="image-section">
              <div className="thumbnail-list">
                {[currentProduct?.thumbnail, ...(currentProduct?.gallery || [])]
                  .filter(Boolean)
                  .map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className={`thumb ${
                        selectedImage === img ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
              </div>

              <div className="main-image">
                {selectedImage && (
                  <InnerImageZoom
                    src={selectedImage}
                    zoomSrc={selectedImage}
                    zoomScale={1.5}
                  />
                )}
              </div>
            </div>
          </Col>

          {/* DETAILS */}
          <Col md={6}>
            <h4>{currentProduct?.productName}</h4>
            <p className="text-muted">
              {currentProduct?.productCategory?.name}
            </p>

            <h5 className="price">
              ₹{selectedSize?.price}
              {selectedSize?.lisedPrice && (
                <del> ₹{selectedSize.lisedPrice}</del>
              )}
              {savingsPercent && (
                <span className="discount">{savingsPercent}% OFF</span>
              )}
            </h5>

            <p className="tax">Inclusive of all taxes</p>

            {/* VARIANTS */}
            <h6>Variants</h6>
            <div className="variants">
              {currentProduct?.unitPricePairs?.map((size, i) => (
                <div
                  key={i}
                  className={`variant ${
                    activeIndex === i ? "active" : ""
                  } ${size.stock <= 0 ? "disabled" : ""}`}
                  onClick={() => handleSizeChange(size, i)}
                >
                  <div>{size.unit}</div>
                  <div>₹{size.price}</div>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="btns">
              <Button
                variant="warning"
                onClick={handleAddToCart}
                disabled={!available}
              >
                {available ? "Add to Cart" : "Out of Stock"}
              </Button>

              <Button
                variant="success"
                onClick={handleBuyNow}
                disabled={!available}
              >
                Buy Now
              </Button>
            </div>
              <h4 className="mt-4">Product Description</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  currentProduct?.description || ""
                ),
              }}
            />
              <Features/>
          </Col>
        
        </Row>

        {/* DESCRIPTION */}
       
      </Container>

      <Selling products={products} />
    </>
  );
};

export default ProductDescription;