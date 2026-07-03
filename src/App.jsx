import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import LoadingFallback from './components/common/LoadingFallback.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Packages = lazy(() => import('./pages/Packages.jsx'))
const BuildPackage = lazy(() => import('./pages/BuildPackage.jsx'))
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const FindYourSoul = lazy(() => import('./pages/FindYourSoul/FindYourSoul.jsx'))
const Support = lazy(() => import('./pages/Support.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts.jsx'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders.jsx'))
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers.jsx'))

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Storefront */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/build-your-package" element={<BuildPackage />} />
          <Route path="/build-package" element={<BuildPackage />} />
          <Route path="/packages/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/find-your-soul" element={<FindYourSoul />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
