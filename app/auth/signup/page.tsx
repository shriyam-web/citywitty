'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage: React.FC = () => {
  const { signup, state } = useApp();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Mumbai'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const cities = ['Mumbai', 'Delhi', 'Bangalore'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const success = await signup(formData);
    if (success) {
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => router.push('/'), 2000);
    } else {
      setError('Email already exists. Please use a different email.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                <i className="fas fa-user-plus text-primary fs-1 mb-3"></i>
                <h2 className="gradient-text">Join CityWitty</h2>
                <p className="text-muted">Create your account and start saving today</p>
              </div>

              {error && (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle me-2"></i>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    <i className="fas fa-user me-2"></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

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

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-bold">
                    <i className="fas fa-phone me-2"></i>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="form-label fw-bold">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    City
                  </label>
                  <select
                    className="form-select"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={state.loading}
                >
                  {state.loading ? (
                    <>
                      <span className="loading-spinner me-2"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-muted mb-3">Already have an account?</p>
                <Link href="/auth/login" className="btn btn-outline-primary">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;