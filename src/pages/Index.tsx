import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import RegistrationForm from "@/components/RegistrationForm";
import VideoCredits from "@/components/VideoCredits";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onScrollToForm={scrollToForm} />
      <div ref={formRef}>
        <RegistrationForm />
      </div>
      <VideoCredits />
    </div>
  );
};

export default Index;
