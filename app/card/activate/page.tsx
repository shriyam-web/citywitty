'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const CardActivatePage: React.FC = () => {
  const { submitActivationRequest, state } = useApp();
  const router = useRouter();
  const [formData, setFormData] = useState({
    serviceNumber: '',
    cardId: '',
    userId: state.currentUser?.id || '',
    supportingInfo: ''
  });
  const [success, setSuccess] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!state.isAuthenticated) {
      setError('Please login to request card activation');
      return;
    }

    // Find the card by service number
    const card = state.cards.find(c => c.serviceNumber === formData.serviceNumber);
    if (!card) {
      setError('Invalid service number. Please check and try again.');
      return;
    }

    if (card.status === 'active') {
      setError('This card is already active.');
      return;
    }

    try {
      const reqId = await submitActivationRequest({
        ...formData,
        cardId: card.id
      });
      setRequestId(reqId);
      setSuccess(true);
    } catch (error) {
      setError('Failed to submit activation request. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!state.isAuthenticated) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-premium">
              <div className="card-body text-center p-5">
                <i className="fas fa-lock text-warning fs-1 mb-3"></i>
                <h3>Login Required</h3>
                <p className="text-muted mb-4">
                  Please login to your account to request card activation
                </p>
                <a href="/auth/login" className="btn btn-primary me-3">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Login
                </a>
                <a href="/auth/signup" className="btn btn-outline-primary">
                  <i className="fas fa-user-plus me-2"></i>
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="section-title">Activate Your CityWitty Card</h1>
        <p className="section-subtitle">
          Submit your activation request to start enjoying exclusive benefits
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-premium">
            <div className="card-body p-5">
              {success ? (
                <div className="text-center">
                  <i className="fas fa-check-circle text-success fs-1 mb-3"></i>
                  <h3 className="text-success mb-3">Activation Request Submitted!</h3>
                  <p className="text-muted mb-4">
                    Your activation request has been submitted successfully. We'll review it within 24-48 hours.
                  </p>
                  
                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h5>Your Request ID</h5>
                      <h3 className="text-primary">{requestId}</h3>
                      <p className="text-muted mb-0">
                        Use this ID to track your activation status
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => router.push('/track-status')}
                    >
                      <i className="fas fa-search me-2"></i>
                      Track Status
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setSuccess(false)}
                    >
                      <i className="fas fa-plus me-2"></i>
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <label htmlFor="serviceNumber" className="form-label fw-bold">
                      <i className="fas fa-hashtag me-2"></i>
                      Service Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="serviceNumber"
                      name="serviceNumber"
                      value={formData.serviceNumber}
                      onChange={handleChange}
                      placeholder="e.g., CW-20240115-001"
                      required
                    />
                    <div className="form-text">
                      Enter the service number you received after purchasing your card
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="supportingInfo" className="form-label fw-bold">
                      <i className="fas fa-info-circle me-2"></i>
                      Supporting Information
                    </label>
                    <textarea
                      className="form-control"
                      id="supportingInfo"
                      name="supportingInfo"
                      rows={4}
                      value={formData.supportingInfo}
                      onChange={handleChange}
                      placeholder="Please provide any additional information that might help us process your activation request..."
                      required
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={state.loading}
                    >
                      {state.loading ? (
                        <>
                          <span className="loading-spinner me-2"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Submit Activation Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card bg-light">
            <div className="card-body p-4">
              <h5 className="mb-3">
                <i className="fas fa-lightbulb text-warning me-2"></i>
                Activation Process
              </h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="text-center">
                    <i className="fas fa-paper-plane text-primary fs-2 mb-2"></i>
                    <h6>1. Submit Request</h6>
                    <small className="text-muted">Fill out the activation form with your service number</small>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="text-center">
                    <i className="fas fa-search text-info fs-2 mb-2"></i>
                    <h6>2. Review Process</h6>
                    <small className="text-muted">Our team reviews your request within 24-48 hours</small>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="text-center">
                    <i className="fas fa-check-circle text-success fs-2 mb-2"></i>
                    <h6>3. Card Activated</h6>
                    <small className="text-muted">Start enjoying exclusive discounts immediately</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardActivatePage;