import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaRegCopyright,
} from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600">
      {/* thin gold top rule */}
      <div className="w-full border-t border-yellow-200" />

      <motion.div
        className="mx-auto px-6 md:px-8 lg:px-12 py-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* ROW 1: logo + address / about / tagline */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8"
        >
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src="/atithya_logo.jpg"
              alt="Athithya logo"
              className="w-36"
            />
            <address className="not-italic text-sm text-gray-500 leading-relaxed max-w-xs">
              <span className="font-semibold text-yellow-600">Registered Address:</span>
              <div className="mt-2 text-gray-600">
                Athithya Brands Pvt. Ltd.<br />
                204, Sunrise Tower, Rajpur Road,<br />
                Dehradun, Uttarakhand — 248001
              </div>
            </address>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-yellow-600 font-semibold mb-3">About Us</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link to="/about" className="hover:text-yellow-500 transition">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/values" className="hover:text-yellow-500 transition">
                  Our Values
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex items-center justify-end">
            <p className="text-yellow-600 italic font-medium text-right max-w-xs">
              “Travel with warmth, connect with soul.”
            </p>
          </div>
        </motion.div>

        {/* ROW 2: link groups */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-6 border-t border-gray-100"
        >
          <div>
            <h5 className="text-yellow-600 font-semibold mb-3">For Hosts</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/host" className="hover:text-yellow-500 transition">Start Hosting</Link></li>
              <li><Link to="/host-guidelines" className="hover:text-yellow-500 transition">Host Guidelines</Link></li>
              <li><Link to="/community" className="hover:text-yellow-500 transition">Community</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-yellow-600 font-semibold mb-3">For Creators</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/collaborations" className="hover:text-yellow-500 transition">Collaborations</Link></li>
              <li><Link to="/partners" className="hover:text-yellow-500 transition">Athithya Partners</Link></li>
              <li><Link to="/impact" className="hover:text-yellow-500 transition">Social Impact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-yellow-600 font-semibold mb-3">Support</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/help" className="hover:text-yellow-500 transition">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-500 transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-yellow-500 transition">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-yellow-600 font-semibold mb-3">Safety</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/guest-policies" className="hover:text-yellow-500 transition">Guest Policies</Link></li>
              <li><Link to="/covid-safety" className="hover:text-yellow-500 transition">COVID-19 Safety</Link></li>
              <li><Link to="/report" className="hover:text-yellow-500 transition">Report an Issue</Link></li>
            </ul>
          </div>
        </motion.div>

        {/* ROW 3: policies / social / copyright */}
        <motion.div
          variants={fadeInUp}
          className=" pt-4 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-100"
        >
          <div className="flex flex-wrap gap-6 text-sm items-center justify-center md:justify-start">
            <Link to="/terms" className="text-gray-600 hover:text-yellow-500 transition">Terms & Conditions</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-yellow-500 transition">Privacy Policy</Link>
            <Link to="/mentions" className="text-gray-600 hover:text-yellow-500 transition">Special Mentions</Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {/* social icons in gold circles */}
              <a
                href="https://www.instagram.com/athithya.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-yellow-50 text-yellow-600 hover:shadow-lg transform transition hover:scale-105"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://www.linkedin.com/company/athithya"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-yellow-50 text-yellow-600 hover:shadow-lg transform transition hover:scale-105"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-yellow-50 text-yellow-600 hover:shadow-lg transform transition hover:scale-105"
                aria-label="YouTube"
              >
                <FaYoutube size={16} />
              </a>

              <a
                href="mailto:hello@athithya.in"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-yellow-50 text-yellow-600 hover:shadow-lg transform transition hover:scale-105"
                aria-label="Email"
              >
                <MdOutlineMail size={18} />
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaRegCopyright className="text-yellow-600" />
              <span className="text-gray-600">2025 <span className="font-medium text-yellow-600">Athithya Brands.</span> All Rights Reserved.</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
