import React, { useEffect } from 'react';
import Link from 'next/link';

const HowItWorks: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll('.step-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: 'fas fa-credit-card',
      title: 'Get Your CityWitty Card',
      description: 'Choose your city and purchase your premium CityWitty Card online with secure payment.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Activate Your Card',
      description: 'Submit your activation request with supporting documents and get your card activated quickly.'
    },
    {
      icon: 'fas fa-gift',
      title: 'Enjoy Exclusive Offers',
      description: 'Present your card at partner merchants and enjoy exclusive discounts and offers citywide.'
    }
  ];

  return (
    <section id="how-it-works" className="py-5" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4AA3DF 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
        background: 'radial-gradient(circle at 20% 80%, rgba(255, 145, 77, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(74, 163, 223, 0.2) 0%, transparent 50%)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div className="container">
        <div className="text-center mb-5 position-relative">
          <h2 className="display-4 fw-bold text-white mb-3">How CityWitty Works</h2>
          <p className="lead text-white opacity-90">Get started with CityWitty in just 3 simple steps</p>
        </div>

        <div className="row position-relative">
          {steps.map((step, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div 
                className="card h-100 text-center border-0 step-card" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transition: 'all 0.5s ease',
                  transform: 'translateY(50px)',
                  opacity: 0,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="card-body p-4">
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #FF914D 0%, #FFB347 100%)',
                        fontSize: '1.2rem',
                        boxShadow: '0 8px 20px rgba(255, 145, 77, 0.4)'
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mt-3"
                      style={{
                        width: '90px',
                        height: '90px',
                        background: 'linear-gradient(135deg, #4AA3DF 0%, #FF914D 100%)',
                        boxShadow: '0 15px 30px rgba(74, 163, 223, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className={`${step.icon} text-white`} style={{ fontSize: '2.2rem' }}></i>
                    </div>
                  </div>
                  <h5 className="card-title mb-3 fw-bold" style={{ fontSize: '1.3rem' }}>{step.title}</h5>
                  <p className="card-text text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 position-relative">
          <Link href="/card/purchase" className="btn btn-lg me-3 px-5 py-3" style={{
            background: 'linear-gradient(135deg, #FF914D 0%, #FFB347 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontWeight: '600',
            boxShadow: '0 10px 30px rgba(255, 145, 77, 0.4)',
            transition: 'all 0.3s ease'
          }}>
            <i className="fas fa-credit-card me-2"></i>
            Get Your Card Now
          </Link>
          <Link href="/contact" className="btn btn-lg px-5 py-3" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50px',
            color: 'white',
            fontWeight: '600',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}>
            <i className="fas fa-question-circle me-2"></i>
            Need Help?
          </Link>
        </div>
      </div>

      <style jsx>{`
        .step-card:hover {
          transform: translateY(-10px) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.15) !important;
        }
        
        .step-card:hover .card-body > div:nth-child(2) > div {
          transform: scale(1.1);
        }
        
        .animate-in {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;