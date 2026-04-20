import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import facebook from "../../assets/Footer/fb.png";
import twitter from "../../assets/Footer/twitter.png";
import whatsapp from "../../assets/Footer/whatsapp.png";
import instagram from "../../assets/Footer/instagram.png";
import logo from "../../assets/Home/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="text-white pt-5 footer-lg-margin bg-dark">
      <div className="container text-start">
        <div
          className="row justify-content-center"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Column 1 */}
          <div className="col-12 col-md-5 col-lg-5 mb-4">
            <img
              src={logo}
              alt="Fashion Hub Logo"
              className="img-fluid mb-3"
              style={{ maxWidth: "60px" }}
            />

            <p className="small mb-3" style={{ maxWidth: "400px" }}>
              Founded in 2025, <strong>Fashion Hub</strong> is your premium
              destination for trendy clothing, stylish accessories, and modern
              fashion collections for men, women, and kids. We bring elegance,
              comfort, and confidence to your wardrobe.
            </p>

            <div className="d-flex gap-3">
              <img src={instagram} alt="Instagram" width="20" />
              <img src={facebook} alt="Facebook" width="20" />
              <img src={twitter} alt="Twitter" width="20" />
              <img src={whatsapp} alt="WhatsApp" width="20" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-12 col-md-3 col-lg-3 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>

            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>

              <li className="mb-2">
                <a href="/about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>

              <li className="mb-2">
                <a href="/collections" className="text-white text-decoration-none">
                  Collections
                </a>
              </li>

              <li className="mb-2">
                <a href="/contact" className="text-white text-decoration-none">
                  Contact Us
                </a>
              </li>

              <li className="mb-2">
                <a href="/privacy-policy" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>

              <li className="mb-2">
                <a href="/terms" className="text-white text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-12 col-md-4 col-lg-4 mb-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>

            <p className="small mb-2">
              <i className="bi bi-geo-alt-fill text-warning me-2"></i>
               Fashion Plaza,<br />
              Saswad Road, Pune - 411001,<br />
              Maharashtra, India
            </p>

            <p className="small mb-2">
              <i className="bi bi-telephone-fill text-warning me-2"></i>
              +91 7885697845
            </p>

            <p className="small mb-2">
              <i className="bi bi-envelope-fill text-warning me-2"></i>
              support@fashionhub.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center border-top pt-3 mt-3 small">
          © 2026 Fashion Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;