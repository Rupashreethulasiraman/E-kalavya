import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-extrabold mb-3">e-kalavya</h3>
          <p className="text-purple-200 text-sm leading-relaxed">
            India’s trusted online learning platform for CBSE, ICSE,
            Matric, JEE & NEET.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-purple-200">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/book-demo">Book Demo</Link></li>
            <li><Link href="/study-materials">Study Materials</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
<div>
  <h4 className="font-bold text-lg mb-4">Company</h4>
  <ul className="space-y-2 text-purple-200">
    <li>
      <Link href="/about" className="hover:text-white transition">
        About Us
      </Link>
    </li>

    <li>
      <Link href="/contact" className="hover:text-white transition">
        Contact
      </Link>
    </li>

    <li>
      <Link href="/privacy-policy" className="hover:text-white transition">
        Privacy Policy
      </Link>
    </li>

    <li>
      <Link href="/terms-and-conditions" className="hover:text-white transition">
        Terms & Conditions
      </Link>
    </li>

    <li>
      <Link href="/refund-policy" className="hover:text-white transition">
        Refund Policy
      </Link>
    </li>

    <li>
      <Link href="/shipping-policy" className="hover:text-white transition">
        Shipping Policy
      </Link>
    </li>
  </ul>
</div>


        {/* CONTACT */}
        <div>
          <h4 className="font-bold text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-purple-200 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={16} /> +91 75501 01893
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} /> support@ekalavya.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} /> Tamil Nadu, India
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-purple-700">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-purple-300">
          © {new Date().getFullYear()} e-kalavya. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
