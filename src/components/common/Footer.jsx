import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi'
import { FaInstagram, FaPinterestP, FaTiktok, FaFacebookF } from 'react-icons/fa'
import Container from './Container.jsx'
import Logo from './Logo.jsx'
import { useToast } from './Toast.jsx'

const SHOP_LINKS = [
  { label: 'All Packages', to: '/packages' },
  { label: 'Build Your Package', to: '/build-your-package' },
  { label: 'Best Sellers', to: '/packages?category=best-seller' },
  { label: 'Find Your Soul', to: '/find-your-soul' },
  { label: 'Your Cart', to: '/cart' },
]

const COMPANY_LINKS = [
  { label: 'Support', to: '/support' },
  { label: 'Log In', to: '/login' },
  { label: 'Create Account', to: '/register' },
  { label: 'Admin Login', to: '/admin/login' },
]

const SOCIALS = [
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaPinterestP, href: 'https://pinterest.com', label: 'Pinterest' },
  { icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok' },
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const handleSubscribe = (e) => {
    e.preventDefault()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!isValidEmail) {
      showToast('Please enter a valid email to join Stay in Bloom.', 'info')
      return
    }
    showToast('You are on the Drift & Bloom list. Welcome in.')
    setEmail('')
  }

  return (
    <footer className="bg-olive text-cream">
      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo light />
            <p className="text-cream/60 text-sm mt-4 leading-relaxed max-w-xs">
              We create meaningful plant, candle, and living packages that turn everyday moments into lasting memories.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.08, rotate: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-cream/20 text-cream/80 hover:bg-cream hover:text-olive transition duration-300"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-label text-brown mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-cream/70 hover:text-cream transition duration-300 hover:translate-x-1 inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-label text-brown mb-4">Company</h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-cream/70 hover:text-cream transition duration-300 hover:translate-x-1 inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-label text-brown mb-4">Stay in Bloom</h4>
            <ul className="space-y-2.5 mb-5">
              <li className="flex items-center gap-2 text-sm text-cream/70"><FiMail size={14} /> hello@driftandbloom.com</li>
              <li className="flex items-center gap-2 text-sm text-cream/70"><FiPhone size={14} /> +20 100 123 4567</li>
              <li className="flex items-center gap-2 text-sm text-cream/70"><FiMapPin size={14} /> Cairo, Egypt</li>
            </ul>
            <form onSubmit={handleSubscribe} className="flex items-center bg-cream/10 border border-cream/20 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-gold/40">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button type="submit" className="px-4 py-2.5 text-xs uppercase tracking-label text-cream/90 hover:text-cream transition duration-300">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-cream/15 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/50">© {new Date().getFullYear()} Drift &amp; Bloom. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/support" className="text-xs text-cream/50 transition duration-300 hover:text-cream">Privacy Policy</Link>
            <Link to="/support" className="text-xs text-cream/50 transition duration-300 hover:text-cream">Terms of Service</Link>
            <a href="#top" aria-label="Back to top" className="w-8 h-8 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream hover:text-olive transition duration-300 hover:scale-110">
              <FiArrowUp size={14} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
