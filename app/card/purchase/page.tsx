"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const CardPurchasePage: React.FC = () => {
  const { purchaseCard, state } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userId: state.currentUser?.id || "",
    plan: "Premium Annual",
    city: "Mumbai",
    price: 1999,
    status: "pending" as const,
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  });
  const [serviceNumber, setServiceNumber] = useState("");
  const [error, setError] = useState("");

  const plans = [
    {
      name: "Basic Annual",
      price: 999,
      duration: "12 months",
      features: [
        "Access to 100+ merchants",
        "Basic discounts",
        "Email support",
      ],
    },
    {
      name: "Premium Annual",
      price: 1999,
      duration: "12 months",
      features: [
        "Access to 500+ merchants",
        "Premium discounts up to 50%",
        "Priority support",
        "Exclusive offers",
      ],
    },
    {
      name: "VIP Annual",
      price: 2999,
      duration: "12 months",
      features: [
        "Access to all merchants",
        "VIP discounts up to 70%",
        "24/7 support",
        "Exclusive VIP events",
        "Free home delivery",
      ],
    },
  ];

  const cities = ["Mumbai", "Delhi", "Bangalore"];

  const handlePlanSelect = (plan: (typeof plans)[0]) => {
    setFormData({
      ...formData,
      plan: plan.name,
      price: plan.price,
    });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!state.isAuthenticated) {
      setError("Please login to purchase a card");
      return;
    }

    try {
      const serviceNum = await purchaseCard(formData);
      setServiceNumber(serviceNum);
      setStep(3);
    } catch (error) {
      setError("Payment failed. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in paymentData) {
      setPaymentData({
        ...paymentData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // if (!state.isAuthenticated) {
  //   return (
  //     <div className="container py-5">
  //       <div className="row justify-content-center">
  //         <div className="col-md-6">
  //           <div className="card shadow-premium">
  //             <div className="card-body text-center p-5">
  //               <i className="fas fa-lock text-warning fs-1 mb-3"></i>
  //               <h3>Login Required</h3>
  //               <p className="text-muted mb-4">
  //                 Please login to your account to purchase a CityWitty Card
  //               </p>
  //               <a href="/auth/login" className="btn btn-primary me-3">
  //                 <i className="fas fa-sign-in-alt me-2"></i>
  //                 Login
  //               </a>
  //               <a href="/auth/signup" className="btn btn-outline-primary">
  //                 <i className="fas fa-user-plus me-2"></i>
  //                 Sign Up
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-premium">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="fas fa-credit-card me-2"></i>
                Purchase CityWitty Card
              </h3>
              <div className="progress mt-3" style={{ height: "4px" }}>
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="card-body p-4">
              {step === 1 && (
                <div>
                  <h4 className="mb-4">Choose Your Plan</h4>
                  <div className="row">
                    {plans.map((plan) => (
                      <div key={plan.name} className="col-md-4 mb-4">
                        <div
                          className={`card h-100 cursor-pointer ${
                            formData.plan === plan.name ? "border-primary" : ""
                          }`}
                          onClick={() => handlePlanSelect(plan)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="card-body text-center">
                            <h5 className="card-title">{plan.name}</h5>
                            <h2 className="text-primary">₹{plan.price}</h2>
                            <p className="text-muted">{plan.duration}</p>
                            <ul className="list-unstyled">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="mb-2">
                                  <i className="fas fa-check text-success me-2"></i>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Select City</label>
                    <select
                      className="form-select"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-center">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => setStep(2)}
                    >
                      Continue to Payment
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h4 className="mb-4">Payment Details</h4>

                  <div className="row mb-4">
                    <div className="col-md-8">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6>Order Summary</h6>
                          <div className="d-flex justify-content-between">
                            <span>
                              {formData.plan} - {formData.city}
                            </span>
                            <span className="fw-bold">₹{formData.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-danger">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handlePaymentSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="cardholderName"
                          value={paymentData.cardholderName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">
                          Expiry Month
                        </label>
                        <select
                          className="form-select"
                          name="expiryMonth"
                          value={paymentData.expiryMonth}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {String(i + 1).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">
                          Expiry Year
                        </label>
                        <select
                          className="form-select"
                          name="expiryYear"
                          value={paymentData.expiryYear}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={2024 + i}>
                              {2024 + i}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-3"
                        onClick={() => setStep(1)}
                      >
                        <i className="fas fa-arrow-left me-2"></i>
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        disabled={state.loading}
                      >
                        {state.loading ? (
                          <>
                            <span className="loading-spinner me-2"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-credit-card me-2"></i>
                            Pay ₹{formData.price}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <i className="fas fa-check-circle text-success fs-1 mb-3"></i>
                  <h3 className="text-success mb-3">Payment Successful!</h3>
                  <p className="text-muted mb-4">
                    Your CityWitty Card has been purchased successfully.
                  </p>

                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h5>Your Service Number</h5>
                      <h3 className="text-primary">{serviceNumber}</h3>
                      <p className="text-muted mb-0">
                        Save this number to track your card status and request
                        activation
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => router.push("/card/activate")}
                    >
                      <i className="fas fa-play me-2"></i>
                      Request Activation
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => router.push("/track-status")}
                    >
                      <i className="fas fa-search me-2"></i>
                      Track Status
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPurchasePage;
