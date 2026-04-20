import React, { useEffect, useState } from 'react';

import axiosInstance from '../../api/axiosInstance';
import Blogi from "../../assets/image/aboutus.webp";
import Blog from "../../assets/image/Frame 23.webp";
const CropsPage = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    axiosInstance
      .get("/api/v1/crop", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.data.crops && response.data.data.crops.length > 0) {
          const updatedCrops = response.data.data.crops.map((crop) => ({
            ...crop,
            plantName: crop.plantName?.replace(/"/g, ''),
            plantdescription: crop.plantdescription?.replace(/"/g, ''),
          }));
          setCrops(updatedCrops);
        } else {
          setErrorMessage("No crops found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("You are not logged in! Please log in to access this content.");
        } else {
          setErrorMessage("There was an error fetching the crop data.");
        }
        setLoading(false);
        console.error("Error fetching crop data:", error);
      });
  }, []);

  if (loading) {
    return <div className="text-center my-4">Loading crops...</div>;
  }

  if (errorMessage) {
    return <div className="text-center my-4 text-danger">{errorMessage}</div>;
  }

  return (
    // <div className="container my-4" >
    //     <div className="container-ouvercompay" style={{ backgroundImage: `url(${Blogi})`,marginBottom:'20px' }}>
    //           <div className="text-center mt-5">
              
    //           </div>
    //         </div>
    // <div className="row align-items-center">
    //     {/* Image Section */}
    //     <div className="col-md-6 mb-4 mb-md-0">
    //       <img
    //         src={Blog}
    //         alt="Spices"
    //         className="img-fluid rounded"
    //       />
    //     </div>

    //     {/* Text Section */}
    //     <div className="col-md-6" style={{marginTop:'30px'}}>
    //       <p>
    //         At <strong>Currymate Spices</strong>, we bring you the rich,
    //         authentic flavors of India with our premium-quality spices. Sourced
    //         from the finest farms and processed with the utmost care, our
    //         masalas capture the true essence of traditional Indian cooking.
    //       </p>
    //       <p>
    //         We believe that great food starts with great ingredients. That’s
    //         why our spices are 100% pure, free from additives, and packed with
    //         freshness. Whether you’re a home chef or a professional, our
    //         masalas will enhance your dishes with bold aromas and flavors that
    //         make every meal unforgettable.
    //       </p>
    //       <p>
    //         With a commitment to quality and a passion for taste,{" "}
    //         <strong>Currymate Spices</strong> is your go-to choice for spices
    //         that transform ordinary meals into extraordinary culinary
    //         experiences. Spice up your kitchen with us!
    //       </p>
    //     </div>
    //   </div>
    //   <div className="row">
    //     {crops.map((crop) => (
    //       <div className="col-md-3 col-sm-6 mb-4" key={crop._id}>
    //         <div className="card h-100 shadow-sm">
    //           <div className="card-img-wrapper" style={{ height: '200px', overflow: 'hidden' }}>
    //             <img
    //               src={crop.thumbnail}
    //               className="card-img-top"
    //               alt={crop.plantName}
    //               style={{ height: '100%', width: '100%', objectFit: 'cover' }}
    //             />
    //           </div>
    //           <div className="card-body text-center">
    //             <h5 className="card-title">{crop.plantName}</h5>
               
    //             <a
    //               href={crop.pdf}
    //               className="add-to-button"
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               style={{textDecorationLine:'none'}}
    //             >
    //               Open PDF
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="container my-4">
  {/* Background Image Section */}
  <div
    className="container-ouvercompay"
    style={{
      backgroundImage: `url(${Blogi})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '200px',
      borderRadius: '8px',
      marginBottom: '20px',
      justifyContent:'center',
      display:'flex'
    }}
  >
    <div className="text-center mt-5">
      {/* Optional Heading or Overlay Here */}
    </div>
  </div>

  {/* About Section */}
  <div className="row align-items-center">
    {/* Image Section */}
    <div className="col-lg-6 col-md-12 mb-4">
      <img src={Blog} alt="Spices" className="img-fluid rounded w-60 h-20" />
    </div>

    {/* Text Section */}
    <div className="col-lg-6 col-md-12">
      <div style={{ marginTop: '15px' }}>
        <p>
          At <strong>Currymate Spices</strong>, we bring you the rich, authentic
          flavors of India with our premium-quality spices. Sourced from the
          finest farms and processed with the utmost care, our masalas capture
          the true essence of traditional Indian cooking.
        </p>
        <p>
          We believe that great food starts with great ingredients. That’s why
          our spices are 100% pure, free from additives, and packed with
          freshness. Whether you’re a home chef or a professional, our masalas
          will enhance your dishes with bold aromas and flavors that make every
          meal unforgettable.
        </p>
        <p>
          With a commitment to quality and a passion for taste,{" "}
          <strong>Currymate Spices</strong> is your go-to choice for spices that
          transform ordinary meals into extraordinary culinary experiences.
          Spice up your kitchen with us!
        </p>
      </div>
    </div>
  </div>

  {/* PDF Cards Section */}
  <div className="row mt-4">
    {crops.map((crop) => (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={crop._id}>
        <div className="card h-100 shadow-sm">
          <div
            className="card-img-wrapper"
            style={{ height: '200px', overflow: 'hidden' }}
          >
            <img
              src={crop.thumbnail}
              className="card-img-top"
              alt={crop.plantName}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="card-body text-center">
            <h5 className="card-title">{crop.plantName}</h5>
            <a
              href={crop.pdf}
              className="add-to-button btn btn-sm btn-outline-primary mt-2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              Open PDF
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default CropsPage;
