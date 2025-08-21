'use client';

'use client';

import React from 'react';
import Link from 'next/link';

const StickyCTABar: React.FC = () => {
  return (
    <div className="sticky-cta-bar d-md-none">
      <div className="row g-2">
        <div className="col-6">
          <Link href="/card/purchase" className="btn btn-primary w-100">
            <i className="fas fa-credit-card me-1"></i>
            Get Card
          </Link>
        </div>
        <div className="col-6">
          <Link href="/track-status" className="btn btn-outline-primary w-100">
            <i className="fas fa-search me-1"></i>
            Track Status
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;