import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import fruitsImg from "../../../assets/Home/posterhome.png";
import vegImg from "../../../assets/Home/poster1.png";

const PromoBanners = () => {
  return (
    <div className="container my-4">
      <div className="row g-3">
        
        {/* Vegetables Card */}
        <div className="col-12 col-md-6">
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{ height: "650px", overflow: "hidden" }}
          >
            <img
              src={vegImg}
              alt="Vegetables"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Fruits Card */}
        <div className="col-12 col-md-6">
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{ height: "650px", overflow: "hidden" }}
          >
            <img
              src={fruitsImg}
              alt="Fruits"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromoBanners;