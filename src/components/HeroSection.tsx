import { useRef, useEffect, useState } from "react";
import heroImage from "@/assets/tech-fest-hero.jpg";
import { Button } from "@/components/ui/button";
import { Play, VolumeX, Volume2 } from "lucide-react";
import techFestVideo from "/tech-fest-video.mp4";

interface HeroSectionProps {
  onScrollToForm: () => void;
}

const HeroSection = ({ onScrollToForm }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

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
        // Try to play with audio first (unmuted)
        video.muted = false;
        setIsMuted(false);
        video.play().catch((error) => {
          console.log('Autoplay with audio failed, trying muted:', error);
          // If autoplay with audio fails, fall back to muted
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {
            console.error('Even muted autoplay failed');
            setShowPlayButton(true);
          });
        });
      }
    };



    video.addEventListener('canplay', tryPlayVideo);
    video.addEventListener('loadeddata', tryPlayVideo);
    
    // Force load the video
    console.log('🎥 Video element created, attempting to load:', video.src);
    video.load();

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
    
    // Try to play with audio first
    video.muted = false;
    setIsMuted(false);
    video.play().then(() => {
      setShowPlayButton(false);
    }).catch((error) => {
      console.log('Manual play with audio failed, trying muted:', error);
      // If play with audio fails, fall back to muted
      video.muted = true;
      setIsMuted(true);
      video.play().then(() => {
        setShowPlayButton(false);
      }).catch(() => {
        console.error('Even muted play failed');
      });
    });
  };

  const handleRegisterClick = () => {
    // Pause video when user clicks register
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    onScrollToForm();
  };

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video || isToggling) return;
    
    setIsToggling(true);
    const wasPaused = video.paused;
    const wasPlaying = !video.paused;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
    
    // On mobile, unmuting often pauses the video, so we need to play it again
    if (!video.muted && (wasPaused || video.paused)) {
      try {
        await video.play();
        console.log('Successfully playing with audio');
      } catch (error) {
        console.log('Play after unmute failed:', error);
        // If play with sound fails, fall back to muted
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch (muteError) {
          console.log('Even muted play failed after unmute attempt');
        }
      }
    } else if (video.muted && wasPlaying && video.paused) {
      // If video was playing and got paused during muting, restart it
      try {
        await video.play();
      } catch (error) {
        console.log('Restart after mute failed:', error);
      }
    }
    
    setIsToggling(false);
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
          loop 
          playsInline 
          preload="metadata"
          className="min-h-full min-w-full object-cover"
          style={{ 
            filter: 'none'
          }}
          src={techFestVideo}
          muted={isMuted}
        >
          Your browser does not support the video tag.
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

        {/* Mute/Unmute Button */}
        {!videoError && (
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={toggleMute}
              disabled={isToggling}
              className={`flex items-center justify-center w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                isToggling ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              title={
                isToggling 
                  ? "Loading..." 
                  : isMuted 
                    ? "Unmute video (tap to hear audio)" 
                    : "Mute video"
              }
            >
              {isToggling ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
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