import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../homeTreding.css";
import ProductCard from "../productcard";
import { fetchOfferProduct } from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

function HomeDeals() {
  const dispatch = useDispatch();
  const [limit] = useState(3); // Display limit

  const { offerProducts, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchOfferProduct({ offerZone: true }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-grow text-success" role="status" style={{ width: "5rem", height: "5rem" }}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="text-center">TODAY'S OFFERS</h1>

      {error ? (
        <p className="text-center text-danger">{error}</p>
      ) : offerProducts && offerProducts.length > 0 ? (
        <div className="scroll-container">
          {offerProducts.map((product) => (
            <div className="product-item" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No trending products found.</p>
      )}
    </div>
  );
}

export default HomeDeals;
