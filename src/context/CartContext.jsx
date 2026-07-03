import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'db_cart_v1'
const INSTRUCTION_LANGUAGE_KEY = 'db_cart_instruction_language_v1'
const ALLOWED_INSTRUCTION_LANGUAGES = ['English', 'Arabic']

const readStoredItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : parsed?.items || []
  } catch {
    return []
  }
}

const readStoredInstructionLanguage = () => {
  try {
    const stored = localStorage.getItem(INSTRUCTION_LANGUAGE_KEY)
    return ALLOWED_INSTRUCTION_LANGUAGES.includes(stored) ? stored : 'English'
  } catch {
    return 'English'
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredItems)
  const [instructionLanguage, setInstructionLanguageState] = useState(readStoredInstructionLanguage)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore write errors */
    }
  }, [items])

  useEffect(() => {
    try {
      localStorage.setItem(INSTRUCTION_LANGUAGE_KEY, instructionLanguage)
    } catch {
      /* ignore write errors */
    }
  }, [instructionLanguage])

  const setInstructionLanguage = (language) => {
    if (!ALLOWED_INSTRUCTION_LANGUAGES.includes(language)) return
    setInstructionLanguageState(language)
  }

  // A "line" is uniquely identified by product id + chosen plant option,
  // so the same package with two different plant choices stays separate.
  const lineKey = (productId, plantOption) => `${productId}::${plantOption || 'default'}`

  const addToCart = (product, quantity = 1, plantOption = null) => {
    setItems((prev) => {
      const key = lineKey(product.id, plantOption)
      const existing = prev.find((i) => lineKey(i.productId, i.plantOption) === key)
      if (existing) {
        return prev.map((i) =>
          lineKey(i.productId, i.plantOption) === key ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          scent: product.scent,
          plantOption,
          quantity,
          isCustomPackage: Boolean(product.isCustomPackage),
          packageSelections: product.packageSelections || [],
        },
      ]
    })
  }

  const removeFromCart = (productId, plantOption = null) => {
    const key = lineKey(productId, plantOption)
    setItems((prev) => prev.filter((i) => lineKey(i.productId, i.plantOption) !== key))
  }

  const updateQuantity = (productId, plantOption, quantity) => {
    const nextQuantity = Number.parseInt(quantity, 10)
    const key = lineKey(productId, plantOption)

    if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
      removeFromCart(productId, plantOption)
      return
    }

    setItems((prev) =>
      prev.map((i) => (lineKey(i.productId, i.plantOption) === key ? { ...i, quantity: nextQuantity } : i))
    )
  }

  const clearCart = () => setItems([])

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  )

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 100

  const total = subtotal + shipping

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
    itemCount,
    instructionLanguage,
    setInstructionLanguage,
    instructionLanguages: ALLOWED_INSTRUCTION_LANGUAGES,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
