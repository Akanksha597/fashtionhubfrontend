import React from "react";
import wpLogo from "../../assets/image/WhatsApp_icon-removebg-preview.png";

const WhatsApp = () => {
  // Target WhatsApp number and a default message
  const targetNumber = "8888678929";
  const defaultMessage ="Hello! I want to know more about your products."

  // Redirect user to WhatsApp Web/Mobile with the pre-filled message
  const handleWhatsAppRedirect = () => {
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      {/* WhatsApp Button */}
      <button onClick={handleWhatsAppRedirect} style={{ border: "none", background: "none" }}>
        <img src={wpLogo} alt="WhatsApp" width={60} style={{ opacity: "0.5" }} />
      </button>
    </div>
  );
};

export default WhatsApp;
