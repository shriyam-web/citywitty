'use client';

import React from 'react';

const HeroCarousel: React.FC = () => {
  // Placeholder images - you can replace these with your own images
  const carouselImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      alt: 'CityWitty Premium Benefits',
      title: 'Exclusive Premium Benefits',
      subtitle: 'Unlock amazing discounts across your favorite merchants'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg',
      alt: 'CityWitty Card Features',
      title: 'Your Gateway to Savings',
      subtitle: 'One card, unlimited possibilities across multiple cities'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      alt: 'CityWitty Merchants',
      title: 'Trusted Partner Network',
      subtitle: 'Join thousands of satisfied customers saving every day'
    }
  ];

  return (
    <section className="hero-carousel-section">
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {carouselImages.map((image, index) => (
            <div key={image.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="carousel-image-container">
                <img
                  src={image.src}
                  className="d-block w-100 carousel-image"
                  alt={image.alt}
                />
                <div className="carousel-overlay"></div>
              </div>
              <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                      <h1 className="carousel-title animate__animated animate__fadeInUp">
                        {image.title}
                      </h1>
                      <p className="carousel-subtitle animate__animated animate__fadeInUp animate__delay-1s">
                        {image.subtitle}
                      </p>
                      <div className="carousel-cta animate__animated animate__fadeInUp animate__delay-2s">
                        <a href="/card/purchase" className="btn btn-carousel-primary btn-lg me-3">
                          <i className="fas fa-credit-card me-2"></i>
                          Get Your Card Now
                        </a>
                        <a href="/merchants" className="btn btn-carousel-secondary btn-lg">
                          <i className="fas fa-store me-2"></i>
                          Explore Merchants
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;