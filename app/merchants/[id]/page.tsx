'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const MerchantDetailPage: React.FC = () => {
  const { state } = useApp();
  const params = useParams();
  const merchantId = params.id as string;

  const merchant = state.merchants.find(m => m.id === merchantId);

  if (!merchant) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <i className="fas fa-store"></i>
          <h4>Merchant Not Found</h4>
          <p>The merchant you're looking for doesn't exist or has been removed.</p>
          <Link href="/merchants" className="btn btn-primary">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Merchants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-premium mb-4">
            <img
              src={merchant.images[0] || 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'}
              className="card-img-top"
              alt={merchant.storeName}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="card-title mb-2">{merchant.storeName}</h1>
                  <p className="text-muted mb-0">
                    <i className="fas fa-user me-2"></i>
                    Owned by {merchant.ownerName}
                  </p>
                </div>
                <div className="text-end">
                  <div className="text-warning fs-5">
                    {[...Array(Math.floor(merchant.rating))].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    {merchant.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                  </div>
                  <p className="mb-0 fw-bold">{merchant.rating}/5 Rating</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="badge bg-primary me-2 fs-6">
                  <i className={`fas ${
                    merchant.category === 'Gym' ? 'fa-dumbbell' :
                    merchant.category === 'Fashion' ? 'fa-tshirt' :
                    merchant.category === 'Electronics' ? 'fa-mobile-alt' :
                    merchant.category === 'Salon' ? 'fa-cut' :
                    merchant.category === 'Restaurant' ? 'fa-utensils' :
                    'fa-store'
                  } me-2`}></i>
                  {merchant.category}
                </span>
                <span className="badge bg-secondary fs-6">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {merchant.city}
                </span>
                <span className="badge bg-success fs-6">
                  <i className="fas fa-check-circle me-2"></i>
                  Verified Partner
                </span>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">
                  <i className="fas fa-gift text-primary me-2"></i>
                  Exclusive Offer
                </h5>
                <div className="alert alert-info border-gradient">
                  <h6 className="fw-bold mb-2">🎉 Special CityWitty Discount!</h6>
                  <p className="mb-0">{merchant.offerDetails}</p>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  Location & Contact
                </h5>
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                      {merchant.address}
                    </p>
                    <p className="mb-2">
                      <i className="fas fa-phone me-2 text-muted"></i>
                      <a href={`tel:${merchant.phone}`} className="text-decoration-none">
                        {merchant.phone}
                      </a>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <i className="fas fa-envelope me-2 text-muted"></i>
                      <a href={`mailto:${merchant.email}`} className="text-decoration-none">
                        {merchant.email}
                      </a>
                    </p>
                    <p className="mb-2">
                      <i className="fas fa-calendar me-2 text-muted"></i>
                      Partner since {new Date(merchant.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-premium mb-4">
            <div className="card-body text-center">
              <h5 className="card-title gradient-text mb-3">Redeem This Offer</h5>
              <p className="text-muted mb-4">
                Show your active CityWitty Card to avail this exclusive discount
              </p>
              
              {state.isAuthenticated ? (
                <div>
                  <Link href="/card/purchase" className="btn btn-primary w-100 mb-3">
                    <i className="fas fa-credit-card me-2"></i>
                    Get CityWitty Card
                  </Link>
                  <Link href="/track-status" className="btn btn-outline-primary w-100">
                    <i className="fas fa-search me-2"></i>
                    Check Card Status
                  </Link>
                </div>
              ) : (
                <div>
                  <Link href="/auth/signup" className="btn btn-primary w-100 mb-3">
                    <i className="fas fa-user-plus me-2"></i>
                    Sign Up to Get Card
                  </Link>
                  <Link href="/auth/login" className="btn btn-outline-primary w-100">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="card shadow-premium">
            <div className="card-body">
              <h6 className="card-title mb-3">
                <i className="fas fa-info-circle text-primary me-2"></i>
                Quick Stats
              </h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Offers:</span>
                <span className="fw-bold">{merchant.totalOffers}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Rating:</span>
                <span className="fw-bold">{merchant.rating}/5</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Category:</span>
                <span className="fw-bold">{merchant.category}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Status:</span>
                <span className="badge bg-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link href="/merchants" className="btn btn-outline-primary">
          <i className="fas fa-arrow-left me-2"></i>
          Back to All Merchants
        </Link>
      </div>
    </div>
  );
};

export default MerchantDetailPage;