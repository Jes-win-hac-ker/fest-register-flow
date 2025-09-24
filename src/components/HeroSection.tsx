import { useRef, useEffect } from "react";
import heroImage from "@/assets/tech-fest-hero.jpg";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onScrollToForm: () => void;
}

const HeroSection = ({ onScrollToForm }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      const heroSection = video.closest('section');
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

      if (isVisible && video.paused) {
        video.play().catch(console.error);
      } else if (!isVisible && !video.paused) {
        video.pause();
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRegisterClick = () => {
    // Pause video when user clicks register
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    onScrollToForm();
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Fallback - Hidden when video loads */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tech Fest Background"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 gradient-hero opacity-30" />
      </div>
      
      {/* Video Background - Portrait Video Responsive */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          className="min-h-full min-w-full object-cover"
          style={{ 
            filter: 'none',
            width: 'auto',
            height: 'auto'
          }}
        >
          <source src="/tech-fest-video.mp4" type="video/mp4" />
          <source src="/tech-fest-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay - Minimal */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          {/* Empty content - video background only */}
        </div>
      </div>
      
      {/* Register Button - Positioned Lower */}
      <div className="absolute bottom-32 left-1/2 z-20 -translate-x-1/2">
        <Button
          onClick={handleRegisterClick}
          size="lg"
          className="glow-primary transition-bounce hover:scale-105 hover:glow-accent"
        >
          Register Now
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-6 w-1 rounded-full bg-gradient-to-b from-tech-primary to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;