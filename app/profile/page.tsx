'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

const ProfilePage: React.FC = () => {
  const { state, logout } = useApp();

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
                  Please login to view your profile
                </p>
                <Link href="/auth/login" className="btn btn-primary me-3">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Login
                </Link>
                <Link href="/auth/signup" className="btn btn-outline-primary">
                  <i className="fas fa-user-plus me-2"></i>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userCards = state.cards.filter(card => card.userId === state.currentUser?.id);
  const userActivationRequests = state.activationRequests.filter(req => req.userId === state.currentUser?.id);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card shadow-premium mb-4">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <div className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-user text-white fs-2"></i>
                </div>
              </div>
              <h4>{state.currentUser?.name}</h4>
              <p className="text-muted mb-3">{state.currentUser?.email}</p>
              {state.isAdmin && (
                <span className="badge bg-danger mb-3">Administrator</span>
              )}
              <div className="d-grid gap-2">
                <Link href="/card/purchase" className="btn btn-primary">
                  <i className="fas fa-credit-card me-2"></i>
                  Purchase New Card
                </Link>
                <button className="btn btn-outline-danger" onClick={logout}>
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow-premium">
            <div className="card-body">
              <h6 className="card-title mb-3">
                <i className="fas fa-info-circle text-primary me-2"></i>
                Account Details
              </h6>
              <div className="mb-2">
                <small className="text-muted">Phone:</small>
                <div>{state.currentUser?.phone}</div>
              </div>
              <div className="mb-2">
                <small className="text-muted">City:</small>
                <div>{state.currentUser?.city}</div>
              </div>
              <div className="mb-2">
                <small className="text-muted">Member Since:</small>
                <div>{new Date(state.currentUser?.createdAt || '').toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-premium mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-credit-card me-2"></i>
                My CityWitty Cards
              </h5>
            </div>
            <div className="card-body">
              {userCards.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-credit-card text-muted fs-1 mb-3"></i>
                  <h5>No Cards Yet</h5>
                  <p className="text-muted mb-3">You haven't purchased any CityWitty cards yet.</p>
                  <Link href="/card/purchase" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>
                    Purchase Your First Card
                  </Link>
                </div>
              ) : (
                <div className="row">
                  {userCards.map((card) => (
                    <div key={card.id} className="col-md-6 mb-3">
                      <div className="card border">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="card-title mb-0">{card.plan}</h6>
                            <span className={`badge bg-${
                              card.status === 'active' ? 'success' :
                              card.status === 'pending' ? 'warning' :
                              card.status === 'expired' ? 'secondary' : 'danger'
                            }`}>
                              {card.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-muted mb-2">
                            <i className="fas fa-hashtag me-1"></i>
                            {card.serviceNumber}
                          </p>
                          <p className="text-muted mb-2">
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {card.city}
                          </p>
                          <div className="row text-center">
                            <div className="col-6">
                              <small className="text-muted">Price</small>
                              <div className="fw-bold">₹{card.price}</div>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">Expires</small>
                              <div className="fw-bold">
                                {new Date(card.expiresAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          {card.status === 'pending' && (
                            <div className="mt-3">
                              <Link 
                                href="/card/activate" 
                                className="btn btn-outline-primary btn-sm w-100"
                              >
                                <i className="fas fa-play me-2"></i>
                                Request Activation
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card shadow-premium">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">
                <i className="fas fa-clock me-2"></i>
                Activation Requests
              </h5>
            </div>
            <div className="card-body">
              {userActivationRequests.length === 0 ? (
                <div className="text-center py-3">
                  <i className="fas fa-clock text-muted fs-2 mb-2"></i>
                  <p className="text-muted mb-0">No activation requests submitted yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Service Number</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userActivationRequests.map((request) => (
                        <tr key={request.id}>
                          <td>{request.serviceNumber}</td>
                          <td>
                            <span className={`badge bg-${
                              request.status === 'active' ? 'success' :
                              request.status === 'rejected' ? 'danger' :
                              request.status === 'under_review' ? 'info' : 'warning'
                            }`}>
                              {request.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td>{new Date(request.submittedAt).toLocaleDateString()}</td>
                          <td>
                            <Link 
                              href="/track-status" 
                              className="btn btn-outline-primary btn-sm"
                            >
                              <i className="fas fa-search me-1"></i>
                              Track
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;