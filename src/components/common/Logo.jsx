import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

export default function Logo({ light = false, withTagline = true }) {
  const textColor = light ? "text-cream" : "text-charcoal";
  const subColor = light ? "text-cream/70" : "text-charcoal/50";

  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <div className="h-12 w-auto shrink-0">
        <img
          src={logo}
          alt="Drift & Bloom"
          className="h-full w-auto object-contain rounded-full"
        />
      </div>
      <div className="leading-tight">
        <span className={`font-serif text-xl sm:text-2xl ${textColor}`}>
          Drift <span className="text-brown">&amp;</span> Bloom
        </span>
        {withTagline && (
          <p
            className={`hidden sm:block text-[10px] tracking-label uppercase ${subColor}`}
          >
            Packages for your soul
          </p>
        )}
      </div>
    </Link>
  );
}
