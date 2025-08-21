'use client';

import React from 'react';

const WhatsAppWidget: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+919876543210'; // Replace with actual WhatsApp business number
    const message = 'Hi! I need help with CityWitty card.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-widget">
      <button
        onClick={handleWhatsAppClick}
        className="whatsapp-btn"
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </button>
    </div>
  );
};

export default WhatsAppWidget;