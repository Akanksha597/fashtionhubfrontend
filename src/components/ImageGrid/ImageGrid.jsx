import React, { useState } from "react";
import "./ImageGrid.css";

// 👉 Your images
import poster from "../../assets/Imagegrid/poster.jpg";

const images = [
  poster,
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
];

const ImageSwapLayout = () => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="swap-container">
      <div className="swap-grid">

        {/* LEFT BIG IMAGE */}
        <div className="big-image">
          <img src={mainImage} alt="Main" />
        </div>

        {/* RIGHT SIDE IMAGES (ONLY 2) */}
        <div className="side-images">
          {images
            .filter((img) => img !== mainImage) // remove main image
            .slice(0, 2) // only 2 images
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