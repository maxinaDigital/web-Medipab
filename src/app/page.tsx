import { HeroSection } from "@/components/home/HeroSection";
import { QuickActionsBar } from "@/components/home/QuickActionsBar";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TrustSignals } from "@/components/home/TrustSignals";
import { MaternityHighlight } from "@/components/home/MaternityHighlight";
import { TeamPreview } from "@/components/home/TeamPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LocationMap } from "@/components/home/LocationMap";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="py-8 bg-brand-bg">
        <QuickActionsBar />
      </div>
      <ServicesPreview />
      <TrustSignals />
      <MaternityHighlight />
      <TeamPreview />
      <Testimonials />
      <HowItWorks />
      <LocationMap />
      <CtaBanner />
    </>
  );
}
