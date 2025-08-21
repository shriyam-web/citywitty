'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

const CategoriesGrid: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleCategorySelect = (categoryName: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryName });
  };

  return (
    <section className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{
            background: 'linear-gradient(135deg, #4AA3DF 0%, #FF914D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Explore Our Categories
          </h2>
          <p className="lead text-muted">Discover exclusive offers across various categories in your city</p>
        </div>
        
        <div className="row g-4 mb-5">
          {state.categories.filter(c => c.isActive).map((category) => (
            <div key={category.id} className="col-lg-3 col-md-4 col-sm-6">
              <div 
                className="card h-100 border-0 shadow-sm category-card"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  borderRadius: '20px'
                }}
                onClick={() => handleCategorySelect(category.name)}
              >
                <div className="card-body text-center p-4">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #4AA3DF 0%, #FF914D 100%)',
                      boxShadow: '0 8px 25px rgba(74, 163, 223, 0.3)'
                    }}
                  >
                    <i className={`${category.icon} text-white fs-3`}></i>
                  </div>
                  <h6 className="card-title fw-bold mb-2">{category.name}</h6>
                  <small className="text-muted">Coming Soon</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="card border-0 shadow-lg p-5" style={{
            background: 'linear-gradient(135deg, rgba(74, 163, 223, 0.1) 0%, rgba(255, 145, 77, 0.1) 100%)',
            borderRadius: '25px'
          }}>
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h3 className="fw-bold mb-3">🚀 Merchants Will Be Live Soon!</h3>
                <p className="lead text-muted mb-0">
                  We're onboarding amazing merchants across all categories. Get your CityWitty Card now and be ready for exclusive offers!
                </p>
              </div>
              <div className="col-lg-4">
                <Link href="/card/purchase" className="btn btn-lg px-5 py-3" style={{
                  background: 'linear-gradient(135deg, #FF914D 0%, #FFB347 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  fontWeight: '600',
                  boxShadow: '0 8px 25px rgba(255, 145, 77, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="fas fa-credit-card me-2"></i>
                  Get Your Card Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        
        .category-card:hover .card-body > div {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default CategoriesGrid;