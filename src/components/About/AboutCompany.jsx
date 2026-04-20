import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import image1 from "../../assets/About/img1.png";
import image2 from "../../assets/About/img2.png";
import image3 from "../../assets/About/img3.png";
import store from "../../assets/About/store.png";

const AboutCompanySection = () => {
  return (
    <section className="mt-4">
      <div className="container">
        {/* Make row flex with stretch */}
        <div className="row d-flex align-items-stretch">
          {/* LEFT IMAGES */}
          <div className="col-lg-6 position-relative mb-4 mb-lg-0 d-flex">
            <div className="d-flex gap-3 align-items-stretch w-100">
              {/* Left tall image */}
              <div className="w-50">
                <img
                  src={image1}
                  alt="plant"
                  className="img-fluid rounded shadow w-100 h-100"
                  style={{
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </div>

              {/* Right stacked images */}
              <div className="d-flex flex-column gap-3 w-50">
                <img
                  src={image2}
                  alt="tomatoes"
                  className="img-fluid rounded shadow w-100 h-100"
                  style={{
                    objectFit: "cover",
                    borderRadius: "12px",
                    flex: 1,
                  }}
                />
                <img
                  src={image3}
                  alt="farmer"
                  className="img-fluid rounded shadow w-100 h-100"
                  style={{
                    objectFit: "cover",
                    borderRadius: "12px",
                    flex: 1,
                  }}
                />
              </div>
            </div>

            {/* Badge with text */}
            <div
              className="position-absolute d-flex align-items-center justify-content-center"
              style={{
                bottom: "10%",
                left: "35%",
                transform: "translate(-50%, 50%)",
                width: "150px",
                height: "150px",
              }}
            >
              <div className="position-relative w-100 h-100">
                <img
                  src={store}
                  alt="15+ Stores"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "contain" }}
                />
                <div
                  className="position-absolute top-50 start-50 translate-middle text-center"
                  style={{ lineHeight: "1.2" }}
                >
                  <div style={{ color: "#084220", fontSize: "32px", fontWeight: "bold" }}>
                    15+
                  </div>
                  <div style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
                    Stores
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT TEXT (full height match with images) */}
          <div className="col-lg-6 d-flex mt-4">
            <div className="d-flex flex-column justify-content-center h-100">
              <p className="text-warning fw-semibold mb-1">About Our Company</p>
              <h2
                className="fw-bold mb-3"
                style={{ fontSize: "clamp(2.0rem, 3vw, 3.0rem)" }}
              >
                Making Fruits & Vegetables Healthy Again!
              </h2>
              <p className="">
                Kisan Crate is our smart solution for delivering farm-fresh fruits
                and vegetables with maximum hygiene and minimal handling. Sourced
                directly from farms, the produce is carefully packed in clean,
                food-grade crates to prevent damage, contamination, and spoilage
                during transport. Unlike traditional supply chains, Kisan Crate
                ensures that your produce remains untouched, unsplashed, and
                naturally fresh — all the way from the farm to your store or
                kitchen.
              </p>

              <p className="">
                To make your shopping experience even better, each product in the
                crate is labeled with freshness icons, helping you easily choose
                the ripeness and quality that suits your needs. It’s a step
                towards safer, cleaner, and more informed choices for your daily
                produce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;
