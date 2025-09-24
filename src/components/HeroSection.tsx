import heroImage from "@/assets/tech-fest-hero.jpg";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onScrollToForm: () => void;
}

const HeroSection = ({ onScrollToForm }: HeroSectionProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tech Fest Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>
      
      {/* Video Background Placeholder - User will replace with their video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-lg bg-muted/20 p-4 text-center text-muted-foreground backdrop-blur-sm">
          <p className="text-sm">Replace this with your autoplay video element</p>
          <p className="text-xs mt-1">Add: &lt;video autoPlay muted loop playsInline&gt;</p>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="mb-6 text-6xl font-bold tracking-tight md:text-8xl">
            <span className="gradient-primary bg-clip-text text-transparent">
              TECH FEST
            </span>
          </h1>
          
          {/* Date */}
          <p className="mb-8 text-xl text-foreground/80 md:text-2xl">
            March 15-17, 2025
          </p>
          
          {/* CTA Button */}
          <Button
            onClick={onScrollToForm}
            size="lg"
            className="glow-primary transition-bounce hover:scale-105 hover:glow-accent"
          >
            Register Now
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-6 w-1 rounded-full bg-gradient-to-b from-tech-primary to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;