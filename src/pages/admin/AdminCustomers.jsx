import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { customers } from '../../data/admin.js'

export default function AdminCustomers() {
  const [search, setSearch] = useState('')

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal mb-1">Customers</h1>
      <p className="text-charcoal/50 text-sm mb-8">{customers.length} people who've shopped with you.</p>

      <div className="relative w-full sm:w-72 mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={15} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full bg-white border border-charcoal/10 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>

      <div className="bg-white rounded-2xl border border-charcoal/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal/40 text-xs uppercase tracking-label">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Orders</th>
                <th className="px-6 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-charcoal/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center text-xs font-medium">
                        {c.name[0]}
                      </div>
                      <span className="font-medium text-charcoal">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-charcoal/60">{c.email}</td>
                  <td className="px-6 py-4 text-charcoal/60">{c.orders}</td>
                  <td className="px-6 py-4 text-charcoal/50">{c.joined}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-charcoal/40">
                    No customers match "{search}".
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
