'use client';

import React from 'react';

const CallWidget: React.FC = () => {
  const phoneNumber = '+919876543210'; // Replace with actual phone number

  return (
    <div className="call-widget">
      <a
        href={`tel:${phoneNumber}`}
        className="call-btn"
        aria-label="Call us"
        title="Call us for support"
      >
        <i className="fas fa-phone"></i>
      </a>
    </div>
  );
};

export default CallWidget;