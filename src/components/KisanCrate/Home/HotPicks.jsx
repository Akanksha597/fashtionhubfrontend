import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../components/homeTreding.css";
import ProductCard from "../../../components/productcard";
import { fetchProducts } from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

function HotPicks() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [activeDot, setActiveDot] = useState(0);
  const itemsPerPage = 4; // products shown per "page" in the scroll

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ keyword: search, status, page, limit }));
  }, [dispatch, search, status, page, limit]);

  // total number of dots
  const totalDots = Math.ceil((products?.length || 0) / itemsPerPage);

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
    <div className="container">
      <h1 className="center-heading text-center">Shop By Trends</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : products && products.length > 0 ? (
        <>
          <div className="scroll-container" ref={scrollRef}>
            {products.map((product) => (
              <div className="product-item" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Dots navigation */}
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
        <p className="text-center">No products found.</p>
      )}
    </div>
  );
}

export default HotPicks;
