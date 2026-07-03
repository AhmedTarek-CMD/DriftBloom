import React, { useState } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from '../components/common/Logo.jsx'

const LINKS = [
  { label: 'Dashboard', to: '/admin', icon: FiGrid, end: true },
  { label: 'Packages', to: '/admin/products', icon: FiPackage },
  { label: 'Orders', to: '/admin/orders', icon: FiShoppingCart },
  { label: 'Customers', to: '/admin/customers', icon: FiUsers },
]

export default function AdminLayout() {
  const { isAdmin, logout, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAdmin) return <Navigate to="/admin/login" replace />

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
      isActive ? 'bg-olive text-cream' : 'text-cream/70 hover:bg-olive-light hover:text-cream'
    }`

  return (
    <div className="min-h-screen flex bg-beige">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-olive-dark shrink-0 p-5">
        <div className="mb-10 px-1">
          <Logo light withTagline={false} />
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              <l.icon size={17} />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-cream/70 hover:bg-olive-light hover:text-cream"
        >
          <FiLogOut size={17} /> Log out
        </button>
      </aside>

      {/* Sidebar (mobile) */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-olive-dark p-5 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <Logo light withTagline={false} />
              <button onClick={() => setSidebarOpen(false)} className="text-cream" aria-label="Close menu">
                <FiX size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 flex-1">
              {LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setSidebarOpen(false)}>
                  <l.icon size={17} />
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-cream/70 hover:bg-olive-light hover:text-cream"
            >
              <FiLogOut size={17} /> Log out
            </button>
          </div>
          <div className="flex-1 bg-charcoal/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-charcoal/10 px-5 sm:px-8 py-4 flex items-center justify-between">
          <button
            className="lg:hidden text-charcoal"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
          <p className="text-sm text-charcoal/50 hidden sm:block">
            Welcome back, <span className="text-charcoal font-medium">{user?.name}</span>
          </p>
          <div className="w-9 h-9 rounded-full bg-sage text-white flex items-center justify-center text-sm font-medium ml-auto">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
        </header>
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
