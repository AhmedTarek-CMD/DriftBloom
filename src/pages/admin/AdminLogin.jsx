import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock, FiShield } from 'react-icons/fi'
import Button from '../../components/common/Button.jsx'
import Logo from '../../components/common/Logo.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminLogin() {
  const { adminLogin } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = adminLogin(form)
    if (!result.success) {
      setError(result.error)
      return
    }
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-olive-dark px-4">
      <div className="w-full max-w-md bg-cream rounded-2xl p-8 sm:p-10 shadow-soft">
        <div className="flex justify-center mb-8">
          <Logo withTagline={false} />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2 text-olive">
          <FiShield size={18} />
          <h1 className="font-serif text-2xl text-charcoal">Admin Login</h1>
        </div>
        <p className="text-charcoal/50 text-sm text-center mb-7">
          Manage packages, orders and customers.
        </p>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={16} />
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Admin email"
              className="w-full bg-white border border-charcoal/10 rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={16} />
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-white border border-charcoal/10 rounded-lg pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <Button type="submit" fullWidth size="lg" className="mt-2">
            Log In to Dashboard
          </Button>
        </form>

        <p className="text-xs text-charcoal/40 text-center mt-6">
          Demo credentials: admin@driftandbloom.com / admin123
        </p>
        <Link to="/" className="block text-center text-xs text-charcoal/40 underline mt-4">
          ← Back to store
        </Link>
      </div>
    </div>
  )
}
