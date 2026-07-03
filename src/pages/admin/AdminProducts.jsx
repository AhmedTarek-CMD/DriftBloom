import React, { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import RatingStars from '../../components/common/RatingStars.jsx'
import AddProductModal from '../../components/admin/AddProductModal.jsx'
import StatusBadge from '../../components/admin/StatusBadge.jsx'
import { useProducts } from '../../context/ProductContext.jsx'
import { categories } from '../../data/products.js'

// Map product status to the StatusBadge vocabulary
function productStatusLabel(p) {
  if (p.status === 'out_of_stock' || p.status === 'Out of Stock') return 'Out of Stock'
  if (p.status === 'draft' || p.status === 'Draft')               return 'Being Prepared'
  return 'Delivered' // "Active" maps to the green badge variant
}

export default function AdminProducts() {
  const { products, removeProduct } = useProducts()
  const [search,      setSearch]      = useState('')
  const [modalOpen,   setModalOpen]   = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd  = ()        => { setEditProduct(null); setModalOpen(true) }
  const openEdit = (product) => { setEditProduct(product); setModalOpen(true) }
  const closeModal = ()      => { setModalOpen(false); setEditProduct(null) }

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove "${name}"? This only affects the demo session.`)) {
      removeProduct(id)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-charcoal mb-1">Packages</h1>
          <p className="text-charcoal/50 text-sm">{products.length} packages in your catalog.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-olive hover:bg-olive-dark text-cream px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-label transition duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={15} /> Add Package
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-72 mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={15} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search packages…"
          className="w-full bg-white border border-charcoal/10 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-charcoal/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal/40 text-xs uppercase tracking-label border-b border-charcoal/5">
                <th className="px-6 py-3">Package</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Tags</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-charcoal/5 hover:bg-ivory transition duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-11 h-11 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <p className="font-medium text-charcoal">{p.name}</p>
                        <p className="text-xs text-charcoal/40 max-w-[200px] truncate">{p.tagline}</p>
                        {p.sku && (
                          <p className="text-[10px] text-charcoal/30 mt-0.5">SKU: {p.sku}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-charcoal/60 capitalize">
                    {p.categories?.[0] || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-charcoal/70">LE {p.price.toLocaleString()}</span>
                      {p.discountPrice && (
                        <p className="text-[11px] text-sage-600">
                          Sale: LE {Number(p.discountPrice).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RatingStars rating={p.rating} showNumber={false} size="text-xs" />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={productStatusLabel(p)} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(p.tags || []).slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] bg-beige text-charcoal/50 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {(p.tags || []).length > 2 && (
                        <span className="text-[10px] text-charcoal/35">+{p.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/packages/${p.id}`}
                        target="_blank"
                        title="View on store"
                        className="text-charcoal/40 hover:text-olive transition"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => openEdit(p)}
                        title="Edit"
                        className="text-charcoal/40 hover:text-olive transition"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        title="Delete"
                        className="text-charcoal/40 hover:text-red-500 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center text-charcoal/40">
                    No packages match "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <AddProductModal
          onClose={closeModal}
          editProduct={editProduct}
        />
      )}
    </div>
  )
}
