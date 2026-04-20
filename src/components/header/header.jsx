import React, { useState, useEffect } from "react";
import "./header.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import LoginSignupPopup from "../loginform/Loginform";
import { fetchProducts } from "../../features/product/productSlice";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [user, setUser] = useState(null);
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive =
    location.pathname === "/Blogc" || location.pathname === "/video";

  const getCartItemCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleNavLinkClick = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarToggler) {
      navbarToggler.click();
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 1) {
      const filtered = products.filter((p) =>
        p.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductClick = (productId) => {
    setSearchQuery("");
    setFilteredProducts([]);
    navigate(`/productdescription/${productId}`);
  };

  const handleMyOrdersClick = () => {
    navigate("/profile?tab=orders");
  };

  const handleIconHover = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/product?search=${searchQuery}`);
    dispatch(fetchProducts({ keyword: searchQuery }));
  };

  useEffect(() => {
    dispatch(fetchProducts());
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

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/v1/setting"
        );
        if (response.data && response.data.thumbnail) {
          setLogoUrl(response.data.thumbnail);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }, []);

  return (
    <>
      <div className="header-section sticky-top">
        {/* Top Offer Banner */}
        <div className="offer-text">
          <p>Exclusive Offer! Get offer on your first order!</p>
        </div>

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            {/* Logo */}
            <Link className="navbar-brand" to="/">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="logo" />
              ) : (
                <span>Loading...</span>
              )}
            </Link>

            {/* Search */}
            <div className="search-container" style={{ position: "relative" }}>
              <form
                className="d-flex search-bar ms-auto me-2"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
              {searchQuery.length >= 1 && filteredProducts.length > 0 && (
                <ul className="search-suggestions">
                  {filteredProducts.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                    >
                      {product.productName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Toggle */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Menu Items */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item d-none d-lg-block">
                  <Link className="nav-link" to="/cart">
                    <div className="track-order-wrapper">
                      <button
                        className="nav-link btn btn-link"
                        onMouseEnter={() => handleIconHover("cart")}
                        onMouseLeave={() => handleIconHover(null)}
                      >
                        <i className="bi bi-cart3"></i>
                        <span className="badge cart-count ms-1">
                          {getCartItemCount()}
                        </span>
                      </button>
                      <span
                        className={`item-name ${
                          activeItem === "cart" ? "show" : ""
                        }`}
                      >
                        Cart
                      </span>
                    </div>
                  </Link>
                </li>

                {user ? (
                  <li className="nav-item dropdown d-none d-lg-block">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="fa-regular fa-user"></i> {user.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleMyOrdersClick}
                        >
                          My Orders
                        </button>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item d-none d-lg-block">
                    <Link
                      className="nav-link"
                      to="#"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <i className="fa-regular fa-user"></i> Login
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/product"
                  >
                    PRODUCTS
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/Blogc"
                  >
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/video"
                  >
                    Video
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Bottom Fixed Nav for Mobile */}
        <div className="mobile-bottom-nav d-lg-none fixed-bottom bg-white border-top shadow">
          <div className="d-flex justify-content-around align-items-center ">
            {user ? (
              <Link className="nav-link text-center" to="/profile">
                <i className="fa-regular fa-user fs-5"></i>
                <div style={{ fontSize: "12px",color:'black' }}>Profile</div>
              </Link>
            ) : (
              <button
                className="btn nav-link text-center"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fa-regular fa-user fs-5"></i>
                <div style={{ fontSize: "12px" ,color:'black'}}>Login</div>
              </button>
            )}

            <Link
              className="nav-link text-center position-relative"
              to="/cart"
            >
              <i className="bi bi-cart3 fs-5"></i>
              {getCartItemCount() > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
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
    </>
  );
};

export default Header;
