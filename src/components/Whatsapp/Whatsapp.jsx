import React from "react";
import wpLogo from "../../assets/image/WhatsApp_icon-removebg-preview.png";
import "./WhatsApp.css";

const WhatsApp = () => {
  const targetNumber = "";
  const defaultMessage =
    "Hello! I want to know more about your products.";

  const handleWhatsAppRedirect = () => {
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="whatsapp-container">
      <div className="whatsapp-tooltip">Chat with us</div>

      <button
        className="whatsapp-btn"
        onClick={handleWhatsAppRedirect}
      >
        <img src={wpLogo} alt="WhatsApp" className="whatsapp-icon" />
      </button>
    </div>
  );
};

export default WhatsApp;