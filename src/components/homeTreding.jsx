import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homeTreding.css";
import ProductCard from "./productcard";
import { fetchProducts } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

function Treding() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ keyword: search, status, page, limit }));
  }, [dispatch, search, status, page]);

  // Number of dots (e.g. every 3 items = 1 "page")
  const itemsPerPage = 3;
  const totalDots = Math.ceil((products?.length || 0) / itemsPerPage);

  // Handle dot click
  const handleDotClick = (dotIndex) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const containerWidth = scrollRef.current.clientWidth;
      const maxScrollLeft = scrollWidth - containerWidth;

      const scrollTo =
        (dotIndex / (totalDots - 1)) * maxScrollLeft || 0;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });

      setActiveDot(dotIndex);
    }
  };

  return (
    <div className="topt-container">
      <h1 className="center-heading text-center">TRENDING PRODUCTS</h1>

      {/* Scrollable product list */}
      <div className="scroll-container" ref={scrollRef}>
        {products &&
          products.map((product) => (
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
    </div>
  );
}

export default Treding;
