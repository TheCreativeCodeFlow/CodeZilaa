import BackgroundEffects from "@/components/ui/BackgroundEffects";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import VisualizationShowcase from "@/components/VisualizationShowcase";
import LearningJourney from "@/components/LearningJourney";
import Stats from "@/components/Stats";
import WhyCodeZilaa from "@/components/WhyCodeZilaa";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#090909] text-gray-100 overflow-hidden selection:bg-cyan-500/30 selection:text-white">
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <Features />
      <VisualizationShowcase />
      <LearningJourney />
      <Stats />
      <WhyCodeZilaa />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
