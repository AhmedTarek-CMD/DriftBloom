import React from "react";
import Container from "../common/Container.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import ProductCard from "../packages/ProductCard.jsx";
import Button from "../common/Button.jsx";
import { Stagger } from "../common/Motion.jsx";
import { getBestSellers } from "../../data/products.js";

export default function BestSellers() {
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <section className="bg-beige py-16 sm:py-20">
      <Container>
        <SectionTitle
          eyebrow="Loved by our community"
          title="Best Sellers"
          description="The packages our customers keep coming back to — and gifting again and again."
        />
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Stagger>
        <div className="flex justify-center mt-10">
          <Button to="/packages" variant="outline">
            View All Packages
          </Button>
        </div>
      </Container>
    </section>
  );
}
