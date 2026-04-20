import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Replace these with your actual image imports
import store1 from "../../assets/About/store1.png";
import store2 from "../../assets/About/store2.png";
import store3 from "../../assets/About/store3.png";
import store4 from "../../assets/About/store4.png";

const stores = [
  { img: store1, name: "Balewadi, Baner" },
  { img: store2, name: "Park street, Hinjewadi" },
  { img: store3, name: "Komal Palace, Akurdi" },
  { img: store4, name: "Ganesh Corner, Wakad" },
];

const OurStores = () => {
  return (
    <section className="text-center ">
      <p className="text-warning fw-semibold mb-1">Stores in Pune</p>
      <h2 className="fw-bold mb-4">Step Into Our Stores</h2>

      <div className="container">
        <div className="row g-4">
          {stores.map((store, index) => (
            <div className="col-12 col-sm-6 col-md-3" key={index}>
              <div className="card border-0 shadow rounded h-100">
                <img
                  src={store.img}
                  alt={store.name}
                  className="card-img-top rounded-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <p className="fw-semibold text-warning mb-0">{store.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStores;
