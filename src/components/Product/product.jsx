import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriSlice";
import { fetchProducts } from "../../features/product/productSlice";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./product.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import allProductsImage from "../../assets/catbanner.png";
import ProductCard from "../productcard";

const ProductPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || "All"
  );

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);

  const { categories } = useSelector((state) => state.category);
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 50 }));
    dispatch(fetchProducts({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setPrice([0, 10000]);
  };

  // ✅ MAIN CATEGORY
  const mainCategories =
    categories?.filter((cat) => !cat.parentCategory) || [];

  // ✅ SUB CATEGORY GROUP BY MAIN CATEGORY
  const groupedCategories = mainCategories.map((mainCat) => ({
    ...mainCat,
    subCategories: categories.filter(
      (sub) => sub.parentCategory?._id === mainCat._id
    ),
  }));

  // Price Range
  const prices =
    products?.flatMap((p) =>
      p.unitPricePairs?.map((u) => u.price)
    ) || [];

  const minPrice = Math.min(...prices, 0);
  const maxPrice = Math.max(...prices, 10000);

  // Product Filter
  const filteredProducts = useMemo(() => {
    return products?.filter((p) => {
      const salePrice = Number(p.unitPricePairs?.[0]?.price || 0);

      const productCategory = p.productCategory?.name;

      return (
        (selectedCategory === "All" ||
          productCategory === selectedCategory) &&
        salePrice >= price[0] &&
        salePrice <= price[1]
      );
    });
  }, [products, selectedCategory, price]);

  return (
    <div className="product-wrapper">

      {/* HERO */}
      <div
        className="container-ouvercompay"
        style={{ backgroundImage: `url(${allProductsImage})` }}
      />

      <div className="container py-4 mb-5">
        <div className="row">

          {/* SIDEBAR */}
          <div className="col-md-3 d-none d-md-block">
            <div className="filter-sidebar shadow-sm">

              <div className="d-flex justify-content-between">
                <h5>Filters</h5>

                <span
                  onClick={clearFilters}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  CLEAR
                </span>
              </div>

              {/* ALL */}
              <div className="mt-3">
                <input
                  type="radio"
                  checked={selectedCategory === "All"}
                  onChange={() => handleCategoryClick("All")}
                />
                All Products
              </div>

              {/* MAIN + SUB CATEGORY */}
              <div className="mt-3">
                <h6>Category</h6>

                {groupedCategories.map((mainCat) => (
                  <div key={mainCat._id} className="mb-2">

                    {/* MAIN CAT */}
                    <div
                      style={{
                        fontWeight: "700",
                        color: "#000",
                        marginTop: "10px",
                      }}
                    >
                      {mainCat.name}
                    </div>

                    {/* SUB CAT */}
                    {mainCat.subCategories.map((sub) => (
                      <div
                        key={sub._id}
                        style={{ paddingLeft: "15px" }}
                      >
                        <input
                          type="radio"
                          checked={
                            selectedCategory === sub.name
                          }
                          onChange={() =>
                            handleCategoryClick(sub.name)
                          }
                        />
                        {sub.name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* PRICE */}
              <div className="mt-3">
                <h6>Price</h6>

                <Slider
                  range
                  min={minPrice}
                  max={maxPrice}
                  value={price}
                  onChange={(val) => setPrice(val)}
                />

                <p>
                  ₹{price[0]} - ₹{price[1]}
                </p>
              </div>

            </div>
          </div>

          {/* MOBILE */}
          <div className="col-12 mb-3 d-md-none">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) =>
                handleCategoryClick(e.target.value)
              }
            >
              <option value="All">All Products</option>

              {groupedCategories.map((mainCat) => (
                <React.Fragment key={mainCat._id}>
                  <option disabled>
                    --- {mainCat.name} ---
                  </option>

                  {mainCat.subCategories.map((sub) => (
                    <option
                      key={sub._id}
                      value={sub.name}
                    >
                      {sub.name}
                    </option>
                  ))}
                </React.Fragment>
              ))}
            </select>
          </div>

          {/* PRODUCTS */}
          <div className="col-md-9 col-lg-9">

            <h5 className="mb-3">
              {selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
            </h5>

            {loading && <p>Loading...</p>}
            {error && (
              <p className="text-danger">
                Error: {error}
              </p>
            )}

            <div className="row g-3">
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((p) => (
                  <div
                    key={p._id}
                    className="col-6 col-md-4 col-lg-3 d-flex justify-content-center"
                  >
                    <ProductCard product={p} />
                  </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;