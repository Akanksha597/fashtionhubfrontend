// src/components/Category/ProductListing.js

import React, { useState } from "react";
import "../../../styles/Category/ProductListing.css";
import { Dropdown } from "react-bootstrap";

// ==== Icons ====
import vegetablesIcon from "../../../assets/Category/vegetable.png";
import leafyIcon from "../../../assets/Category/leafy.png";
import rootIcon from "../../../assets/Category/root.png";
import fruitVegIcon from "../../../assets/Category/fruit.png";
import exoticIcon from "../../../assets/Category/excotic.png";
import fruitsIcon from "../../../assets/Category/fruits.png";
import dryFruitsIcon from "../../../assets/Category/dryfruit.png";

import carrotImg from "../../../assets/Category/carrot.png";
import onionImg from "../../../assets/Category/onion.png";
import potatoImg from "../../../assets/Category/potato.png";
import beetrootImg from "../../../assets/Category/beetroot.png";
import sweetpotatoImg from "../../../assets/Category/sweetpotato.png";
import gingerImg from "../../../assets/Category/ginger.png";

// ==== Product Data ====
const productData = [
  { name: "Carrot", oldPrice: 70, newPrice: 60, image: carrotImg },
  { name: "Onion", oldPrice: 70, newPrice: 60, image: onionImg },
  { name: "Potato", oldPrice: 36, newPrice: 20, image: potatoImg },
  { name: "Beetroot", oldPrice: 70, newPrice: 65, image: beetrootImg },
  { name: "SweetPotato", oldPrice: 740, newPrice: 600, image: sweetpotatoImg },
  { name: "Ginger", oldPrice: 94, newPrice: 80, image: gingerImg },
];

// ==== Category Data ====
const filterData = [
  {
    title: "Vegetables",
    icon: vegetablesIcon,
    subcategories: [
      { name: "Leafy Vegetables", icon: leafyIcon },
      { name: "Root Vegetables", icon: rootIcon },
      { name: "Fruit Vegetables", icon: fruitVegIcon },
      { name: "Exotic Vegetables", icon: exoticIcon },
    ],
  },
  { title: "Fruits", icon: fruitsIcon, subcategories: [] },
  { title: "Dry Fruits", icon: dryFruitsIcon, subcategories: [] },
];

const ProductListing = () => {
  const [sortOption, setSortOption] = useState("Default");
  const [products, setProducts] = useState(productData);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const toggleCategory = (title) => {
    setExpandedCategories((prev) => (prev.includes(title) ? [] : [title]));
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    console.log("Selected subcategory:", subcategory);
  };

  const sortProducts = (option) => {
    let sorted = [...products];
    if (option === "Price: Low to High") {
      sorted.sort((a, b) => a.newPrice - b.newPrice);
    } else if (option === "Price: High to Low") {
      sorted.sort((a, b) => b.newPrice - a.newPrice);
    } else {
      sorted = [...productData]; // Reset to default
    }
    setSortOption(option);
    setProducts(sorted);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row align-items-stretch">
        {/* ==== Sidebar Filter ==== */}
        <div className="col-lg-3 mb-4 d-flex">
          <div className="custom-sidebar rounded shadow-sm w-100 h-100">
            <div className="p-3">
              <h5 className="mb-3 fw-bold">Filter</h5>
              {filterData.map((category, idx) => (
                <div key={idx} className="mb-3">
                  <div
                    className="d-flex align-items-center justify-content-between fw-bold category-title px-2 py-2 border-top"
                    style={{
                      cursor: category.subcategories.length
                        ? "pointer"
                        : "default",
                    }}
                    onClick={() =>
                      category.subcategories.length &&
                      toggleCategory(category.title)
                    }
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={category.icon}
                        alt={category.title}
                        style={{ width: 24, height: 24 }}
                      />
                      <span>{category.title}</span>
                    </div>
                    {category.subcategories.length > 0 && (
                      <span>
                        {expandedCategories.includes(category.title)
                          ? "▾"
                          : "▸"}
                      </span>
                    )}
                  </div>

                  {/* Subcategories */}
                  {category.subcategories.length > 0 &&
                    expandedCategories.includes(category.title) && (
                      <ul className="list-unstyled pt-2">
                        {category.subcategories.map((subcat, subIdx) => (
                          <li
                            key={subIdx}
                            onClick={() => handleSubcategoryClick(subcat.name)}
                            className={`d-flex align-items-center gap-2 mb-2 subcategory-item ${
                              subcat.name === selectedSubcategory
                                ? "active"
                                : ""
                            }`}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={subcat.icon}
                              alt={subcat.name}
                              style={{ width: 20, height: 20 }}
                            />
                            <span>{subcat.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==== Product Section ==== */}
        <div className="col-lg-9 d-flex flex-column">
          {/* Sort and Heading on Same Line */}
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <h5 className="mb-0 fw-bold">Products</h5>
            <Dropdown>
              <Dropdown.Toggle variant="light" className="border">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortProducts("Default")}>
                  Default
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => sortProducts("Price: Low to High")}
                >
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => sortProducts("Price: High to Low")}
                >
                  Price: High to Low
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Product Cards */}
          <div className="row g-2">
            {products.map((product, idx) => {
              const discount = Math.round(
                ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
              );

              return (
                <div className="col-12 col-sm-6 col-md-4 mb-4" key={idx}>
                  <div
                    className="position-relative border rounded p-3 bg-white h-100 shadow-sm"
                    style={{
                      border:
                        product.name === "SweetPotato"
                          ? "2px solid orange"
                          : "",
                      height: "420px",
                      margin: "0 auto",
                    }}
                  >
                    {/* Discount */}
                    <div
                      className="position-absolute top-0 start-0 bg-warning text-white px-2 py-1 small fw-bold"
                      style={{
                        borderTopLeftRadius: "0.4rem",
                        borderBottomRightRadius: "0.4rem",
                      }}
                    >
                      -{discount}%
                    </div>

                    {/* Fresh Tag */}
                    {product.name === "Carrot" && (
                      <div
                        className="position-absolute top-0 end-0 bg-success text-white px-2 py-1 small fw-bold"
                        style={{
                          borderTopRightRadius: "0.4rem",
                          borderBottomLeftRadius: "0.4rem",
                        }}
                      >
                        fresh
                      </div>
                    )}

                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid mx-auto d-block"
                      style={{
                        height: "120px",
                        objectFit: "contain",
                        marginTop: "1rem",
                      }}
                    />

                    {/* Name */}
                    <h6 className="fw-bold text-center mt-3">{product.name}</h6>

                    {/* Weights */}
                    <div className="d-flex justify-content-center gap-2 flex-wrap my-2">
                      <span className="badge bg-warning text-dark">250 g</span>
                      <span className="badge bg-warning text-dark">500 g</span>
                      <span className="badge bg-warning text-dark">1 kg</span>
                    </div>

                    {/* Price + Cart */}
                    <div className="d-flex justify-content-between align-items-center mt-3 px-1">
                      <div
                        className="d-inline-flex align-items-center gap-2 px-2 py-1"
                        style={{
                          border: "2px solid orange",
                          borderRadius: "0.4rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        <span className="text-muted">
                          <del>₹{product.oldPrice}</del>
                        </span>
                        <span className="fw-bold text-warning">
                          ₹{product.newPrice}
                        </span>
                      </div>
                      <button className="btn btn-sm btn-success px-3">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
