import "bootstrap/dist/css/bootstrap.min.css";
import discount from "../../../assets/Home/discount.png";
import freeDeliverry from "../../../assets/Home/freedelivery.png";
import payment from "../../../assets/Home/payment.png";
import productReturn from "../../../assets/Home/productreturn.png";



const HeroSection = () => {
  return (
    <div
      className="w-100 position-relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 20px 150px",
      }}
    >
      {/* Top Section */}
      <div className="container d-flex flex-wrap align-items-center justify-content-between">
        <div className="col-lg-6 col-md-12 mb-4">
          <p className="text-warning fs-5">Welcome to Kisan Crate</p>
          <h1 className="fw-bold display-5">
            Organic Fruits
            <br />& Vegetables
          </h1>
          <div className="mt-4">
            <button
              className="btn me-3 px-4 py-2"
              style={{ background: "#084220", color: "#FFD630" }}
            >
              Shop Now
            </button>
            <button
              className="btn me-3 px-4 py-2"
              style={{ background: "#FFD630", color: "#084220" }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Floating Feature Cards */}
      {/* Floating Feature Cards - only visible on md and above */}
      <div
        className="container position-absolute start-50 translate-middle-x d-none d-md-block"
        style={{ bottom: "-80px", zIndex: 2 }}>
        <div className="row shadow rounded p-4 bg-white text-center">
          {[
            { img: discount, title: "Discount", desc: "Every week new sales" },
            {
              img: productReturn,
              title: "Return Policy",
              desc: "Dedicated support",
            },
            {
              img: freeDeliverry,
              title: "Free Delivery",
              desc: "For all order above 100",
            },
            {
              img: payment,
              title: "Secure Payment",
              desc: "100% secure payment",
            },
          ].map((feature, index, arr) => (
            <div
              key={index}
              className="col-md-3 d-flex justify-content-center mb-4 mb-md-0"
              style={{
                borderRight:
                  index < arr.length - 1 ? "1px solid #084220" : "none",
              }}>
              <div className="d-flex align-items-center text-start px-3">
                <img
                  src={feature.img}
                  alt={feature.title}
                  width="50"
                  height="50"
                  className="me-3"
                  style={{ objectFit: "contain" }}
                />
                <div>
                  <h6 className="fw-bold mb-1">{feature.title}</h6>
                  <p className="text-muted small mb-0">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
