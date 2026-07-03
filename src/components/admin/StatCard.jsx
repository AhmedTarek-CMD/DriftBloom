import React from 'react'

export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="bg-white rounded-2xl border border-charcoal/5 p-5 sm:p-6 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-beige text-olive flex items-center justify-center shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-label text-charcoal/40">{label}</p>
        <p className="font-serif text-2xl text-charcoal mt-1">{value}</p>
        {hint && <p className="text-xs text-sage-600 mt-1">{hint}</p>}
      </div>
    </div>
  )
}
