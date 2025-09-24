import { useRef, useEffect, useState } from "react";
import heroImage from "@/assets/tech-fest-hero.jpg";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface HeroSectionProps {
  onScrollToForm: () => void;
}

const HeroSection = ({ onScrollToForm }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Debug video loading
    video.addEventListener('loadstart', () => {
      console.log('Video loading started');
      setVideoError(false);
    });
    video.addEventListener('loadeddata', () => {
      console.log('Video data loaded');
      setVideoError(false);
    });
    video.addEventListener('canplay', () => {
      console.log('Video can start playing');
      setShowPlayButton(false);
      setVideoError(false);
    });
    video.addEventListener('error', (e) => {
      console.error('Video error:', e);
      console.error('Video error details:', {
        networkState: video?.networkState,
        readyState: video?.readyState,
        currentSrc: video?.currentSrc
      });
      setVideoError(true);
    });

    video.addEventListener('play', () => setShowPlayButton(false));
    video.addEventListener('pause', () => {
      // Only show play button if we're in the visible area
      const heroSection = video.closest('section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (isVisible) {
          setShowPlayButton(true);
        }
      }
    });

    // Force video to play when it's ready
    const tryPlayVideo = () => {
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA
        video.play().catch((error) => {
          console.error('Autoplay failed:', error);
          setShowPlayButton(true);
          // Try playing without sound
          video.muted = true;
          video.play().catch(() => {
            console.error('Manual play also failed');
            setShowPlayButton(true);
          });
        });
      }
    };



    video.addEventListener('canplay', tryPlayVideo);
    video.addEventListener('loadeddata', tryPlayVideo);

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

    // Force load the video
    video.load();
    
    // Initial check after a small delay
    setTimeout(handleScroll, 1000);

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('canplay', tryPlayVideo);
      video.removeEventListener('loadeddata', tryPlayVideo);
    };
  }, []);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = true;
    video.play().then(() => {
      setShowPlayButton(false);
    }).catch((error) => {
      console.error('Manual play failed:', error);
    });
  };

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
          preload="metadata"
          className="min-h-full min-w-full object-cover"
          style={{ 
            filter: 'none'
          }}
        >
          <source src="/tech-fest-video.mp4" type="video/mp4" />
          <source src="/tech-fest-video.webm" type="video/webm" />
        </video>

        {/* Play Button Overlay */}
        {(showPlayButton && !videoError) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <button
              onClick={handleManualPlay}
              className="flex items-center justify-center w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
            >
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </button>
          </div>
        )}

        {/* Fallback content when video fails to load */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center">
            <div className="text-center text-white/80">
              <h2 className="text-2xl font-bold mb-4">🎥 Video Loading...</h2>
              <p className="text-sm">Upload your video as tech-fest-video.mp4 in the public folder</p>
            </div>
          </div>
        )}
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