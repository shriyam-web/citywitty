'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

const TrackStatusPage: React.FC = () => {
  const { state } = useApp();
  const [serviceNumber, setServiceNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSearchResult(null);

    if (!serviceNumber.trim()) {
      setError('Please enter a service number');
      return;
    }

    // Search in cards
    const card = state.cards.find(c => c.serviceNumber === serviceNumber);
    if (card) {
      setSearchResult({ type: 'card', data: card });
      return;
    }

    // Search in activation requests
    const request = state.activationRequests.find(r => r.serviceNumber === serviceNumber);
    if (request) {
      const relatedCard = state.cards.find(c => c.id === request.cardId);
      setSearchResult({ type: 'activation', data: request, card: relatedCard });
      return;
    }

    setError('Service number not found. Please check and try again.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'under_review': return 'info';
      case 'rejected': return 'danger';
      case 'expired': return 'secondary';
      case 'cancelled': return 'dark';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return 'fas fa-check-circle';
      case 'pending': return 'fas fa-clock';
      case 'under_review': return 'fas fa-search';
      case 'rejected': return 'fas fa-times-circle';
      case 'expired': return 'fas fa-calendar-times';
      case 'cancelled': return 'fas fa-ban';
      default: return 'fas fa-question-circle';
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="section-title">Track Your Status</h1>
        <p className="section-subtitle">
          Enter your service number to check your card or activation status
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-premium">
            <div className="card-body p-4">
              <form onSubmit={handleSearch}>
                <div className="mb-3">
                  <label htmlFor="serviceNumber" className="form-label fw-bold">
                    <i className="fas fa-hashtag me-2"></i>
                    Service Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="serviceNumber"
                    value={serviceNumber}
                    onChange={(e) => setServiceNumber(e.target.value)}
                    placeholder="e.g., CW-20240115-001"
                    required
                  />
                  <div className="form-text">
                    Enter the service number you received after purchase or activation request
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-search me-2"></i>
                  Track Status
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {searchResult && (
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div className="card shadow-premium">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-info-circle me-2"></i>
                  Status Information
                </h5>
              </div>
              <div className="card-body p-4">
                {searchResult.type === 'card' && (
                  <div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6 className="fw-bold mb-2">Service Number</h6>
                        <p className="text-primary fs-5">{searchResult.data.serviceNumber}</p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <h6 className="fw-bold mb-2">Current Status</h6>
                        <span className={`badge bg-${getStatusColor(searchResult.data.status)} fs-6`}>
                          <i className={`${getStatusIcon(searchResult.data.status)} me-2`}></i>
                          {searchResult.data.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <h6 className="fw-bold">Plan</h6>
                        <p className="text-muted">{searchResult.data.plan}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="fw-bold">City</h6>
                        <p className="text-muted">{searchResult.data.city}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="fw-bold">Purchase Date</h6>
                        <p className="text-muted">
                          {new Date(searchResult.data.purchasedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="fw-bold">Expires On</h6>
                        <p className="text-muted">
                          {new Date(searchResult.data.expiresAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {searchResult.data.status === 'pending' && (
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        Your card is ready for activation. 
                        <a href="/card/activate" className="alert-link ms-2">
                          Request activation now
                        </a>
                      </div>
                    )}

                    {searchResult.data.status === 'active' && (
                      <div className="alert alert-success">
                        <i className="fas fa-check-circle me-2"></i>
                        Your card is active! You can now enjoy discounts at partner merchants.
                      </div>
                    )}
                  </div>
                )}

                {searchResult.type === 'activation' && (
                  <div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6 className="fw-bold mb-2">Service Number</h6>
                        <p className="text-primary fs-5">{searchResult.data.serviceNumber}</p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <h6 className="fw-bold mb-2">Activation Status</h6>
                        <span className={`badge bg-${getStatusColor(searchResult.data.status)} fs-6`}>
                          <i className={`${getStatusIcon(searchResult.data.status)} me-2`}></i>
                          {searchResult.data.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <h6 className="fw-bold">Request Submitted</h6>
                        <p className="text-muted">
                          {new Date(searchResult.data.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {searchResult.data.processedAt && (
                        <div className="col-md-6 mb-3">
                          <h6 className="fw-bold">Processed On</h6>
                          <p className="text-muted">
                            {new Date(searchResult.data.processedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <h6 className="fw-bold">Supporting Information</h6>
                      <p className="text-muted">{searchResult.data.supportingInfo}</p>
                    </div>

                    {searchResult.data.status === 'pending' && (
                      <div className="alert alert-warning">
                        <i className="fas fa-clock me-2"></i>
                        Your activation request is being reviewed. We'll update you within 24-48 hours.
                      </div>
                    )}

                    {searchResult.data.status === 'active' && (
                      <div className="alert alert-success">
                        <i className="fas fa-check-circle me-2"></i>
                        Congratulations! Your card has been activated successfully.
                      </div>
                    )}

                    {searchResult.data.status === 'rejected' && (
                      <div className="alert alert-danger">
                        <i className="fas fa-times-circle me-2"></i>
                        Your activation request was rejected. Please contact support for assistance.
                      </div>
                    )}
                  </div>
                )}

                <div className="text-center mt-4">
                  <a href="/contact" className="btn btn-outline-primary">
                    <i className="fas fa-headset me-2"></i>
                    Need Help? Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card bg-light">
            <div className="card-body p-4">
              <h5 className="mb-3">
                <i className="fas fa-question-circle text-primary me-2"></i>
                Don't have a service number?
              </h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h6>For Card Purchase:</h6>
                  <p className="text-muted mb-2">
                    You receive a service number immediately after successful payment.
                  </p>
                  <a href="/card/purchase" className="btn btn-primary btn-sm">
                    <i className="fas fa-credit-card me-2"></i>
                    Purchase Card
                  </a>
                </div>
                <div className="col-md-6 mb-3">
                  <h6>For Activation:</h6>
                  <p className="text-muted mb-2">
                    Submit an activation request to get a tracking number.
                  </p>
                  <a href="/card/activate" className="btn btn-secondary btn-sm">
                    <i className="fas fa-play me-2"></i>
                    Request Activation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackStatusPage;