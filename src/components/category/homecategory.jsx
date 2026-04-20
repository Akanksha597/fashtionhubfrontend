import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriSlice";
import "./homecategory.css";

const Homecategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    // fetch all categories
    dispatch(fetchCategories({ page: 1, limit: 50 }));
  }, [dispatch]);

  const handleCategoryClick = (categoryName) => {
    navigate("/product", { state: { selectedCategory: categoryName } });
  };

  // Only subcategories + latest 5
  const latestSubCategories =
    categories
      ?.filter((cat) => cat.parentCategory) // only sub categories
      ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
      ?.slice(0, 5); // only 5 latest

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <section className="category-section">
      <h6 className="subtitle">Best For Your Categories</h6>

      <h2 className="title">
        Pick what suits your lifestyle – curated for modern needs.
      </h2>

      <div className="category-scroll">
        {latestSubCategories?.map((cat, i) => (
          <div
            key={i}
            className="category-item"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div className="category-img-wrapper">
              <img
                src={cat.thumbnail || "/default.png"}
                alt={cat.name}
              />
            </div>

            <h6 className="category-name">{cat.name}</h6>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Homecategory;