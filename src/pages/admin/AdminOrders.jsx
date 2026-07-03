import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import StatusBadge from '../../components/admin/StatusBadge.jsx'
import { orders } from '../../data/admin.js'

const STATUSES = ['All', 'Being Prepared', 'Out for Delivery', 'Delivered', 'Cancelled']

export default function AdminOrders() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === 'All' || o.status === status
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal mb-1">Orders</h1>
      <p className="text-charcoal/50 text-sm mb-8">{orders.length} orders placed in total.</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="w-full bg-white border border-charcoal/10 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-56 bg-white border border-charcoal/10 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All statuses' : s}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal/40 text-xs uppercase tracking-label">
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t border-charcoal/5">
                  <td className="px-6 py-4 font-medium text-charcoal">{o.id}</td>
                  <td className="px-6 py-4 text-charcoal/70">{o.customer}</td>
                  <td className="px-6 py-4 text-charcoal/50">{o.date}</td>
                  <td className="px-6 py-4 text-charcoal/60">{o.items}</td>
                  <td className="px-6 py-4 text-charcoal/60">{o.payment}</td>
                  <td className="px-6 py-4 text-charcoal/70">LE {o.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-charcoal/40">
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
