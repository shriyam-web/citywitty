"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";

const ContactPage: React.FC = () => {
  const { submitContactForm, state } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitContactForm(formData);
    if (result) {
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-premium">
            <div className="card-body p-5">
              {success ? (
                <div className="text-center">
                  <i className="fas fa-check-circle text-success fs-1 mb-3"></i>
                  <h3 className="text-success mb-3">Message Sent!</h3>
                  <p className="text-muted mb-4">
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSuccess(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
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
                    <div className="col-md-6 mb-3">
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
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-bold">
                      <i className="fas fa-comment me-2"></i>
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Message
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
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <i className="fas fa-phone text-primary fs-1 mb-3"></i>
              <h5>Call Us</h5>
              <p className="text-muted">+91 6389202030</p>
              <a
                href="tel:+916389202030
"
                className="btn btn-outline-primary"
              >
                <i className="fas fa-phone me-2"></i>
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <i className="fas fa-envelope text-primary fs-1 mb-3"></i>
              <h5>Email Us</h5>
              <p className="text-muted">contact@citywitty.com</p>
              <a
                href="mailto:contact@citywitty.com
"
                className="btn btn-outline-primary"
              >
                <i className="fas fa-envelope me-2"></i>
                Send Email
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <i className="fab fa-whatsapp text-success fs-1 mb-3"></i>
              <h5>WhatsApp</h5>
              <p className="text-muted">Quick support via WhatsApp</p>
              <a
                href="https://wa.me/916389202030
"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success"
              >
                <i className="fab fa-whatsapp me-2"></i>
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
