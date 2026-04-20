import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaShoppingCart } from "react-icons/fa";
import "./productcard.css";

const ProductCard = ({ product }) => {
  console.log("ProductCard::", product);
  const [loadingButton, setLoadingButton] = useState(null);
  const [disabledCart, setDisableCart] = useState(true);
  const [selectedSize, setSelectedSize] = useState(
    product.unitPricePairs[0] || {}
  );
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const isWishlisted = wishlistItems.some((item) => item.id === product._id);

  const handleImageClick = (productId) => {
    navigate(`/productdescription/${productId}`);
  };

  const handleSizeChange = useCallback(
    (event) => {
      const size = event.target.value;
      const selected = product.unitPricePairs.find((s) => s.price == size);
      console.log("this is selected size", selected);
      if (!selected || selected.stock <= 0) {
        setDisableCart(false);
      } else {
        setDisableCart(true);
      }
      setSelectedSize(selected || {});
    },
    [product.unitPricePairs]
  );

  const handleAddToCart = useCallback(() => {
    if (selectedSize) {
      setLoadingButton(product._id);
      const productWithSize = {
        _id: product._id,
        quantity: 1,
        name: product.productName,
        selectPunit: selectedSize.unit,
        selectPprice: selectedSize.price,
        gallery: product.thumbnail,
      };
      console.log("Adding to Cart:", productWithSize);
      addToCart(productWithSize);

      setTimeout(() => {
        setLoadingButton(null);
      }, 1000);
    }
  }, [product, selectedSize, addToCart]);

  const handleWishlistClick = useCallback(() => {
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  }, [isWishlisted, product, addToWishlist, removeFromWishlist]);

  const calculateSavings = () => {
    if (selectedSize?.lisedPrice && selectedSize?.price) {
      return (selectedSize?.lisedPrice - selectedSize?.price).toFixed(0);
    }
    return null;
  };

  const calculatePercentageOff = () => {
    if (
      selectedSize &&
      Object.keys(selectedSize).length &&
      selectedSize.lisedPrice
    ) {
      let discPer =
        ((selectedSize.lisedPrice - selectedSize.price) /
          selectedSize.lisedPrice) *
        100;
      return discPer;
    }
    return null;
  };

  const savings = calculateSavings();
  const percentageOff = calculatePercentageOff();
  

  return (
    <div className="pro-card shadow rounded h-100 mb-3">
      {percentageOff && (
        <div className="product-discount">{percentageOff.toFixed(0)}% OFF</div>
      )}

      <div className="image-pro">
        <img
          src={
            product.thumbnail
              ? product.thumbnail
              : "https://cdn3d.iconscout.com/3d/premium/thumb/product-3d-icon-download-in-png-blend-fbx-gltf-file-formats--tag-packages-box-marketing-advertisement-pack-branding-icons-4863042.png?f=webp"
          }
          alt={product.productName}
          height={200}
          width={200}
          className="product-image"
          onClick={() => handleImageClick(product._id)}
        />
      </div>

      {/* <div className="product-info">
        <h3 className="product-title" onClick={handleImageClick}>
          {product.productName}
        </h3>
        {product.unitPricePairs.length > 0 ? (
          <div className="size-dropdown">
            <select
              id="size-select"
              value={selectedSize.price || ""}
              onChange={handleSizeChange}
            >
              {product.unitPricePairs.map((size) => (
                <option value={size.price}>
                  {size.unit} - ₹{size.price}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="no-sizes">No sizes available</div>
        )}

        {savings && (
          <div className="product-savings">
            <span className="savings-text">Saved Price: ₹{savings}</span>
          </div>
        )}

        <div className="button-container">
          <div className="product-pricing">
            ₹
            {(selectedSize && selectedSize?.price) ||
              currentProduct?.unitPricePairs[0]?.price}{" "}
            {selectedSize?.lisedPrice && (
              <del className="listed-price"> ₹{selectedSize?.lisedPrice}</del>
            )}
          </div>
          {/* <button
            className="add-to-button"
            onClick={handleAddToCart}
            disabled={loadingButton === product._id}
          >
            {loadingButton === product._id ? (
              <span className="spinner" />
            ) : (
              "Add to Cart"
            )}
          </button> */}
          {/* <button
            className="d-flex add-to-button "
            onClick={handleAddToCart}
            disabled={loadingButton === product._id || !disabledCart}
            style={{
              backgroundColor:
                loadingButton === product._id || !disabledCart
                  ? "#ccc"
                  : "#218838",
              cursor:
                loadingButton === product._id || !disabledCart
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loadingButton === product._id ? (
              <span className="spinner" />
            ) : (
              
              <>
               Add to Cart
              </>
            )}
          </button>
        </div>
      </div> */} 
      <div className="product-info">
  <h3 className="product-title" onClick={handleImageClick}>
    {product.productName}
  </h3>
{product.unitPricePairs.length > 0 ? (
  <div className="size-scroll">
    {product.unitPricePairs.map((size) => (
      <button
        key={size.unit}
        onClick={() => setSelectedSize(size)}
        className={`size-chip ${
          selectedSize?.unit === size.unit ? "active" : ""
        }`}
      >
        {size.unit}
      </button>
    ))}
  </div>
) : (
  <div className="no-sizes">No sizes available</div>
)}


  {savings && (
    <div className="product-savings" style={{ marginBottom: "8px" }}>
      <span
        className="savings-text"
        style={{ color: "#e65100", fontWeight: "bold" }}
      >
        Saved Price: ₹{savings}
      </span>
    </div>
  )}

  <div
    className="button-container"
    style={{ display: "flex", alignItems: "center", gap: "10px" }}
  >
    <div className="product-pricing" style={{ display: "flex", gap: "5px" }}>
      {selectedSize?.lisedPrice && (
        <del
          className="listed-price"
          style={{
            color: "#999",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
          }}
        >
          ₹{selectedSize.lisedPrice}
        </del>
      )}
      <span
        className="discounted-price"
        style={{
          color: "#e65100",
          fontWeight: "bold",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        ₹{selectedSize?.price}
      </span>
    </div>

    <button
      onClick={handleAddToCart}
      disabled={loadingButton === product._id || !disabledCart}
      style={{
        backgroundColor:
          loadingButton === product._id || !disabledCart
            ? "#ccc"
            : "#000000",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        fontWeight: "bold",
        cursor:
          loadingButton === product._id || !disabledCart
            ? "not-allowed"
            : "pointer",
      }}
    >
       Add 
    </button>
  </div>
</div>

    </div>
  );
};

export default ProductCard;
