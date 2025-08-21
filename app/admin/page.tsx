'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const AdminDashboard: React.FC = () => {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  if (!state.isAdmin) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-premium">
              <div className="card-body text-center p-5">
                <i className="fas fa-lock text-danger fs-1 mb-3"></i>
                <h3>Access Denied</h3>
                <p className="text-muted mb-4">
                  You need admin privileges to access this page
                </p>
                <a href="/auth/admin" className="btn btn-danger">
                  <i className="fas fa-user-shield me-2"></i>
                  Admin Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const approveMerchant = (merchantId: string) => {
    dispatch({ type: 'APPROVE_MERCHANT', payload: merchantId });
  };

  const rejectMerchant = (merchantId: string) => {
    dispatch({ type: 'REJECT_MERCHANT', payload: merchantId });
  };

  const updateActivationStatus = (requestId: string, status: string) => {
    dispatch({ 
      type: 'UPDATE_ACTIVATION_REQUEST', 
      payload: { 
        id: requestId, 
        data: { 
          status: status as any,
          processedAt: new Date().toISOString(),
          processedBy: state.currentUser?.name || 'Admin'
        }
      }
    });
  };

  const stats = {
    totalMerchants: state.merchants.length,
    activeMerchants: state.merchants.filter(m => m.isActive).length,
    pendingApprovals: state.pendingMerchants.length,
    totalUsers: state.users.length,
    activeCards: state.cards.filter(c => c.status === 'active').length,
    pendingActivations: state.activationRequests.filter(r => r.status === 'pending').length
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 col-md-4">
          <div className="admin-sidebar">
            <div className="text-center mb-4">
              <i className="fas fa-user-shield text-white fs-1 mb-2"></i>
              <h5 className="text-white">Admin Panel</h5>
              <small className="text-light opacity-75">Welcome, {state.currentUser?.name}</small>
            </div>
            
            <nav className="nav flex-column">
              <a 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-tachometer-alt me-2"></i>
                Overview
              </a>
              <a 
                className={`nav-link ${activeTab === 'merchants' ? 'active' : ''}`}
                onClick={() => setActiveTab('merchants')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-store me-2"></i>
                Merchants
              </a>
              <a 
                className={`nav-link ${activeTab === 'approvals' ? 'active' : ''}`}
                onClick={() => setActiveTab('approvals')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-clock me-2"></i>
                Pending Approvals
                {stats.pendingApprovals > 0 && (
                  <span className="badge bg-warning ms-2">{stats.pendingApprovals}</span>
                )}
              </a>
              <a 
                className={`nav-link ${activeTab === 'activations' ? 'active' : ''}`}
                onClick={() => setActiveTab('activations')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-credit-card me-2"></i>
                Card Activations
                {stats.pendingActivations > 0 && (
                  <span className="badge bg-info ms-2">{stats.pendingActivations}</span>
                )}
              </a>
              <a 
                className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
                onClick={() => setActiveTab('categories')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-tags me-2"></i>
                Categories
              </a>
              <a 
                className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-users me-2"></i>
                Users
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9 col-md-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="mb-4">Dashboard Overview</h2>
              
              <div className="row mb-4">
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="stats-card">
                    <i className="fas fa-store fs-1 mb-3"></i>
                    <h3>{stats.totalMerchants}</h3>
                    <p>Total Merchants</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="stats-card orange">
                    <i className="fas fa-users fs-1 mb-3"></i>
                    <h3>{stats.totalUsers}</h3>
                    <p>Registered Users</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="stats-card success">
                    <i className="fas fa-credit-card fs-1 mb-3"></i>
                    <h3>{stats.activeCards}</h3>
                    <p>Active Cards</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="stats-card info">
                    <i className="fas fa-clock fs-1 mb-3"></i>
                    <h3>{stats.pendingApprovals}</h3>
                    <p>Pending Approvals</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="stats-card" style={{ background: 'linear-gradient(135deg, #6f42c1, #e83e8c)' }}>
                    <i className="fas fa-check-circle fs-1 mb-3"></i>
                    <h3>{stats.activeMerchants}</h3>
                    <p>Active Merchants</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="stats-card" style={{ background: 'linear-gradient(135deg, #fd7e14, #ffc107)' }}>
                    <i className="fas fa-hourglass-half fs-1 mb-3"></i>
                    <h3>{stats.pendingActivations}</h3>
                    <p>Pending Activations</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'approvals' && (
            <div>
              <h2 className="mb-4">Pending Merchant Approvals</h2>
              
              {state.pendingMerchants.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-check-circle"></i>
                  <h4>No Pending Approvals</h4>
                  <p>All merchant applications have been processed.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Store Name</th>
                        <th>Owner</th>
                        <th>Category</th>
                        <th>City</th>
                        <th>Applied On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.pendingMerchants.map((merchant) => (
                        <tr key={merchant.id}>
                          <td>
                            <strong>{merchant.storeName}</strong>
                            <br />
                            <small className="text-muted">{merchant.email}</small>
                          </td>
                          <td>{merchant.ownerName}</td>
                          <td>
                            <span className="badge bg-primary">{merchant.category}</span>
                          </td>
                          <td>{merchant.city}</td>
                          <td>{new Date(merchant.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => approveMerchant(merchant.id)}
                            >
                              <i className="fas fa-check me-1"></i>
                              Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => rejectMerchant(merchant.id)}
                            >
                              <i className="fas fa-times me-1"></i>
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activations' && (
            <div>
              <h2 className="mb-4">Card Activation Requests</h2>
              
              {state.activationRequests.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-credit-card"></i>
                  <h4>No Activation Requests</h4>
                  <p>No card activation requests have been submitted yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Service Number</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Supporting Info</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.activationRequests.map((request) => {
                        const user = state.users.find(u => u.id === request.userId);
                        return (
                          <tr key={request.id}>
                            <td>
                              <strong>{request.serviceNumber}</strong>
                            </td>
                            <td>{user?.name || 'Unknown User'}</td>
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
                              <small>{request.supportingInfo.substring(0, 50)}...</small>
                            </td>
                            <td>
                              {request.status === 'pending' && (
                                <div className="btn-group">
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => updateActivationStatus(request.id, 'active')}
                                  >
                                    <i className="fas fa-check me-1"></i>
                                    Activate
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => updateActivationStatus(request.id, 'rejected')}
                                  >
                                    <i className="fas fa-times me-1"></i>
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'merchants' && (
            <div>
              <h2 className="mb-4">Active Merchants</h2>
              
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Store Name</th>
                      <th>Owner</th>
                      <th>Category</th>
                      <th>City</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.merchants.map((merchant) => (
                      <tr key={merchant.id}>
                        <td>
                          <strong>{merchant.storeName}</strong>
                          <br />
                          <small className="text-muted">{merchant.email}</small>
                        </td>
                        <td>{merchant.ownerName}</td>
                        <td>
                          <span className="badge bg-primary">{merchant.category}</span>
                        </td>
                        <td>{merchant.city}</td>
                        <td>
                          <div className="text-warning">
                            {[...Array(Math.floor(merchant.rating))].map((_, i) => (
                              <i key={i} className="fas fa-star"></i>
                            ))}
                          </div>
                          <small>{merchant.rating}/5</small>
                        </td>
                        <td>
                          <span className={`badge ${merchant.isActive ? 'bg-success' : 'bg-secondary'}`}>
                            {merchant.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => {
                              dispatch({
                                type: 'UPDATE_MERCHANT',
                                payload: {
                                  id: merchant.id,
                                  data: { isActive: !merchant.isActive }
                                }
                              });
                            }}
                          >
                            {merchant.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h2 className="mb-4">Category Management</h2>
              
              <div className="row">
                {state.categories.map((category) => (
                  <div key={category.id} className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body text-center">
                        <i className={`${category.icon} fs-2 text-primary mb-2`}></i>
                        <h6>{category.name}</h6>
                        <span className={`badge ${category.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <div className="mt-2">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => {
                              dispatch({
                                type: 'UPDATE_CATEGORY',
                                payload: {
                                  id: category.id,
                                  data: { isActive: !category.isActive }
                                }
                              });
                            }}
                          >
                            {category.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="mb-4">Registered Users</h2>
              
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>Joined</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.city}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${user.isAdmin ? 'bg-danger' : 'bg-primary'}`}>
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;