'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

const MerchantsCarousel: React.FC = () => {
  const { getFilteredMerchants } = useApp();
  const merchants = getFilteredMerchants();

  if (merchants.length === 0) {
    return (
      <section className="mb-5">
        <div className="text-center mb-4">
          <h3>Featured Merchants</h3>
          <p className="text-muted">Our merchants will be live soon! Get ready for amazing offers</p>
        </div>
        <div className="empty-state">
          <i className="fas fa-rocket text-primary fs-1 mb-3"></i>
          <h4>Merchants Coming Soon!</h4>
          <p>We're onboarding amazing merchants across all categories.</p>
          <p>Be the first to get exclusive offers when we launch!</p>
          <a href="/card/purchase" className="btn btn-primary mt-3">
            <i className="fas fa-bell me-2"></i>
            Get Notified
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-5">
      <div className="text-center mb-4">
        <h3>Featured Merchants</h3>
        <p className="text-muted">Discover amazing offers from our partner merchants</p>
      </div>
      
      <div className="merchant-grid">
        {merchants.slice(0, 6).map((merchant) => (
          <div key={merchant.id} className="card h-100">
            <img
              src={merchant.images[0] || 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'}
              className="card-img-top"
              alt={merchant.storeName}
            />
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title mb-0">{merchant.storeName}</h5>
                <div className="text-end">
                  <div className="text-warning">
                    {[...Array(Math.floor(merchant.rating))].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    {merchant.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                  </div>
                  <small className="text-muted">{merchant.rating}/5</small>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="badge bg-primary me-2">
                  <i className={`fas ${
                    merchant.category === 'Gym' ? 'fa-dumbbell' :
                    merchant.category === 'Fashion' ? 'fa-tshirt' :
                    merchant.category === 'Electronics' ? 'fa-mobile-alt' :
                    merchant.category === 'Salon' ? 'fa-cut' :
                    merchant.category === 'Restaurant' ? 'fa-utensils' :
                    'fa-store'
                  } me-1`}></i>
                  {merchant.category}
                </span>
                <span className="badge bg-secondary">
                  <i className="fas fa-map-marker-alt me-1"></i>
                  {merchant.city}
                </span>
              </div>
              
              <p className="card-text text-muted mb-3">
                {merchant.offerDetails.length > 80
                  ? `${merchant.offerDetails.substring(0, 80)}...`
                  : merchant.offerDetails}
              </p>
              
              <div className="text-center">
                <Link href={`/merchants/${merchant.id}`} className="btn btn-primary">
                  <i className="fas fa-eye me-2"></i>
                  View Offer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {merchants.length > 6 && (
        <div className="text-center mt-4">
          <Link href="/merchants" className="btn btn-outline-primary btn-lg">
            <i className="fas fa-store me-2"></i>
            View All Merchants
          </Link>
        </div>
      )}
    </section>
  );
};

export default MerchantsCarousel;