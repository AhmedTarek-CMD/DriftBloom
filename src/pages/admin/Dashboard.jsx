import React from 'react'
import { Link } from 'react-router-dom'
import { FiDollarSign, FiShoppingBag, FiUsers, FiPackage } from 'react-icons/fi'
import StatCard from '../../components/admin/StatCard.jsx'
import StatusBadge from '../../components/admin/StatusBadge.jsx'
import { orders, dashboardStats } from '../../data/admin.js'

export default function Dashboard() {
  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal mb-1">Dashboard</h1>
      <p className="text-charcoal/50 text-sm mb-8">An overview of how Drift &amp; Bloom is doing.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          icon={FiDollarSign}
          label="Total Revenue"
          value={`LE ${dashboardStats.totalRevenue.toLocaleString()}`}
          hint="+12% vs last month"
        />
        <StatCard icon={FiShoppingBag} label="Total Orders" value={dashboardStats.totalOrders} hint="+8% vs last month" />
        <StatCard icon={FiUsers} label="Customers" value={dashboardStats.totalCustomers} hint="+5% vs last month" />
        <StatCard icon={FiPackage} label="Active Packages" value={dashboardStats.totalPackages} />
      </div>

      <div className="bg-white rounded-2xl border border-charcoal/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="font-serif text-xl text-charcoal">Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs text-olive underline">
            View all orders
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal/40 text-xs uppercase tracking-label border-t border-charcoal/5">
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-charcoal/5">
                  <td className="px-6 py-4 font-medium text-charcoal">{order.id}</td>
                  <td className="px-6 py-4 text-charcoal/70">{order.customer}</td>
                  <td className="px-6 py-4 text-charcoal/50">{order.date}</td>
                  <td className="px-6 py-4 text-charcoal/70">LE {order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
