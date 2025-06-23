/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';

// --- Reusable SVG Icon Components (for placeholders) ---

// A generic placeholder for client logos to demonstrate layout
const LogoPlaceholder = ({ width = '240', height = '100', uniqueId }) => (
  <div
    className="flex-shrink-0 mx-4 transition-transform duration-300 hover:scale-110 hover:z-10"
    role="listitem"
    style={{ cursor: 'pointer' }}
  >
    <img
      src={`https://picsum.photos/seed/${uniqueId}/${width}/${height}?grayscale`}
      alt={`Partner Logo ${uniqueId}`}
      width={width}
      height={height}
      className={`object-contain bg-gray-700 w-[${width}px] h-[${height}px]`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transition: 'box-shadow 0.3s, filter 0.3s',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
      }}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </div>
);

// --- Section Components ---

const HeroSection = () => {
  const heroText = "WHO WE ARE";
  const [loadingDone, setLoadingDone] = useState(false);
  const [titleHeight, setTitleHeight] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // --- Add these lines for logo color transition ---
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [useBlackLogo, setUseBlackLogo] = useState(false);

  useEffect(() => {
    function checkLogoOverlap() {
      const logo = logoRef.current;
      const bloom = document.getElementById('bloom-heading');
      if (!logo || !bloom) return;

      const logoRect = logo.getBoundingClientRect();
      const bloomSection = bloom.closest('section');
      if (!bloomSection) return;
      const bloomRect = bloomSection.getBoundingClientRect();

      // Check if logo overlaps vertically with BloomSection
      const overlap =
        logoRect.bottom > bloomRect.top &&
        logoRect.top < bloomRect.bottom &&
        logoRect.right > bloomRect.left &&
        logoRect.left < bloomRect.right;

      setUseBlackLogo(overlap);
    }

    window.addEventListener('scroll', checkLogoOverlap, { passive: true });
    window.addEventListener('resize', checkLogoOverlap);
    setTimeout(checkLogoOverlap, 100);

    return () => {
      window.removeEventListener('scroll', checkLogoOverlap);
      window.removeEventListener('resize', checkLogoOverlap);
    };
  }, []);
  // --- End logo color transition logic ---

  // Set the loader thickness to match the title font size
  React.useEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      setTitleHeight(parseFloat(computed.fontSize));
    }
  }, []);

  // End loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDone(true);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Animate percentage counter
  React.useEffect(() => {
    if (loadingDone) return;
    let start = Date.now();
    let raf: number;
    function animate() {
      const elapsed = Date.now() - start;
      let pct = Math.min(100, Math.round((elapsed / 3000) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => raf && cancelAnimationFrame(raf);
  }, [loadingDone]);

  // Loader animation CSS
  const keyframes = [
    { percent: 0, width: '0%' },
    { percent: 10, width: '12%' },
    { percent: 18, width: '16%' },
    { percent: 25, width: '28%' },
    { percent: 32, width: '31%' },
    { percent: 38, width: '40%' },
    { percent: 45, width: '44%' },
    { percent: 52, width: '55%' },
    { percent: 60, width: '61%' },
    { percent: 68, width: '70%' },
    { percent: 75, width: '74%' },
    { percent: 82, width: '83%' },
    { percent: 90, width: '91%' },
    { percent: 100, width: '100%' },
  ];

  // Loader animation CSS
  const loaderStyleTag = `
    @keyframes hero-loader-stutter {
      ${keyframes.map(kf => `${kf.percent}% { width: ${kf.width}; }`).join('\n')}
    }
    @keyframes hero-loader-fade {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;

  // Prevent scrolling during loading
  React.useEffect(() => {
    if (!loadingDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loadingDone]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" aria-labelledby="hero-heading">
      {/* Loader animation overlay - covers the whole viewport and hides all content */}
      <style>{loaderStyleTag}</style>
      {!loadingDone && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#181818] z-[9999]"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="relative flex items-center"
            style={{
              width: "0%",
              height: titleHeight ? `${titleHeight}px` : "4rem",
              background: "#fff",
              borderRadius: 0,
              animation:
                "hero-loader-stutter 3s cubic-bezier(.77,0,.18,1) forwards, hero-loader-fade 0.2s 3s linear forwards",
              opacity: 1,
              minWidth: "120px",
              justifyContent: "center",
              fontFamily: "'Goldman', sans-serif",
            }}
          >
            <span
              className="absolute left-1/2 top-1/2 text-[#181818] font-bold"
              style={{
                transform: "translate(-50%, -50%)",
                fontSize: titleHeight ? `${titleHeight * 0.5}px` : "2rem",
                userSelect: "none",
                pointerEvents: "none",
                letterSpacing: "0.05em",
              }}
            >
              {progress}%
            </span>
          </div>
        </div>
      )}
      {/* Centered "WHO WE ARE" text after loading */}
      <div
        className="w-full"
        style={{
          opacity: loadingDone ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        {/* Logo top left */}
        <a
          href="/"
          className="fixed left-4 top-4 flex items-center z-20"
          aria-label="Back to landing page"
          ref={logoRef}
        >
          <img
            src={useBlackLogo ? "/assets/logo/png-black.png" : "/assets/logo/png-white.png"}
            alt="Logo"
            className="h-20 w-auto sm:h-28"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
          />
        </a>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <h1
            ref={titleRef}
            id="hero-heading"
            className={`text-6xl sm:text-8xl lg:text-9xl font-extrabold text-gray-50 tracking-tighter leading-none transition-opacity duration-500`}
            style={{ textAlign: "center", marginTop: 0 }}
          >
            {heroText.split("").map((char, index) => (
              <span
                key={index}
                className="animate-letter-reveal inline-block"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
};

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      let progress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight * 0.5)));
      }
      // Clamp progress to [0, 1] always
      // If the section is out of view (scrolled past), keep progress at 1
      if (rect.bottom <= 0) {
        setScrollProgress(1);
      } else if (rect.top >= windowHeight) {
        setScrollProgress(0);
      } else {
        setScrollProgress(Math.max(0, Math.min(progress, 1)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for images (keep original size, only move/rotate)
  const getImageStyle = (index: number) => {
    // Grid positions in percent (relative to parent)
    const gridPositions = [
      { left: '25%', top: '0%', rot: 0 },   // Top-left
      { left: '74%', top: '0%', rot: 0 }, // Top-right
      { left: '74%', top: '100%', rot: 0 } // Bottom-right
    ];
    // You can change the values above to set the initial (start) position of each image.
    // For example, to move the top-left image more to the right, change '0%' to '10%' for left.
    const center = { left: '50%', top: '50%' };
    const initial = gridPositions[index];
    // Clamp move so images stop at center and don't move further
    const move = Math.max(0, Math.min(scrollProgress * 1.2, 1));
    // Move toward center as you scroll
    const left = `calc(${initial.left} + (${parseFloat(center.left) - parseFloat(initial.left)}%) * ${move})`;
    const top = `calc(${initial.top} + (${parseFloat(center.top) - parseFloat(initial.top)}%) * ${move})`;
    // Rotate a bit for effect
    const rot = (index === 0 ? -1 : index === 2 ? 1 : 0) * 15 * move;
    return {
      position: 'absolute' as const,
      left,
      top,
      transform: `translate(-50%, -50%) rotate(${rot}deg)`,
      transition: 'left 0.5s, top 0.5s, transform 0.5s',
      borderRadius: '0', // <-- Square corners
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      pointerEvents: 'none',
      background: '#444',
    };
  };

  // Text fade out as you scroll
  const textOpacity = scrollProgress < 0.3 ? 1 : Math.max(0, 1 - (scrollProgress - 0.3) / 0.2);

  // Overlay text appears as images bundle
  // Make overlay text start appearing much earlier (e.g. from 0.2 instead of 0.5)
  const overlayTextOpacity = scrollProgress > 0.2 ? Math.min(1, (scrollProgress - 0.2) / 0.2) : 0;
  const overlayTextTransform = scrollProgress > 0.2
    ? `translateY(${20 * (1 - ((scrollProgress - 0.2) / 0.2))}px)`
    : 'translateY(20px)';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] h-[100vh] bg-transparent overflow-visible"
      aria-labelledby="showcase-heading"
      style={{ zIndex: 2 }}
    >
      {/* Animated Images */}
      <div className="absolute inset-0 pointer-events-none" style={{ minHeight: 400 }}>
        {/* Top-left image */}
        <div
          style={{
            width: '40vw',
            height: '25vw',
            ...getImageStyle(0),
            zIndex: 10,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1749334927556-d9fae29d0637?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Filmmaker adjusting a camera on a tripod outdoors"
            className="w-full h-full object-cover"
            draggable={false}
            style={{
              transition: 'filter 0.4s',
              filter: overlayTextOpacity > 0.1 ? 'brightness(0.5)' : 'none'
            }}
          />
        </div>
        {/* Top-right image */}
        <div
          style={{
            width: '40vw',
            height: '25vw',
            ...getImageStyle(1),
            zIndex: 11,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
            alt="Group of diverse people working together on a hill"
            className="w-full h-full object-cover"
            draggable={false}
            style={{
              transition: 'filter 0.4s',
              filter: overlayTextOpacity > 0.1 ? 'brightness(0.5)' : 'none'
            }}
          />
        </div>
        {/* Bottom-right image */}
        <div
          style={{
            width: '40vw',
            height: '25vw',
            ...getImageStyle(2),
            zIndex: 12,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
            alt="Two professionals in a modern office discussing work"
            className="w-full h-full object-cover"
            draggable={false}
            style={{
              transition: 'filter 0.4s',
              filter: overlayTextOpacity > 0.1 ? 'brightness(0.5)' : 'none'
            }}
          />
        </div>
      </div>
      {/* Text fades out as you scroll */}
      {/* Removed the "With us, you're in safe hands..." text */}
      {/* Overlay text appears */}
      <div
        className="absolute inset-0 flex items-center transition-all duration-700"
        style={{
          opacity: overlayTextOpacity,
          transform: overlayTextTransform,
          zIndex: 40,
          pointerEvents: 'none',
          // Add this to ensure overlay is not above BloomSection
          display: scrollProgress === 1 ? 'none' : undefined,
        }}
      >
        {/* Vertical "Our Vision" on the left */}
        <div className="absolute left-25 top-2 h-full flex items-center z-50" style={{ marginTop: '60px' }}>
          <span
            className="text-2xl md:text-5xl font-extrabold uppercase text-white tracking-widest px-4"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: '0.2em',
              transform: 'rotate(180deg)',
              whiteSpace: 'nowrap',
            }}
          >
            Our Vision
          </span>
        </div>
        {/* Main vision text centered over images */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white px- max-w-xl">
            <div className="text-left text-white text-xl md:text-3xl font-light space-y-8" style={{ maxWidth: 560 }}>
              <p>
              We craft stories that resonate beyond the screen. Cinema is our bridge between imagination and reality.
              </p>
              <p>
              Every film is an emotional journey—capturing the essence of what makes us human.
              </p>
              <p>
              Where creativity meets purpose. Where stories become legacy.
              </p>
              <p>
              We amplify diverse voices and spark conversations that matter. We create cinema that counts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BloomSection = () => (
  <section className="bg-gray-100 text-gray-900 py-20 sm:py-32" aria-labelledby="bloom-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
      {/* Left Text Column */}
      <div className="flex flex-col justify-center">
        <p className="text-sm uppercase text-gray-500 mb-2" style={{ marginBottom: '1.5rem', marginTop: '-5rem' }}>ABOUT US</p>
        <h2 id="bloom-heading" className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-8" style={{ marginTop: '-2.0rem' }}>
          Created By João Mendes
        </h2>
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed font-light">
          <p>
            I'm João Mendes, a videographer who specializes in documentaries and commercials, driven by a technical vision that blends the soul of Portuguese cinema with contemporary rhythms and innovative techniques.
          </p>
          <p className="font-bold text-lg mt-6 mb-2">
            Craft &amp; Innovation
          </p>
          <p>
            My approach is rooted in precision and authenticity. Every project reflects a deep understanding of both traditional cinematic language and modern storytelling demands. This technical foundation allows me to create visual narratives that resonate across cultures while maintaining their distinct Portuguese character.
          </p>
          <p>
            Beyond the camera, I operate a specialized workshop where I design and fabricate custom filming equipment. This unique combination of creative vision and technical craftsmanship ensures that every DSFilms production benefits from tools specifically engineered to capture our artistic intent.
          </p>
          <p className="font-bold text-lg mt-6 mb-2">
            The Drive
          </p>
          <p>
            I can't explain exactly what drew me to filmmaking, but I know with absolute certainty that nothing brings me more joy and purpose than being behind the lens. Eight years in, every project still feels like a discovery—a chance to push boundaries and create something meaningful.
          </p>
          <p>
            Technical precision. Creative passion. Portuguese soul.
          </p>
        </div>
      </div>
      {/* Right Image Column */}
      <div className="w-full h-96 md:h-auto bg-gray-300">
        <img
          src="/assets/images/mendes.jpg"
          alt="João Mendes portrait"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </section>
);

const PartnersSection = () => {
  const NUM_UNIQUE_LOGOS = 8;
  const LOGO_DUPLICATIONS = 3;
  const LOGO_WIDTH_PX = 240; // Increased size
  const LOGO_HEIGHT_PX = 100; // Increased size
  const LOGO_GAP_PX = 32;

  const uniqueLogoIds = Array.from({ length: NUM_UNIQUE_LOGOS }, (_, i) => `logo-${i + 1}`);
  const animatedLogoIds = Array.from({ length: LOGO_DUPLICATIONS }, () => uniqueLogoIds).flat();
  const oneSetWidth = NUM_UNIQUE_LOGOS * (LOGO_WIDTH_PX + LOGO_GAP_PX);

  return (
    <section
      className="py-20 sm:py-32 px-0"
      aria-labelledby="partners-heading"
      style={{ backgroundColor: "#181818" }}
    >
      <div className="w-full">
        <div className="flex justify-between items-end mb-12 px-4 sm:px-6 lg:px-8">
          <h2 id="partners-heading" className="text-5xl sm:text-7xl font-extrabold text-gray-50 tracking-tighter">
            OUR PARTNERS
          </h2>
          <h3 className="text-4xl sm:text-6xl font-extrabold text-gray-50 tracking-tighter relative -bottom-4">
            & CLIENTS
          </h3>
        </div>
        {/* Logo Carousel Viewport */}
        <div
          className="w-full overflow-hidden relative py-8"
          role="region"
          aria-label="Continuously scrolling partner logos"
          style={{ backgroundColor: "#181818" }}
        >
          <style>
            {`
              @keyframes logo-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${oneSetWidth}px); }
              }
            `}
          </style>
          <div
            className="flex"
            role="list"
            style={{
              width: `${animatedLogoIds.length * (LOGO_WIDTH_PX + LOGO_GAP_PX)}px`,
              animation: `logo-scroll 30s linear infinite`,
            }}
          >
            {animatedLogoIds.map((logoId, index) => (
              <div key={`${logoId}-${index}`}>
                <LogoPlaceholder
                  uniqueId={logoId}
                  width={String(LOGO_WIDTH_PX)}
                  height={String(LOGO_HEIGHT_PX)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const CtaSection = () => (
  <section className="py-32 sm:py-48 px-4 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
    <div className="text-center">
      <h2 id="cta-heading" className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-gray-50 tracking-tighter leading-none">
        LET&apos;S
        <br />
        COLLABORATE
      </h2>
    </div>
  </section>
);

// --- Main Page Component ---

const AboutUsPage = () => {
  return (
    <div
      className="antialiased text-gray-50"
      style={{
        backgroundColor: "#181818",
        fontFamily: "'Goldman', sans-serif"
      }}
    >
      <main>
        <HeroSection />
        {/* Images and rest of content are always visible below */}
        <ShowcaseSection />
        <BloomSection />
        <PartnersSection />
        <CtaSection />
      </main>
    </div>
  );
};

export default AboutUsPage;
