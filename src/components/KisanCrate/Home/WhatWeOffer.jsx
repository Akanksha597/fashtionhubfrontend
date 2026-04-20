// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";

// import vegetablesIcon from "../../../assets/Home/freshveg.png";
// import fruitsIcon from "../../../assets/Home/freshfruit.png";
// import dryFruitsIcon from "../../../assets/Home/dryfruit.png";
// import arrow from "../../../assets/Home/arrow.png";

// const offerData = [
//   {
//     icon: vegetablesIcon,
//     title: "Fresh Vegetables",
//     bg: "#F2F6E7",
//   },
//   {
//     icon: fruitsIcon,
//     title: "Fresh Fruits",
//     bg: "#FEF5EC",
//   },
//   {
//     icon: dryFruitsIcon,
//     title: "Dry Fruits",
//     bg: "#F1F3E8",
//   },
// ];

// const WhatWeOffer = () => {
//   return (
//     <section className="py-5 text-center" style={{ marginTop: "5rem" }}>
//       <p style={{ color: "#f48c06", fontWeight: "500" }}>Kisan Crate’s Special</p>
//       <h2 className="fw-bold mb-5">What We Offer For You</h2>

//       <div className="container">
//         <div className="row justify-content-center">
//           {offerData.map((item, idx) => (
//             <div key={idx} className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex justify-content-center mb-5">
//               <div className="position-relative" style={{ width: "100%", maxWidth: "335px" }}>
                
//                 {/* Floating Image */}
//                 <img
//                   src={item.icon}
//                   alt={item.title}
//                   style={{
//                     height: "120px",
//                     position: "absolute",
//                     top: "0px",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     zIndex: "2",
//                   }}
//                 />

//                 {/* Card */}
//                 <div
//                   className="p-4 pt-5 rounded-3 d-flex flex-column align-items-center justify-content-between"
//                   style={{
//                     backgroundColor: item.bg,
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
//                     height: "250px",
//                     width: "100%",
//                     maxWidth: "335px",
//                     marginTop: "60px", // To make space for floated image
//                   }}
//                 >
//                   <h5 className="fw-bold pt-2" style={{ marginTop: "3.5rem" }}>{item.title}</h5>

//                   <Link
//                     to="/categories"
//                     className="text-success fw-semibold mt-3 d-flex align-items-center gap-1 text-decoration-none"
//                   >
//                     Shop By Categories
//                     <img src={arrow} alt="arrow" style={{ height: "18px" }} />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhatWeOffer;


import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import vegetablesIcon from "../../../assets/Home/posterhome.png";
import fruitsIcon from "../../../assets/Home/posterhome.png";
import dryFruitsIcon from "../../../assets/Home/posterhome.png";
import arrow from "../../../assets/Home/arrow.png";




const WhatWeOffer = () => {
  return (
    <section className="py-5 text-center" style={{ marginTop: "5rem" }}>
      <p style={{ color: "#f48c06", fontWeight: "500" }}>Kisan Crate’s Special</p>
      <h2 className="fw-bold mb-5">What We Offer For You</h2>

      <div className="container">
        <div className="row justify-content-center">
          {offerData.map((item, idx) => (
            <div key={idx} className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex justify-content-center mb-5">
              <div className="position-relative" style={{ width: "100%", maxWidth: "335px" }}>
                {/* Floating Image */}
                <img
                  src={item.icon}
                  alt={item.title}
                  style={{
                    height: "120px",
                    position: "absolute",
                    top: "0px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: "2",
                  }}
                />

                {/* Card */}
                <div
                  className="p-4 pt-5 rounded-3 d-flex flex-column align-items-center justify-content-between"
                  style={{
                    backgroundColor: item.bg,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                    height: "250px",
                    width: "100%",
                    maxWidth: "335px",
                    marginTop: "60px",
                  }}
                >
                  <h5 className="fw-bold pt-2" style={{ marginTop: "3.5rem" }}>
                    {item.title}
                  </h5>

                  <Link
                    to="/homecategory"
                    state={{ selectedCategory: item.title }} // <-- send selected category
                    className="text-success fw-semibold mt-3 d-flex align-items-center gap-1 text-decoration-none"
                  >
                    Shop By Categories
                    <img src={arrow} alt="arrow" style={{ height: "18px" }} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
