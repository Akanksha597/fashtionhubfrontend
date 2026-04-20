import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Replace with actual icon paths
import icon1 from "../../assets/About/seed.png";
import icon2 from "../../assets/About/plant.png";
import icon3 from "../../assets/About/returnbox.png";
import icon4 from "../../assets/About/money.png";

const WhyChooseUs = () => {
  const features = [
    { icon: icon1, title: "Staright from the Farm" },
    { icon: icon2, title: "Everything Fresh, All in One Basket" },
    { icon: icon3, title: "Only the Best, or It's Returned" },
    { icon: icon4, title: "Value You Can Count On" },
  ];

  return (
    <section className=" container text-center bg-white">
      <p className="text-warning fw-semibold mb-1" style={{ fontSize: "14px" }}>
        Why choose us ?
      </p>
      <h2 className="fw-bold mb-4">Fresh Thinking with KisanCrate</h2>
      <div className="container">
        <div className="row justify-content-center">
          {features.map((feature, index) => (
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4" key={index} style={{height: "240px",
                width: "280px",  borderTopLeftRadius: "20px",
                borderBottomRightRadius: "20px",}}>
              <div
                className="p-4 rounded-3 h-100 d-flex flex-column align-items-center justify-content-center"
               style={{
                overflow: "hidden",
                backgroundColor: "#084420",
                color: "#fff",
                }}
              >
                <img
                  src={feature.icon}
                  alt={`Icon ${index + 1}`}
                  style={{ width: "100px", height: "100px", marginBottom: "15px" }}
                />
                <p className="fw-semibold m-0 text-center">{feature.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
