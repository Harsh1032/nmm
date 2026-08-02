// src/app/page.tsx

import DataSovereigntySection from "@/components/landing/DataSovereigntySection";
import FinalCallToAction from "@/components/landing/FinalCallToAction";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import MissionSection from "@/components/landing/MissionSection";
import Navbar from "@/components/landing/Navbar";
import StakeholderPortals from "@/components/landing/StakeholderPortals";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <StakeholderPortals />
        <DataSovereigntySection />
        <MissionSection />
        <FinalCallToAction />
      </main>

      <Footer />
    </>
  );
}