import React, { useState } from "react";
import "./ImageGrid.css";

const images = [
  "src/assets/Imagegrid/poster.jpg",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
];

const ImageSwapLayout = () => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="swap-container">
      <div className="swap-grid">
        
        {/* BIG IMAGE */}
        <div className="big-image">
          <img src={mainImage} alt="Main" />
        </div>

        {/* SIDE IMAGES */}
        <div className="side-images">
          {images
            .filter((img) => img !== mainImage)
            .map((img, index) => (
              <div key={index} onClick={() => setMainImage(img)}>
                <img src={img} alt="thumb" />
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default ImageSwapLayout;