import Hero from "../components/landing/Hero";
import TrustedSection from "../components/landing/TrustedSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import StudyWorksSection from "../components/landing/StudyWorksSection";
import WhyStudyCircle from "../components/landing/WhyStudyCircle";
import FAQSection from "../components/landing/FAQSection";
import CTASection from "../components/landing/CTASection";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <TrustedSection />
      <FeaturesSection />
      <StudyWorksSection />
      <WhyStudyCircle />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default LandingPage;
