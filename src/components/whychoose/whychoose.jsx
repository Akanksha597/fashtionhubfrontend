import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import lovecare3 from "../../assets/image/whychoose1.png";
import lovecare from "../../assets/image/whychoose3.png";
import lovecare1 from "../../assets/image/whychoose2.png";
import lovecare4 from "../../assets/image/whychoose3 (2).png";
import lovecare5 from "../../assets/image/whychoose5.png";
const features = [
  {
    title: "Pure & Authentic Flavors",
    description:
      "We use only the finest handpicked ingredients to bring you the true taste of tradition in every pinch.",
    image: lovecare,
  },
  {
    title: "No Additives, No Compromises",
    description:
      "Our masalas are 100% natural — free from artificial colors, preservatives, and fillers.",
    image: lovecare3,
  },
  {
    title: "Crafted by Experts",
    description:
      "Blended by spice masters with decades of experience to ensure perfect taste, aroma, and consistency.",
    image: lovecare1,
  },
  {
    title: "Rooted in Tradition",
    description:
      "Inspired by age-old Indian recipes, our masalas capture the rich culinary heritage of every region.",
    image: lovecare4,
  },
  {
    title: "Quality You Can Trust",
    description:
      "From sourcing to packaging, every step is strictly quality-checked to deliver nothing but the best.",
    image: lovecare5,
  },
];

const Whychoose = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 2;
    const delay = 40;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (
          scrollAmount >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(autoScroll, delay);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container my-5" style={{ maxWidth: "1500px" }}>
      <h1 className="text-center mb-4 fw-bold text-dark">
      WHO CHOOSE US ?
      </h1>
      {/* <div
        ref={scrollRef}
        className="d-flex p-4"
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card text-center p-4 mx-3 border rounded shadow-sm bg-light d-flex flex-column align-items-center"
          >
            <div
              className="image-container d-flex justify-content-center align-items-center mb-3"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#eaffea",
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
            </div>
            <h5 className="text-success fw-bold">{feature.title}</h5>
            <p>
              {feature.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div> */}
      <div
  ref={scrollRef}
  className="p-4"
  style={{
    overflowX: "auto",
    whiteSpace: "nowrap",
    display: "flex",
    gap: "1rem",
    overflow: "hidden", whiteSpace: "nowrap" 
  }}
>
  {features.map((feature, index) => (
    <div
      key={index}
      className="feature-card text-center border rounded shadow-sm bg-light"
      style={{
        display: "inline-block",
        minWidth: "250px",
        maxWidth: "300px",
        padding: "1rem",
       
      }}
    >
      <div
        className="image-container d-flex justify-content-center align-items-center mb-3"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#eaffea",
          margin: "0 auto",
        }}
      >
        <img
          src={feature.image}
          alt={feature.title}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <h5 className="text-success fw-bold">{feature.title}</h5>
      <p>{feature.description}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default Whychoose;
