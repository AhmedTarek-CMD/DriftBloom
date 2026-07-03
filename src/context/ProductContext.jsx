/**
 * ProductContext
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the product catalog.  Currently backed by the
 * local products.js seed data + in-memory additions.
 *
 * When a real backend is ready, replace the helpers below with API calls:
 *   addProduct    → POST   /api/products
 *   updateProduct → PUT    /api/products/:id
 *   removeProduct → DELETE /api/products/:id
 * The components that consume this context need zero changes.
 */

import React, { createContext, useContext, useMemo, useState } from 'react'
import packageFallbackImage from '../assets/package.png'
import { BEST_SELLER_CATEGORY_ID, products as SEED } from '../data/products.js'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(SEED)
  const [loading,  setLoading]  = useState(false)   // future API loading state
  const [error,    setError]    = useState(null)     // future API error state

  /* ── CRUD helpers ──────────────────────────────────────────────────────── */

  /** Add a new product and return it. */
  const addProduct = (rawForm) => {
    const id =
      (rawForm.name || 'product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Date.now()

    const product = buildProduct(id, rawForm)
    setProducts((prev) => [product, ...prev])
    return product
  }

  /** Update an existing product by id. */
  const updateProduct = (id, rawForm) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...buildProduct(id, rawForm) } : p))
    )
  }

  /** Delete a product by id. */
  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  /** Find a single product by id from live state (works for newly added products). */
  const getProductById = (id) => products.find((p) => p.id === id) || null

  /** Get N related products excluding the given id from live state. */
  const getRelatedProducts = (id, count = 5) =>
    products.filter((p) => p.id !== id).slice(0, count)

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      addProduct,
      updateProduct,
      removeProduct,
      getProductById,
      getRelatedProducts,
    }),
    [products, loading, error]
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within a ProductProvider')
  return ctx
}

/* ── Internal helpers ────────────────────────────────────────────────────── */

/**
 * Normalises form data into the product shape used across the whole app.
 * When you add a backend, this same shape becomes the JSON request body.
 */
function buildProduct(id, form) {
  // Images: use preview data-URLs if present; seeded products use local assets.
  const images =
    form.images?.length
      ? form.images.map((img) => img.preview || img.url)
      : []
  const mainImage = images[0] || packageFallbackImage

  return {
    id,
    name:        form.name        || '',
    tagline:     form.tagline     || '',
    description: form.description || '',
    price:       Number(form.price)         || 0,
    discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
    rating:      Number(form.rating)        || 5,
    reviews:     0,
    sku:         form.sku         || '',
    stock:       Number(form.stock)         || 0,
    status:      form.status      || 'active',
    categories:  form.categories  || ['calm'],
    bestSeller:  Boolean(form.bestSeller || form.categories?.includes(BEST_SELLER_CATEGORY_ID)),
    mood:        form.mood        || [],
    scent:       form.scent       || '—',
    size:        form.size        || 'medium',
    difficulty:  form.difficulty  || 'beginner',
    light:       form.light       || 'medium',
    watering:    form.watering    || 'weekly',
    petFriendly: !!form.petFriendly,
    airPurifying: !!form.airPurifying,
    tags:        form.tags        || [],
    includes:    ['Live Plant', 'Scented Candle', 'Story Card', 'Themed Packaging'],
    plantOptions: [],
    image:       mainImage,
    gallery:     images.slice(1),
    // Metadata for future API integration
    _createdAt:  new Date().toISOString(),
    _source:     'admin-form',
  }
}
