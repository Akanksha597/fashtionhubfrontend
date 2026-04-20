import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Deals/homedeals.css";
import ProductCard from "../../productcard";
import { fetchOfferProduct } from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

function TodaysOffer() {
  const dispatch = useDispatch();
  const { offerProducts, loading, error } = useSelector((state) => state.product);

  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(fetchOfferProduct({ offerZone: true }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
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

  // total number of dots
  const totalDots = Math.ceil((offerProducts?.length || 0) / itemsPerPage);

  const handleDotClick = (dotIndex) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollTo = dotIndex * containerWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });

      setActiveDot(dotIndex);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Today's Special Offers</h1>

      {error ? (
        <p className="text-center text-danger">{error}</p>
      ) : offerProducts && offerProducts.length > 0 ? (
        <>
          <div className="scroll-container" ref={scrollRef}>
            {offerProducts.map((product) => (
              <div className="product-item" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* dots navigation */}
          <div className="dots-container text-center mt-3">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <span
                key={idx}
                className={`dot ${activeDot === idx ? "active" : ""}`}
                onClick={() => handleDotClick(idx)}
              ></span>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">No trending products found.</p>
      )}
    </div>
  );
}

export default TodaysOffer;
