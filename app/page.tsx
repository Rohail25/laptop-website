import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProduct } from "@/components/sections/FeaturedProduct";
import { Collection } from "@/components/sections/Collection";
import { Brands } from "@/components/sections/Brands";
import { Performance } from "@/components/sections/Performance";
import { Materials } from "@/components/sections/Materials";
import { InteractiveShowcase } from "@/components/sections/InteractiveShowcase";
import { Comparison } from "@/components/sections/Comparison";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Technology } from "@/components/sections/Technology";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProduct />
        <Collection />
        <Brands />
        <Performance />
        <Materials />
        <InteractiveShowcase />
        <Comparison />
        <Ecosystem />
        <Technology />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
