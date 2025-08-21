'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AdminLoginPage: React.FC = () => {
  const { adminLogin } = useApp();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = adminLogin(password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid admin password. Try: admin123');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-premium">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="fas fa-user-shield text-danger fs-1 mb-3"></i>
                <h2 className="text-danger">Admin Access</h2>
                <p className="text-muted">Enter admin password to continue</p>
              </div>

              {error && (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <i className="fas fa-lock me-2"></i>
                    Admin Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-danger w-100 mb-3">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Access Admin Panel
                </button>
              </form>

              <div className="text-center">
                <Link href="/auth/login" className="btn btn-outline-primary btn-sm">
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to User Login
                </Link>
              </div>

              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="fw-bold mb-2">Demo Admin Password:</h6>
                <small className="text-muted">admin123</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;