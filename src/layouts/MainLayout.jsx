import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/common/Navbar.jsx'
import Footer from '../components/common/Footer.jsx'
import { PageMotion } from '../components/common/Motion.jsx'

export default function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div id="top" className="min-h-screen flex flex-col bg-cream text-charcoal">
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <main key={location.pathname} className="flex-1 focus:outline-none" tabIndex={-1}>
          <PageMotion>
            <Outlet />
          </PageMotion>
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
