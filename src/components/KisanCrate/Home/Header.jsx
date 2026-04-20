// import { fetchCategories } from "../../features/categories/categoriSlice";
import { fetchCategories } from "../../../features/categories/categoriSlice"
import { useState, useEffect } from "react";
import "../../../styles/Home/header.css";
import logo from "../../../assets/Home/logo.png";
import profile from "../../../assets/Home/user.png";
import cart from "../../../assets/Home/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import LoginSignupPopup from "../../loginform/Loginform";
import { fetchProducts } from "../../../features/product/productSlice";
import { FaChevronDown, FaChevronUp, FaTimes, FaBars, FaSearch } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // ✅ use state.category (not categories) to match your store
  const { categories, loading, error } = useSelector((state) => state.category);

  const { products } = useSelector((state) => state.product);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [smallMenuOpen, setSmallMenuOpen] = useState(false);

  const getCartItemCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories({ page: 1, limit: 14 })); // ✅ fetch categories like Homecategory
  }, [dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/product?search=${searchQuery}`);
  };

  // 🔑 Handle category navigation
  const handleCategoryClick = (categoryName) => {
    setCategoriesOpen(false);
    setSmallMenuOpen(false);
    navigate("/product", { state: { selectedCategory: categoryName } });
  };

  return (
    <div className="header-section sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link className="navbar-brand me-2" to="/">
            <img src={logo} alt="Logo" className="logo img-fluid" />
          </Link>

          {/* Small screen search */}
          <form
            className="d-lg-none flex-grow-1 mx-2"
            onSubmit={handleSearchSubmit}
          >
            <div style={{ position: "relative", width: "120px" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "8px",
                  transform: "translateY(-50%)",
                  color: "#666",
                  fontSize: "12px",
                }}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "2px solid #ccc",
                  outline: "none",
                  padding: "8px 8px 8px 32px",
                  fontSize: "14px",
                }}
              />
            </div>
          </form>

          {/* Toggle button */}
          <button
            className="navbar-toggler d-lg-none border-0 bg-transparent"
            type="button"
            onClick={() => setSmallMenuOpen(!smallMenuOpen)}
          >
            {smallMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          {/* Large screen menu + search + profile/cart */}
          <div className="d-none d-lg-flex flex-grow-1 align-items-center justify-content-between">
            {/* Left: Menu */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link fw-bold" to="/" style={{ color: "#084220" }}>
                  Home
                </NavLink>
              </li>

              {/* Categories dropdown */}
{/* ===========================
   DESKTOP CATEGORY DROPDOWN
=========================== */}
<li className="nav-item dropdown position-relative">
  <button
    className="nav-link fw-bold bg-transparent border-0 d-flex align-items-center gap-2"
    onClick={() => setCategoriesOpen(!categoriesOpen)}
  >
    Categories
    {categoriesOpen ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
  </button>

  <div className={`mega-menu ${categoriesOpen ? "show" : ""}`}>
    {loading && <p className="px-3 py-2">Loading...</p>}
    {error && <p className="text-danger px-3 py-2">{error}</p>}

    {!loading && (
      <div className="mega-grid">
        {categories
          ?.filter((cat) => !cat.parentCategory)
          .map((parent) => (
            <div className="mega-column" key={parent._id}>
              {/* Parent */}
              <button
                className="parent-title"
                onClick={() => handleCategoryClick(parent.name)}
              >
                {parent.name}
              </button>

              {/* Child */}
              <ul className="sub-list">
                {categories
                  ?.filter(
                    (sub) =>
                      sub.parentCategory &&
                      sub.parentCategory._id === parent._id
                  )
                  .map((sub) => (
                    <li key={sub._id}>
                      <button
                        onClick={() => handleCategoryClick(sub.name)}
                      >
                        {sub.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    )}
  </div>
</li>
            </ul>

            {/* Center: Search */}
            <form className="mx-3 flex-grow-1" onSubmit={handleSearchSubmit}>
              <div style={{ position: "relative", width: "60%" }}>
                <FaSearch
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "12px",
                    transform: "translateY(-50%)",
                    color: "#888",
                    pointerEvents: "none"
                  }}
                />
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{
                    height: "40px",
                    borderRadius: "20px",
                    paddingLeft: "35px"
                  }}
                />
              </div>
            </form>

            {/* Right: Profile + Cart */}
            <div className="d-flex align-items-center gap-0">
              <Link className="position-relative" to="/cart">
                <img src={cart} alt="Cart" style={{ width: "70%" }} />
                {getCartItemCount() > 0 && (
                  <span className="position-absolute top-10 start-85 translate-middle badge bg-danger rounded-pill">
                    {getCartItemCount()}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="dropdown">
                  <button className="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/profile?tab=orders")}
                      >
                        My Orders
                      </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <button className="btn btn-link nav-link" onClick={() => setIsModalOpen(true)}>
                  <img src={profile} alt="Profile" style={{ width: "60%" }} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Small screen dropdown menu */}
        {/* ===============================
 MOBILE MENU JSX
================================= */}

{smallMenuOpen && (
  <>
    <div
      className="mobile-overlay"
      onClick={() => setSmallMenuOpen(false)}
    ></div>

    <div className="mobile-drawer">
      {/* top */}
      <div className="mobile-top">
        <img src={logo} alt="logo" className="mobile-logo" />

        <button
          className="mobile-close"
          onClick={() => setSmallMenuOpen(false)}
        >
          <FaTimes />
        </button>
      </div>

      {/* search */}
      <div className="mobile-search-wrap">
        <FaSearch className="mobile-search-icon" />
        <input
          type="text"
          className="mobile-search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* links */}
      <NavLink
        to="/"
        className="mobile-link"
        onClick={() => setSmallMenuOpen(false)}
      >
        Home
      </NavLink>

      {/* category toggle */}
      <button
        className="mobile-cat-toggle"
        onClick={() => setCategoriesOpen(!categoriesOpen)}
      >
        Categories
        {categoriesOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* category list */}
      {categoriesOpen &&
        categories
          ?.filter((cat) => !cat.parentCategory)
          .map((parent) => (
            <div className="mobile-parent" key={parent._id}>
              <button
                className="mobile-parent-btn"
                onClick={() => handleCategoryClick(parent.name)}
              >
                {parent.name}
              </button>

              <div className="mobile-child-list">
                {categories
                  ?.filter(
                    (sub) =>
                      sub.parentCategory &&
                      sub.parentCategory._id === parent._id
                  )
                  .map((sub) => (
                    <button
                      key={sub._id}
                      className="mobile-child-btn"
                      onClick={() => handleCategoryClick(sub.name)}
                    >
                      {sub.name}
                    </button>
                  ))}
              </div>
            </div>
          ))}

      {/* bottom */}
      <div className="mobile-bottom-bar">
        <Link to="/profile" className="mobile-bottom-item">
          <img src={profile} width="22" alt="" />
          <div>Profile</div>
        </Link>

        <Link to="/cart" className="mobile-bottom-item">
          <img src={cart} width="22" alt="" />
          <div>Cart</div>
        </Link>
      </div>
    </div>
  </>
)}
      </nav>

      {/* Bottom fixed Profile + Cart (Small screens) */}
      <div className="d-lg-none fixed-bottom bg-white border-top shadow-sm py-2">
        <div className="d-flex justify-content-around align-items-center">
          {user ? (
            <Link to="/profile" className="text-center">
              <img src={profile} alt="Profile" />
              <div style={{ fontSize: "12px" }}>Profile</div>
            </Link>
          ) : (
            <button className="btn btn-link text-center p-0" onClick={() => setIsModalOpen(true)}>
              <img src={profile} alt="Login" style={{ width: "70%" }} />
              <div style={{ fontSize: "12px" }}>Login</div>
            </button>
          )}

          <Link to="/cart" className="text-center position-relative">
            <img src={cart} alt="Cart" style={{ width: "70%" }} />
            {getCartItemCount() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                {getCartItemCount()}
              </span>
            )}
            <div style={{ fontSize: "12px" }}>Cart</div>
          </Link>
        </div>
      </div>

      {/* Login Modal */}
      {isModalOpen && !localStorage.getItem("token") && (
        <LoginSignupPopup setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default Header;
