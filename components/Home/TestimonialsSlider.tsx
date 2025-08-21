'use client';

import React from 'react';

const TestimonialsSlider: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      city: 'Mumbai',
      rating: 5,
      text: 'CityWitty Card has saved me so much money! The discounts are genuine and the merchants are top-quality. Highly recommend!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      name: 'Rahul Verma',
      city: 'Delhi',
      rating: 5,
      text: 'Amazing service and great offers. The activation process was smooth and I started saving from day one!',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      name: 'Priya Patel',
      city: 'Bangalore',
      rating: 4,
      text: 'Love the variety of merchants and categories. From gyms to restaurants, CityWitty has it all covered.',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg'
    }
  ];

  return (
    <section className="mb-5">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold">What Our Members Say</h2>
        <p className="lead text-muted">Real experiences from real CityWitty cardholders</p>
      </div>

      <div id="testimonialsCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#testimonialsCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                  <div className="testimonial-card">
                    <div className="text-warning mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <blockquote className="blockquote mb-4">
                      <p className="lead">"{testimonial.text}"</p>
                    </blockquote>
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="60"
                        height="60"
                        style={{ objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="mb-0">{testimonial.name}</h6>
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {testimonial.city}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSlider;