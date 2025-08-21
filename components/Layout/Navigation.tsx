'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

const Navigation: React.FC = () => {
  const { state, logout } = useApp();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Dynamically import Bootstrap JS only on client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
          <div className="d-flex align-items-center">
            <div className="navbar-brand-logo me-3">
              <i className="fas fa-credit-card text-white fs-5"></i>
            </div>
            <span className="navbar-brand-text">CityWitty</span>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/merchants" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Merchants
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/card/purchase" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Get Card
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/track-status" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Track Status
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/merchant/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Partner with Us
              </Link>
            </li>
          </ul>

          <div className="navbar-nav">
            {state.isAuthenticated ? (
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user me-1"></i>
                  {state.currentUser?.name}
                  {state.isAdmin && <span className="badge bg-danger ms-2">Admin</span>}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link href="/profile" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-user me-2"></i>Profile
                    </Link>
                  </li>
                  {state.isAdmin && (
                    <li>
                      <Link href="/admin" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                        <i className="fas fa-tachometer-alt me-2"></i>Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link href="/auth/login" className="btn btn-outline-primary btn-sm" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/auth/signup" className="btn btn-primary btn-sm" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;