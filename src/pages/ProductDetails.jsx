import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Check, Gift, Heart } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import RatingStars from '../components/common/RatingStars.jsx'
import QuantitySelector from '../components/common/QuantitySelector.jsx'
import Button from '../components/common/Button.jsx'
import ProductCard from '../components/packages/ProductCard.jsx'
import PlantOptionSelector from '../components/packages/PlantOptionSelector.jsx'
import PackageIncludes from '../components/packages/PackageIncludes.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { getBestPlantPair } from '../data/plants.js'
import { useToast } from '../components/common/Toast.jsx'
import { Stagger, fadeUp } from '../components/common/Motion.jsx'
import { getCollectionImage } from '../utils/collectionImages.js'

export default function ProductDetails() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  // Look up from the LIVE context state so newly added packages are found immediately
  const product  = products.find((p) => p.id === id) || null
  const related  = products.filter((p) => p.id !== id).slice(0, 5)

  const [activeImage, setActiveImage] = useState(0)
  const [quantity,    setQuantity]    = useState(1)
  const [petFriendly, setPetFriendly] = useState(true)
  const [added,       setAdded]       = useState(false)

  if (!product) return <Navigate to="/packages" replace />

  // Build plant context from this product's mood & id so the engine
  // picks plants that suit both the pet preference and the collection.
  const plantCtx = {
    petFriendly,
    mood: product.mood?.[0] || 'calm',
    collection: product.id,
  }
  const { petOption, nonPetOption } = getBestPlantPair(plantCtx)
  const selectedPlant = petFriendly ? petOption : nonPetOption

  const mainCollectionImage = getCollectionImage(product.name || product.id, product.image)
  const originalGallery = product.gallery || []
  const remainingGallery = originalGallery.length >= 3 ? originalGallery.slice(1) : originalGallery
  const gallery = [mainCollectionImage, ...remainingGallery].slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedPlant?.name)
    setAdded(true)
    showToast(`${quantity} × ${product.name} added to your cart.`)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedPlant?.name)
    showToast(`${product.name} added. Taking you to checkout.`)
    navigate('/cart')
  }

  return (
    <>
      {/* Breadcrumb */}
      <Container className="py-6 text-xs text-charcoal/50">
        <Link to="/">Home</Link> / <Link to="/packages">Packages</Link> /{' '}
        <span className="text-charcoal">{product.name} Collection</span>
      </Container>

      {/* Main product grid */}
      <Container className="pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
          <motion.img
            src={gallery[activeImage]}
            alt={`${product.name} Collection`}
            className="w-full h-80 sm:h-[28rem] object-cover rounded-2xl shadow-soft"
            initial={{ opacity: 0.6, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.32 }}
          />
          <div className="flex items-center gap-3 mt-4 overflow-x-auto no-scrollbar">
            {gallery.map((img, i) => (
              <motion.button
                key={img + i}
                onClick={() => setActiveImage(i)}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition duration-300 ${
                  activeImage === i ? 'border-olive' : 'border-transparent hover:border-gold/40'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-charcoal/50 mb-3">
            <span className="flex items-center gap-1.5"><Heart size={14} className="text-brown" /> Comfort</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-brown" /> Quality Checked</span>
            <span className="flex items-center gap-1.5"><Gift size={14} className="text-brown" /> Gift Ready</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">{product.name}</h1>
          <p className="text-charcoal/50 italic mt-1">{product.tagline}</p>

          <div className="mt-3">
            <RatingStars rating={product.rating} reviews={product.reviews} size="text-base" />
          </div>

          <p className="text-charcoal/40 text-xs uppercase tracking-label mt-4">
            Candle Scent: {product.scent}
          </p>
          <p className="text-charcoal/70 mt-3 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>

          {/* Package Includes — matches reference image */}
          <div className="mt-7 pb-6 border-b border-charcoal/8">
            <PackageIncludes />
          </div>

          {product.plantOptions?.length > 0 && (
            <p className="text-xs text-charcoal/40 mt-5">
              🐾 Pet-friendly and non-pet-friendly plant options available below.
            </p>
          )}

          <p className="font-serif text-3xl text-charcoal mt-7">
            LE {product.price.toLocaleString()}
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-5">
            <span className="text-xs uppercase tracking-label text-charcoal/40">Quantity</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Button onClick={handleAddToCart} size="lg" fullWidth>
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </Button>
            <Button onClick={handleBuyNow} variant="outline" size="lg" fullWidth>
              Buy Now
            </Button>
          </div>

          <AnimatePresence>
            {added && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-sage-600 mt-3">
              {quantity} × {product.name} Collection added.{' '}
              <Link to="/cart" className="underline">View Cart</Link>
            </motion.p>
          )}
          </AnimatePresence>
          <p className="text-xs text-charcoal/40 mt-4">🎁 Beautifully packaged and ready to gift.</p>
        </motion.div>
      </Container>

      {/* Smart plant chooser — engine-driven, reflects pet preference + collection */}
      <PlantOptionSelector
        product={product}
        petFriendly={petFriendly}
        onChange={setPetFriendly}
        quizContext={plantCtx}
      />

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-olive py-14 sm:py-16">
          <Container>
            <h2 className="font-serif text-2xl sm:text-3xl text-cream mb-8 text-center">
              You May Also Love
            </h2>
            <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Stagger>
          </Container>
        </section>
      )}
    </>
  )
}
