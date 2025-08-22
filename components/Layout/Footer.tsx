import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer
      className="py-5 mt-5"
      style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-credit-card text-primary me-2 fs-4"></i>
              <h5 className="mb-0 fw-bold text-white">CityWitty</h5>
            </div>
            <p
              className="mb-3"
              style={{ color: "#cccccc", fontSize: "16px", lineHeight: "1.6" }}
            >
              Citywitty brings your city’s first Multi-Brand Privilege
              Card—designed to make saving simple while you spend. From dining
              and gyms to fashion and salons, one card gives you access to
              exclusive discounts and curated offers across multiple outlets.{" "}
              <br />
              No more lost pamphlets, emails, or missed deals—our smart,
              tech-driven card ensures you always get the best value. Simple,
              convenient, and rewarding.
            </p>

            <div className="d-flex gap-3">
              <a
                href="https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr"
                className="text-white fs-5"
                style={{ transition: "color 0.3s ease" }}
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://youtube.com/@citywitty3546?si=IfcAhXmKq9vmIfA8"
                className="text-white fs-5"
                style={{ transition: "color 0.3s ease" }}
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://www.instagram.com/citywitty.in?igsh=YXBub3Nwam5hcjR0"
                className="text-white fs-5"
                style={{ transition: "color 0.3s ease" }}
              >
                <i className="fab fa-instagram"></i>
              </a>
              {/* <a
                href="#"
                className="text-white fs-5"
                style={{ transition: "color 0.3s ease" }}
              >
                <i className="fab fa-linkedin"></i>
              </a> */}
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3" style={{ color: "#4AA3DF" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/merchants"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Merchants
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/card/purchase"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Get Card
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/track-status"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Track Status
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3" style={{ color: "#4AA3DF" }}>
              Support
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/contact"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/help"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/faq"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/terms"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3" style={{ color: "#4AA3DF" }}>
              Business
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/merchant/register"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Partner with Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/business"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Business Solutions
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/advertise"
                  className="text-decoration-none"
                  style={{ color: "#cccccc", transition: "color 0.3s ease" }}
                >
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3" style={{ color: "#4AA3DF" }}>
              Contact Info
            </h6>
            <ul className="list-unstyled" style={{ color: "#cccccc" }}>
              <li className="mb-2">
                <i className="fas fa-phone me-2"></i>
                +91 6389202030
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope me-2"></i>
                contact@citywitty.com
              </li>
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                Explore our offices around the country.
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: "#444444" }} />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0" style={{ color: "#cccccc" }}>
              &copy; 2025 CityWitty. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <Link
              href="/privacy"
              className="text-decoration-none me-3"
              style={{ color: "#cccccc", transition: "color 0.3s ease" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-decoration-none"
              style={{ color: "#cccccc", transition: "color 0.3s ease" }}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
