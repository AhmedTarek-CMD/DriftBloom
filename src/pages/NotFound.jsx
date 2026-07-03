import React from 'react'
import Container from '../components/common/Container.jsx'
import Button from '../components/common/Button.jsx'

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-brown text-sm tracking-label uppercase mb-3">404</p>
      <h1 className="font-serif text-4xl text-charcoal mb-4">Page Not Found</h1>
      <p className="text-charcoal/60 mb-8">
        The page you're looking for has drifted away. Let's get you back home.
      </p>
      <Button to="/">Back to Home</Button>
    </Container>
  )
}
