import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const MotionLink = motion(Link)

const VARIANTS = {
  primary: 'bg-olive text-cream hover:bg-olive-dark border border-olive shadow-sm hover:shadow-lift',
  outline: 'bg-transparent text-olive border border-olive hover:bg-olive hover:text-cream',
  sage: 'bg-sage text-white hover:bg-sage-600 border border-sage shadow-sm hover:shadow-lift',
  ghost: 'bg-transparent text-charcoal border border-charcoal/20 hover:border-charcoal hover:bg-white/60',
  light: 'bg-cream text-olive border border-cream hover:bg-beige-dark',
}

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
}

const motionProps = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.22, ease: 'easeOut' },
}

export default function Button({
  children,
  to,
  state,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const classes = `relative overflow-hidden inline-flex items-center justify-center gap-2 font-medium uppercase tracking-label rounded-full transition duration-300 ease-out ${SIZES[size]} ${VARIANTS[variant]} ${
    fullWidth ? 'w-full' : ''
  } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`

  if (to) {
    return (
      <MotionLink to={to} state={state} className={classes} {...motionProps} {...props}>
        <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...props}>
        <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...(!disabled ? motionProps : {})}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}
