'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const { login, state } = useApp();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(formData.email, formData.password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid email or password. Try: john@example.com / password123');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-premium">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="fas fa-credit-card text-primary fs-1 mb-3"></i>
                <h2 className="gradient-text">Welcome Back</h2>
                <p className="text-muted">Sign in to your CityWitty account</p>
              </div>

              {error && (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    <i className="fas fa-envelope me-2"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <i className="fas fa-lock me-2"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={state.loading}
                >
                  {state.loading ? (
                    <>
                      <span className="loading-spinner me-2"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-muted mb-3">Don't have an account?</p>
                <Link href="/auth/signup" className="btn btn-outline-primary">
                  <i className="fas fa-user-plus me-2"></i>
                  Create Account
                </Link>
              </div>

              <hr className="my-4" />

              <div className="text-center">
                <Link href="/auth/admin" className="btn btn-outline-secondary btn-sm">
                  <i className="fas fa-user-shield me-2"></i>
                  Admin Login
                </Link>
              </div>

              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="fw-bold mb-2">Demo Credentials:</h6>
                <small className="text-muted">
                  Email: john@example.com<br />
                  Password: password123
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;