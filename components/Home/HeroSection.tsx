'use client';

import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-floating-elements">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 fade-in-left">
            <div className="hero-content fade-in-up">
              <h1 className="hero-title">
                Unlock Your City's
                <span className="d-block" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FF914D 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Premium Lifestyle
                </span>
              </h1>
              <p className="hero-subtitle">
                Experience luxury with exclusive access to premium restaurants, elite gyms, 
                high-end salons, and boutique stores. Your CityWitty Card is your gateway to 
                the city's finest establishments.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-4 mt-5">
                <Link href="/card/purchase" className="btn btn-lg px-5 py-3 pulse-animation" style={{ 
                  background: 'linear-gradient(135deg, #FF914D 0%, #FFB347 100%)', 
                  border: 'none', 
                  borderRadius: '50px',
                  boxShadow: '0 8px 25px rgba(255, 145, 77, 0.4)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="fas fa-credit-card me-2"></i>
                  Get Premium Access
                </Link>
                <Link href="#how-it-works" className="btn btn-lg px-5 py-3" style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '50px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="fas fa-play-circle me-2"></i>
                  Discover More
                </Link>
              </div>
              <div className="hero-stats">
                <div className="row text-center">
                  <div className="col-4">
                    <h3 className="mb-1" style={{ color: '#FFD700', fontWeight: '700' }}>500+</h3>
                    <small className="text-light opacity-90" style={{ fontSize: '0.9rem' }}>Premium Partners</small>
                  </div>
                  <div className="col-4">
                    <h3 className="mb-1" style={{ color: '#FFD700', fontWeight: '700' }}>3</h3>
                    <small className="text-light opacity-90" style={{ fontSize: '0.9rem' }}>Metro Cities</small>
                  </div>
                  <div className="col-4">
                    <h3 className="mb-1" style={{ color: '#FFD700', fontWeight: '700' }}>50K+</h3>
                    <small className="text-light opacity-90" style={{ fontSize: '0.9rem' }}>Elite Members</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-center fade-in-right">
            <div className="hero-image fade-in-up position-relative">
              <img
                src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg"
                alt="CityWitty Card Benefits"
                className="img-fluid float-animation"
                style={{ 
                  maxHeight: '600px', 
                  objectFit: 'cover',
                  borderRadius: '30px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  border: '3px solid rgba(255,255,255,0.2)'
                }}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                background: 'linear-gradient(135deg, rgba(255,145,77,0.1) 0%, rgba(74,163,223,0.1) 100%)',
                borderRadius: '30px',
                pointerEvents: 'none'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;