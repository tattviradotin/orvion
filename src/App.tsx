import { useState, useEffect, useRef } from 'react';

import { NavbarDemo } from './components/Navbar';
import PageFade from './components/PageFade';
import PremiumFooter from './components/PremiumFooter';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { useAutoScrollAnimation } from './hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const industriesData = [
  {
    id: "smart-cities",
    title: "Smart Cities",
    description: "Transform urban infrastructure with AI-powered surveillance and monitoring systems that enhance public safety, traffic management, and resource optimization across metropolitan areas.",
    image: "/i1.jpeg",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Secure healthcare facilities with intelligent video monitoring that protects patients, staff, and sensitive areas while maintaining privacy compliance and operational efficiency.",
    image: "/i2.jpeg",
  },
  {
    id: "education",
    title: "Education",
    description: "Safeguard educational institutions with comprehensive security solutions that monitor campuses, protect students and staff, and provide real-time incident response capabilities.",
    image: "/i3.jpeg",
  },
  {
    id: "retail",
    title: "Retail & Commerce",
    description: "Enhance retail security and operations with AI-driven analytics that prevent theft, optimize store layouts, and provide valuable customer insights for business growth.",
    image: "/i4.jpeg",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Protect industrial facilities and ensure workplace safety with advanced video surveillance that monitors production lines, detects hazards, and ensures compliance.",
    image: "/i5.jpeg",
  },
];

const securityCarouselData = [
  {
    id: 'alerts',
    title: 'Intelligent Monitoring & Data Visualization',
    video: '/pv1.mp4',
    thumbnailFrame: 65,
  },
  {
    id: 'analytics',
    title: 'Smarter Streets with Intelligent Vision',
    video: '/pv2.mp4',
  },
  {
    id: 'access',
    title: 'Instant Threat Recognition & Response',
    video: '/pv3.mp4',
  },
];

