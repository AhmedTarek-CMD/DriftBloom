import React from "react";
import Hero from "../components/home/Hero.jsx";
import USPStrip from "../components/common/USPStrip.jsx";
import BestSellers from "../components/home/BestSellers.jsx";
import About from "../components/home/About.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import FindYourSoulPromo from "../components/home/FindYourSoulPromo.jsx";
import BuildYourPackagePromo from "../components/home/BuildYourPackagePromo.jsx";
import CuratedCollections from "../components/home/CuratedCollections.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <USPStrip />
      <CuratedCollections />
      <BestSellers />
      <About />
      <HowItWorks />
      <FindYourSoulPromo />
      <BuildYourPackagePromo />
    </>
  );
}
