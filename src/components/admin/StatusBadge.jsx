import React from 'react'

const STYLES = {
  Delivered: 'bg-sage-100 text-sage-600',
  'Out for Delivery': 'bg-amber-100 text-amber-700',
  'Being Prepared': 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-600',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${STYLES[status] || 'bg-beige text-charcoal/60'}`}>
      {status}
    </span>
  )
}