const featuresData = [
  {
    id: 0,
    title: "Real-Time Analytics Dashboard",
    heading: "Turn raw video into actionable intelligence.",
    description: "Orvion's centralized dashboard provides live insights into detections, threat levels, system performance, and activity trends. Make data-driven security decisions with complete visibility.",
    benefits: [
      "Live detection counters & KPIs",
      "Confidence score tracking",
      "Heatmaps & activity graphs",
      "Camera-wise performance monitoring",
      "Historical trend analysis",
    ],
    video: "/3.mp4",
  },
  {
    id: 1,
    title: "Instant Threat Alerts",
    heading: "React to threats the moment they happen.",
    description: "Orvion instantly notifies your team when critical incidents are detected — reducing response time and preventing escalation. Stay proactive, not reactive.",
    benefits: [
      "Real-time alert notifications",
      "Email, SMS, or WhatsApp integration",
      "Snapshot evidence attached",
      "Severity-based alert prioritization",
      "Customizable alert rules",
    ],
    video: "/3.mp4",
  },
  {
    id: 2,
    title: "Flexible Model Updates",
    heading: "Adapt your security intelligence as threats evolve.",
    description: "Orvion allows you to update, switch, or deploy improved AI models without changing camera hardware. Your security system evolves without infrastructure upgrades.",
    benefits: [
      "Switch models per camera feed",
      "Upload custom-trained models",
      "Environment-specific AI deployment",
      "Continuous performance improvements",
    ],
    video: "/3.mp4",
  },
  {
    id: 3,
    title: "Cost-Effective AI Transformation",
    heading: "Unlock enterprise-grade AI surveillance at a fraction of traditional costs.",
    description: "Orvion converts existing cameras into intelligent monitoring systems — eliminating the need for expensive AI-enabled cameras. Upgrade intelligence, not equipment.",
    benefits: [
      "No hardware replacement",
      "Lower operational costs",
      "Scalable across multiple locations",
      "High ROI with minimal investment",
    ],
    video: "/3.mp4",
  },
];

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: '0px',
    top: '0px',
    opacity: 0,
  });
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [currentIndustry, setCurrentIndustry] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const securityCarouselRef = useRef<HTMLDivElement>(null);
  const securityCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const securityVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeSecurityCard, setActiveSecurityCard] = useState(1);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const featureVideoRef = useRef<HTMLVideoElement>(null);
  const featureVideoContainerRef = useRef<HTMLDivElement>(null);
  const [videoPosters, setVideoPosters] = useState<Record<string, string>>({});

  // Capture 60th frame as poster thumbnail
  const captureVideoFrame = (videoPath: string, frameNumber: number, fps = 30): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoPath;
      video.muted = true;
      video.playsInline = true;
      
      video.onloadedmetadata = () => {
        // Seek to the specified frame (frameNumber / fps = time in seconds)
        video.currentTime = frameNumber / fps;
      };
      
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const posterUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(posterUrl);
        } else {
          resolve('');
        }
        video.remove();
      };
      
      video.onerror = () => {
        resolve('');
        video.remove();
      };
    });
  };

  // Generate poster for pv1 video on mount (90th frame before playing)
  useEffect(() => {
    const generatePoster = async () => {
      // Only generate poster for pv1.mp4
      const pv1Card = securityCarouselData.find(card => card.video === '/pv1.mp4');
      if (pv1Card) {
        const poster = await captureVideoFrame(pv1Card.video, 90);
        if (poster) {
          setVideoPosters(prev => ({ ...prev, [pv1Card.video]: poster }));
        }
      }
    };
    generatePoster();
  }, []);

  // EmailJS form state
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'fAJTHqsWgDnO50Rsc';
    console.log('EmailJS Public Key:', publicKey.substring(0, 5) + '...');
    emailjs.init(publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const form = e.currentTarget;
    
    // Get first and last name values
    const firstName = (form.elements.namedItem('firstname') as HTMLInputElement)?.value || '';
    const lastName = (form.elements.namedItem('lastname') as HTMLInputElement)?.value || '';
    
    // Combine first and last name into a single name field
    const nameField = document.getElementById('nameField') as HTMLInputElement;
    if (nameField) {
      nameField.value = `${firstName} ${lastName}`.trim();
    }
    
    // Add time automatically
    const timeField = document.getElementById('timeField') as HTMLInputElement;
    if (timeField) {
      timeField.value = new Date().toLocaleString();
    }
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_0u54tvk';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_uffertc';
    
    console.log('Service ID:', serviceId);
    console.log('Template ID:', templateId);
    console.log('Form elements:', Array.from(form.elements).map((el) => (el as HTMLInputElement).name));
    
    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form
      );
      console.log('EmailJS Success:', result.status, result.text);
      
      setFormStatus('success');
      form.reset();
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      setFormStatus('error');
    }
  };



  // Auto-apply scroll animations to all text elements
  useAutoScrollAnimation();

  // Play video when feature section is scrolled into view
  useEffect(() => {
    if (!featureVideoRef.current || !featureVideoContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play video when section is visible
            featureVideoRef.current?.play().catch((error) => {
              console.log('Video play failed:', error);
            });
          } else {
            // Pause video when section is not visible
            featureVideoRef.current?.pause();
          }
        });
      },
      { threshold: 0.3 } // Start playing when 30% of the section is visible
    );

    observer.observe(featureVideoContainerRef.current);

    return () => {
      if (featureVideoContainerRef.current) {
        observer.unobserve(featureVideoContainerRef.current);
      }
    };
  }, []);

  // Handle video end event to automatically change to next feature
  useEffect(() => {
    const video = featureVideoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      // Move to next feature (loop back to first if at the end)
      setSelectedFeature((prev) => (prev + 1) % featuresData.length);
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  // Restart video when feature changes
  useEffect(() => {
    // Small delay to ensure the new video element is mounted
    const timeoutId = setTimeout(() => {
      const video = featureVideoRef.current;
      if (!video) return;

      // Reset video to start when feature changes
      video.currentTime = 0;
      
      // Play if section is visible
      if (featureVideoContainerRef.current) {
        const rect = featureVideoContainerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
        
        if (isVisible) {
          video.play().catch((error) => {
            console.log('Video play failed:', error);
          });
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedFeature]);


  // Mouse gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const whatWeDoSection = target.closest('.section-lumana-page-content');
      
      // Disable gradient effect when hovering over "What We Do" section
      if (whatWeDoSection) {
        setMouseGradientStyle(prev => ({ ...prev, opacity: 0 }));
        return;
      }
      
      setMouseGradientStyle({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
      });
    };
    const handleMouseLeave = () => {
      setMouseGradientStyle(prev => ({ ...prev, opacity: 0 }));
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Ripple effect on click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 1000);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);


  // Carousel scroll handler
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1);
      
      // Update current slide based on scroll position
      const itemWidth = 320;
      const newIndex = Math.round(scrollLeft / (itemWidth + 20));
      setCurrentIndustry(Math.min(newIndex, industriesData.length - 1));
    };

    carousel.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();

    return () => carousel.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const scrollCarousel = (direction: 'prev' | 'next') => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const itemWidth = 320; // max-w-[320px] + padding
    const scrollAmount = itemWidth + 20; // item width + gap
    const newScrollLeft = direction === 'prev' 
      ? carousel.scrollLeft - scrollAmount 
      : carousel.scrollLeft + scrollAmount;
    
    carousel.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  const scrollSecurityTo = (index: number, isInitial = false) => {
    const container = securityCarouselRef.current;
    const el = securityCardRefs.current[index];
    if (!container || !el) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const scrollTarget = container.scrollLeft + (elRect.left - containerRect.left) - (containerRect.width / 2) + (elRect.width / 2);

    container.scrollTo({
      left: scrollTarget,
      behavior: isInitial ? 'auto' : 'smooth',
    });

    if (isInitial) {
      setActiveSecurityCard(index);
    } else {
      window.setTimeout(() => {
        setActiveSecurityCard(index);
      }, 350);
    }
  };

  useEffect(() => {
    // keep centered on first paint without scrolling the page
    const t = setTimeout(() => scrollSecurityTo(activeSecurityCard, true), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Control video playback based on active card
  useEffect(() => {
    securityVideoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeSecurityCard) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeSecurityCard]);

  return (
    <div id="home">
    <PageFade className="min-h-screen bg-black">
      <NavbarDemo />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Video Background - same for all devices */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/cam3.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Transparent Blur Bar at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  Smart Monitoring Built for Real-World Protection
                </h1>
              </div>
              <div>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  Harnessing the power of real-time artificial intelligence, advanced deep learning models, and intelligent analytics to transform traditional surveillance into a proactive, predictive, and data-driven security ecosystem built for modern challenges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mouse Gradient Effect */}
        <div
          id="mouse-gradient-react"
          className="w-60 h-60 blur-xl sm:w-80 sm:h-80 sm:blur-2xl md:w-96 md:h-96 md:blur-3xl"
          style={{
            left: mouseGradientStyle.left,
            top: mouseGradientStyle.top,
            opacity: mouseGradientStyle.opacity,
          }}
        ></div>

        {/* Ripple Effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="ripple-effect"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          ></div>
        ))}



      </section>

      {/* What We Do Section */}
      <section id="purpose" className="section-lumana-page-content lumana-bg-is-grey-2 pt-12 md:pt-16 pb-12 md:pb-16" data-animate>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider mb-6">
              WHAT WE DO
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 tracking-tight max-w-5xl mx-auto leading-tight">
              Bring the power of AI to video security, enabling any camera to perceive, understand, and act when it matters most.
            </h2>
          </div>
        </div>
      </section>

      {/* Security Carousel Section */}
      <section className="pt-10 md:pt-14 pb-12 md:pb-16 bg-black" data-animate>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Proactive physical security, powered by AI
          </h2>
        </div>

        <div className="mt-10 md:mt-12 w-full overflow-hidden">
          <div className="relative">
            <div
              ref={securityCarouselRef}
              className="flex gap-8 overflow-hidden scroll-smooth snap-x snap-mandatory"
              style={{
                paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))',
                paddingRight: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))',
              }}
            >
              {securityCarouselData.map((card, idx) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    securityCardRefs.current[idx] = el;
                  }}
                  className="relative snap-center flex-shrink-0"
                >
                  <div className="relative h-[420px] md:h-[520px] w-[86vw] sm:w-[72vw] lg:w-[920px] overflow-hidden rounded-2xl bg-[#0b2233] shadow-xl cursor-default">
                    <div className="absolute inset-0">
                      <video
                        ref={(el) => {
                          securityVideoRefs.current[idx] = el;
                        }}
                        src={card.video}
                        poster={videoPosters[card.video] || undefined}
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover object-center opacity-90"
                        onError={(e) => {
                          // fallback to a dark gradient if video not present
                          (e.currentTarget as HTMLVideoElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-transparent" />
                    </div>

                    <div className="relative z-10 p-8 md:p-10">
                      <div className="flex items-start gap-3">
                        <span className="text-cyan-300 text-2xl leading-none">✦</span>
                        <h3 className="text-white text-3xl md:text-4xl font-semibold leading-tight whitespace-pre-line drop-shadow-lg">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Arrow controls pinned to this card's edges on desktop */}
                  {idx === activeSecurityCard && (
                    <>
                      <button
                        aria-label="Previous"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollSecurityTo(Math.max(0, idx - 1));
                        }}
                        disabled={idx === 0}
                        className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white text-black border border-white/80 disabled:bg-white/60 disabled:text-black/60 disabled:border-white/60 disabled:cursor-not-allowed items-center justify-center z-30 shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <ArrowLeft className="size-5" />
                      </button>
                      <button
                        aria-label="Next"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollSecurityTo(Math.min(securityCarouselData.length - 1, idx + 1));
                        }}
                        disabled={idx === securityCarouselData.length - 1}
                        className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white text-black border border-white/80 disabled:bg-white/60 disabled:text-black/60 disabled:border-white/60 disabled:cursor-not-allowed items-center justify-center z-30 shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <ArrowRight className="size-5" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="pt-12 md:pt-16 pb-12 md:pb-16 bg-black" data-animate>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl text-white">
                AI-Driven Security for Every Industry
              </h2>
            </div>
            <div className="hidden shrink-0 gap-2 md:flex">
              <button
                onClick={() => scrollCarousel('prev')}
                disabled={!canScrollPrev}
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-auto text-white"
              >
                <ArrowLeft className="size-5 stroke-2" strokeWidth={2} fill="none" />
              </button>
              <button
                onClick={() => scrollCarousel('next')}
                disabled={!canScrollNext}
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-auto text-white"
              >
                <ArrowRight className="size-5 stroke-2" strokeWidth={2} fill="none" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div
            ref={carouselRef}
            className="grid gap-6 md:flex md:overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))'
            }}
          >
            {industriesData.map((item, index) => (
              <div
                key={item.id}
                className={`w-full md:max-w-[320px] lg:max-w-[360px] flex-shrink-0 ${
                  index === 0 ? '' : 'md:pl-5'
                } ${
                  index === industriesData.length - 1 ? 'md:pr-6' : ''
                }`}
              >
                <div 
                  className="group rounded-xl block"
                >
                  <div className="group relative h-full min-h-[22rem] md:min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold text-white md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9 text-sm md:text-base text-white/90 group-hover:line-clamp-none transition-all duration-300">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {industriesData.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentIndustry === index ? "bg-white" : "bg-gray-600"
                }`}
                onClick={() => {
                  const carousel = carouselRef.current;
                  if (carousel) {
                    const itemWidth = 320;
                    carousel.scrollTo({ left: index * (itemWidth + 20), behavior: 'smooth' });
                    setCurrentIndustry(index);
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-partner" className="pt-6 md:pt-8 pb-12 md:pb-16 bg-black" data-animate>
        <div className="max-w-7xl mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-12">
              Why security and IT leaders choose Tattvira
            </h2>
            
            {/* Feature Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8">
              {featuresData.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(index)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedFeature === index
                      ? 'bg-white text-black border-0'
                      : 'bg-[#0a0a0a] text-white border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area - Single Card */}
          <div className="bg-[#0a0a0a] rounded-2xl shadow-2xl overflow-hidden min-h-[450px] md:min-h-[550px] border border-gray-800">
            <div className="grid md:grid-cols-2 items-stretch h-full min-h-[450px] md:min-h-[550px]">
              {/* Left Panel - Content */}
              <div className="flex flex-col gap-4 justify-center p-6 md:p-8 lg:p-10">
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  {featuresData[selectedFeature].heading}
                </h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  {featuresData[selectedFeature].description}
                </p>
                
                {/* Benefits List */}
                <ul className="flex flex-col gap-3 mt-2">
                  {featuresData[selectedFeature].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <button className="mt-4 px-6 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300 w-fit">
                  Learn more
                </button>
              </div>

              {/* Right Panel - Video */}
              <div ref={featureVideoContainerRef} className="relative w-full h-full min-h-[350px] md:min-h-[450px]">
                <video
                  key={selectedFeature}
                  ref={featureVideoRef}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                >
                  <source src={featuresData[selectedFeature].video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-16 md:pt-20 pb-8 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
            <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
              <div className="text-center lg:text-left">
                <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl text-white">
                  Contact Us
                </h1>
                <p className="text-gray-300 mt-4">
                  We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!
                </p>
              </div>
            </div>
            <div className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border border-gray-800 p-6 md:p-10 bg-[#0a0a0a] shadow-lg">
              <form ref={formRef} onSubmit={handleSubmit}>
                <input type="hidden" id="nameField" name="name" />
                <input type="hidden" id="timeField" name="time" />
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="firstname" className="text-sm font-medium text-gray-300">
                      First Name
                    </label>
                    <Input type="text" id="firstname" name="firstname" placeholder="First Name" required />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="lastname" className="text-sm font-medium text-gray-300">
                      Last Name
                    </label>
                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name" required />
                  </div>
                </div>
                <div className="grid w-full items-center gap-1.5 mt-4">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <Input type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div className="grid w-full items-center gap-1.5 mt-4">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <Input type="text" id="subject" name="subject" placeholder="Subject" required />
                </div>
                <div className="grid w-full gap-1.5 mt-4">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <Textarea placeholder="Type your message here." id="message" name="message" required />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-white hover:bg-gray-200 text-black rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 mt-6 disabled:opacity-50"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Sent!' : formStatus === 'error' ? 'Try Again' : 'Send Message'}
                </Button>
                {formStatus === 'success' && (
                  <p className="text-green-400 text-center mt-3 text-sm">Message sent successfully!</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-400 text-center mt-3 text-sm">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
          </PageFade>
    </div>
  );
};

export default App;
