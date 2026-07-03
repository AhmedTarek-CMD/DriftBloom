import React, { createContext, useContext, useEffect, useState } from 'react'

// NOTE: This project has no backend. Auth here is a UI-only mock so the
// Login / Register / Admin screens are fully navigable and demonstrate the
// intended flow. Swap this out for real auth calls when you add a backend.

const AuthContext = createContext(null)
const STORAGE_KEY = 'db_auth_v1'

const ADMIN_CREDENTIALS = {
  email: 'admin@driftandbloom.com',
  password: 'admin123',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [user])

  const login = ({ email, password }) => {
    if (!email || !password) return { success: false, error: 'Please enter your email and password.' }
    const name = email.split('@')[0].replace(/[._]/g, ' ')
    setUser({ name: name || 'Friend', email, isAdmin: false })
    return { success: true }
  }

  const register = ({ name, email, password }) => {
    if (!name || !email || !password) return { success: false, error: 'Please fill in every field.' }
    setUser({ name, email, isAdmin: false })
    return { success: true }
  }

  const adminLogin = ({ email, password }) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser({ name: 'Admin', email, isAdmin: true })
      return { success: true }
    }
    return {
      success: false,
      error: 'Invalid admin credentials. Try admin@driftandbloom.com / admin123.',
    }
  }

  const logout = () => setUser(null)

  const value = { user, isAuthenticated: !!user, isAdmin: !!user?.isAdmin, login, register, adminLogin, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
