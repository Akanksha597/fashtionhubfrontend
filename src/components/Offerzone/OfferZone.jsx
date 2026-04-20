import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchOfferProduct } from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OfferCard from "../Offercard/Offercard"


const OfferZone = () => {
  const dispatch = useDispatch();

  const { offerProducts, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchOfferProduct({ offerZone: true }));
  }, [dispatch]);

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
  return (
    <div className="container my-4">
      {/* <h2 className="text-center">Top Deals</h2>
      <p className="text-center">9 Items</p> */}
      <div className="row g-4">
        {offerProducts && offerProducts.length > 0 ? (
          offerProducts.map((p) => (
            <div
              className="col-sm-6 col-md-3 mb-3"
              style={{ display: "flex", justifyContent: "center" }}
              key={p.id}
            >
              <OfferCard product={p} />
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default OfferZone;
