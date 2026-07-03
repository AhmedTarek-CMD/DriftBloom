import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import { Stagger, fadeUp } from "../common/Motion";

// Images
import returnImg from "../../assets/return.jpeg";
import growthImg from "../../assets/growth.jpeg";
import stillnessImg from "../../assets/stillness.jpeg";
import homeImg from "../../assets/home.jpeg";
import groundedImg from "../../assets/grounded.jpeg";
import joyImg from "../../assets/joy.jpeg";
import loveImg from "../../assets/love.jpeg";
import dreamImg from "../../assets/dream.jpeg";
import renewalImg from "../../assets/renewal.jpeg";
import balanceImg from "../../assets/balance.jpeg";

const COLLECTIONS = [
  {
    id: "return",
    label: "Return",
    image: returnImg,
  },
  {
    id: "growth",
    label: "Growth",
    image: growthImg,
  },
  {
    id: "stillness",
    label: "Stillness",
    image: stillnessImg,
  },
  {
    id: "home",
    label: "Home",
    image: homeImg,
  },
  {
    id: "grounded",
    label: "Grounded",
    image: groundedImg,
  },
  {
    id: "joy",
    label: "Joy",
    image: joyImg,
  },
  {
    id: "love",
    label: "Love",
    image: loveImg,
  },
  {
    id: "dream",
    label: "Dream",
    image: dreamImg,
  },
  {
    id: "renewal",
    label: "Renewal",
    image: renewalImg,
  },
  {
    id: "balance",
    label: "Balance",
    image: balanceImg,
  },
];

export default function CuratedCollections() {
  return (
    <section className="bg-ivory py-16 sm:py-20">
      <Container>
        <SectionTitle title="Curated Collections" />

        {/* ================= MOBILE ================= */}

        <div className="md:hidden -mx-4 px-4">
          <Stagger className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
            {COLLECTIONS.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="shrink-0 snap-start w-[240px]"
              >
                <Link to={`/packages/${item.id}`} className="group block">
                  <div
                    className="
                  rounded-[26px]
                  overflow-hidden
                  bg-[#F6F1E8]
                  border border-[#E5DCCB]
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:shadow-2xl"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-[400px] aspect-[3/4] object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Stagger>
        </div>

        {/* ================= DESKTOP ================= */}

        <Stagger className="hidden md:grid md:grid-cols-5 lg:grid-cols-10 gap-6">
          {COLLECTIONS.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <Link
                to={`/packages/${item.id}`}
                className="group block"
                aria-label={`View ${item.label} collection`}
              >
                <div
                  className="
                overflow-hidden
                bg-[#F6F1E8]
                border border-[#E5DCCB]
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-2xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="
                    w-full
                    h-56
                    aspect-[3/4]
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </Stagger>

        <div className="flex justify-center mt-12">
          <Button to="/packages">View All Collections</Button>
        </div>
      </Container>
    </section>
  );
}
