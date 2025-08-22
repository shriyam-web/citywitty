"use client";

import React, { useState } from "react";
import Link from "next/link";

const MerchantRegisterPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div
      className="min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4AA3DF 100%)",
      }}
    >
      <div className="container py-5">
        <div className="text-center mb-5 pt-5">
          <h1 className="display-4 fw-bold text-white mb-3">
            Partner with CityWitty
          </h1>
          <p className="lead text-white opacity-90 mb-5">
            Join our network of premium merchants and grow your business with
            exclusive offers
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {!showForm ? (
              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "25px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-4">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "120px",
                        height: "120px",
                        background:
                          "linear-gradient(135deg, #4AA3DF 0%, #FF914D 100%)",
                        boxShadow: "0 20px 40px rgba(74, 163, 223, 0.3)",
                      }}
                    >
                      <i
                        className="fas fa-store text-white"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                  </div>

                  <h2
                    className="fw-bold mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, #4AA3DF 0%, #FF914D 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Become a CityWitty Partner
                  </h2>

                  <div className="row mb-5">
                    <div className="col-md-4 mb-4">
                      <div className="p-4">
                        <i className="fas fa-users text-primary fs-1 mb-3"></i>
                        <h5 className="fw-bold">Reach More Customers</h5>
                        <p className="text-muted">
                          Connect with thousands of CityWitty cardholders
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="p-4">
                        <i className="fas fa-chart-line text-success fs-1 mb-3"></i>
                        <h5 className="fw-bold">Boost Your Sales</h5>
                        <p className="text-muted">
                          Increase revenue with our exclusive offer platform
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="p-4">
                        <i className="fas fa-handshake text-warning fs-1 mb-3"></i>
                        <h5 className="fw-bold">Trusted Partnership</h5>
                        <p className="text-muted">
                          Join our verified network of premium merchants
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="alert alert-info border-0 mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(74, 163, 223, 0.1) 0%, rgba(255, 145, 77, 0.1) 100%)",
                      borderRadius: "15px",
                    }}
                  >
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Registration Process:</strong> Fill out our
                    comprehensive form to join our premium merchant network
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <a
                      href="#"
                      className="btn btn-lg px-5 py-3"
                      style={{
                        background:
                          "linear-gradient(135deg, #FF914D 0%, #FFB347 100%)",
                        border: "none",
                        borderRadius: "50px",
                        color: "white",
                        fontWeight: "600",
                        boxShadow: "0 8px 25px rgba(255, 145, 77, 0.4)",
                        transition: "all 0.3s ease",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        // You can replace this with your Google Form link
                        window.open(
                          "https://forms.gle/iyWDR41xiZBTANzb6",
                          "_blank"
                        );
                      }}
                    >
                      <i className="fas fa-external-link-alt me-2"></i>
                      Register as Merchant
                    </a>

                    <button
                      className="btn btn-outline-primary btn-lg px-5 py-3"
                      style={{
                        borderRadius: "50px",
                        fontWeight: "600",
                        borderWidth: "2px",
                      }}
                      onClick={() => setShowForm(true)}
                    >
                      <i className="fas fa-eye me-2"></i>
                      Preview Form
                    </button>
                  </div>

                  <div className="mt-4">
                    <small className="text-muted">
                      <i className="fas fa-shield-alt me-1"></i>
                      Your information is secure and will be reviewed within 3-5
                      business days
                    </small>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "25px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="card-header text-center py-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #4AA3DF 0%, #FF914D 100%)",
                    borderRadius: "25px 25px 0 0",
                    border: "none",
                  }}
                >
                  <h3 className="text-white mb-0">
                    <i className="fas fa-store me-2"></i>
                    Merchant Registration Form (Preview)
                  </h3>
                </div>
                <div className="card-body p-5">
                  <div
                    className="alert alert-warning border-0 mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 145, 77, 0.1) 100%)",
                      borderRadius: "15px",
                    }}
                  >
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <strong>Form Preview Mode:</strong> This form is currently
                    disabled. Use the "Register as Merchant" button above to
                    access the live registration form.
                  </div>

                  <form style={{ opacity: 0.6, pointerEvents: "none" }}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-user me-2"></i>Owner Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter owner's full name"
                          disabled
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-store me-2"></i>Store Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter store/business name"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-tags me-2"></i>Category *
                        </label>
                        <select className="form-select" disabled>
                          <option>Select Category</option>
                          <option>Hotels</option>
                          <option>Salon & Spa</option>
                          <option>Electronics</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-map-marker-alt me-2"></i>City *
                        </label>
                        <select className="form-select" disabled>
                          <option>Select City</option>
                          <option>Mumbai</option>
                          <option>Delhi</option>
                          <option>Bangalore</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-envelope me-2"></i>Email Address
                          *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="business@example.com"
                          disabled
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-phone me-2"></i>Phone Number *
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+91 9876543210"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-map-marker-alt me-2"></i>Complete
                        Address *
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Enter complete business address"
                        disabled
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-gift me-2"></i>Offer Details *
                      </label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Describe your exclusive offer for CityWitty cardholders"
                        disabled
                      ></textarea>
                    </div>
                  </form>

                  <div className="text-center mt-4">
                    <button
                      className="btn btn-secondary me-3"
                      onClick={() => setShowForm(false)}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Registration
                    </button>
                    <button className="btn btn-primary" disabled>
                      <i className="fas fa-paper-plane me-2"></i>
                      Submit Application (Disabled)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantRegisterPage;
