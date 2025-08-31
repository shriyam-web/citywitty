import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="/citywittynew.png"
              alt="CityWitty Logo"
              className="h-12 w-auto"
            />
            <p className="text-gray-400 text-sm">
              Premium discount card platform offering exclusive deals from
              partnered merchants across India.
            </p>
            {/* <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div> */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/19b3cPzrDU/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/citywitty.in?igsh=YXBub3Nwam5hcjR0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
              <a
                href="https://youtube.com/@citywitty3546?si=IfcAhXmKq9vmIfA8"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* YouTube ka icon lucide-react me nahi hota, tumhe koi aur import karna padega */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a2.987 2.987 0 0 0-2.103-2.115C19.477 3.5 12 3.5 12 3.5s-7.477 0-9.395.571A2.987 2.987 0 0 0 .502 6.186 31.44 31.44 0 0 0 0 12a31.44 31.44 0 0 0 .502 5.814 2.987 2.987 0 0 0 2.103 2.115C4.523 20.5 12 20.5 12 20.5s7.477 0 9.395-.571a2.987 2.987 0 0 0 2.103-2.115A31.44 31.44 0 0 0 24 12a31.44 31.44 0 0 0-.502-5.814ZM9.75 15.02V8.98l6.5 3.02-6.5 3.02Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/citywitty" // agar LinkedIn bhi add karna ho
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                Home
              </Link>
              <Link
                href="/merchants"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                Merchants
              </Link>
              <Link
                href="/get-card"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                Get Card
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link
                href="/activate-track"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                Activate & Track
              </Link>
              <Link
                href="/help"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">+91 6389202030</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">
                  contact@citywitty.com
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Explore our offices across India
                  <br />
                  {/* Mumbai, Maharashtra 400001 */}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CityWitty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
