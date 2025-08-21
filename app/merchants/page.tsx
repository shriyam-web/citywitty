'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

const MerchantsPage: React.FC = () => {
  const { getFilteredMerchants, state, dispatch } = useApp();
  const merchants = getFilteredMerchants();

  const handleCityChange = (city: string) => {
    dispatch({ type: 'SET_SELECTED_CITY', payload: city });
  };

  const handleCategoryChange = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore'];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="section-title">Our Partner Merchants</h1>
        <p className="section-subtitle">
          Discover amazing offers from our verified partner merchants across your city
        </p>
      </div>

      {/* Filters */}
      <div className="row mb-5">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Filter by City</label>
          <select
            className="form-select"
            value={state.selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Filter by Category</label>
          <select
            className="form-select"
            value={state.selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            {state.categories.filter(c => c.isActive).map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-pills justify-content-center mb-5">
        <div
          className={`category-pill ${
            state.selectedCategory === 'All Categories' ? 'active' : ''
          }`}
          onClick={() => handleCategoryChange('All Categories')}
        >
          <i className="fas fa-th-large me-2"></i>
          All Categories
        </div>
        {state.categories.filter(c => c.isActive).map((category) => (
          <div
            key={category.id}
            className={`category-pill ${
              state.selectedCategory === category.name ? 'active' : ''
            }`}
            onClick={() => handleCategoryChange(category.name)}
          >
            <i className={`${category.icon} me-2`}></i>
            {category.name}
          </div>
        ))}
      </div>

      {/* Merchants Grid */}
      {merchants.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-store"></i>
          <h4>No merchants found</h4>
          <p>Try adjusting your filters to see more merchants.</p>
          <Link href="/merchant/register" className="btn btn-primary mt-3">
            <i className="fas fa-plus me-2"></i>
            Become a Partner
          </Link>
        </div>
      ) : (
        <div className="merchant-grid">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="card h-100 fade-in-up">
              <img
                src={merchant.images[0] || 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'}
                className="card-img-top"
                alt={merchant.storeName}
              />
              <div className="card-body d-flex flex-column">
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
                
                <p className="card-text text-muted mb-3 flex-grow-1">
                  {merchant.offerDetails}
                </p>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted">
                      <i className="fas fa-gift me-1"></i>
                      {merchant.totalOffers} offers available
                    </small>
                    <small className="text-success fw-bold">
                      <i className="fas fa-check-circle me-1"></i>
                      Verified
                    </small>
                  </div>
                  <Link href={`/merchants/${merchant.id}`} className="btn btn-primary w-100">
                    <i className="fas fa-eye me-2"></i>
                    View Details & Offers
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="text-center mt-5 p-5 glass-effect rounded-3">
        <h3 className="gradient-text mb-3">Ready to Start Saving?</h3>
        <p className="text-muted mb-4">
          Get your CityWitty Card today and unlock exclusive discounts at all these amazing merchants!
        </p>
        <Link href="/card/purchase" className="btn btn-secondary btn-lg">
          <i className="fas fa-credit-card me-2"></i>
          Purchase Your Card Now
        </Link>
      </div>
    </div>
  );
};

export default MerchantsPage;