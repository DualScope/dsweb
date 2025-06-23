/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// --- Reusable SVG Icon Components (for placeholders) ---

// A generic placeholder for client logos to demonstrate layout
const LogoPlaceholder = ({ width = '140', height = '50', uniqueId }) => (
  <div className="flex-shrink-0 mx-4" role="listitem"> {/* Added mx-4 for gap, flex-shrink-0 */}
    <img
      src={`https://picsum.photos/seed/${uniqueId}/${width}/${height}?grayscale`}
      alt={`Partner Logo ${uniqueId}`}
      width={width}
      height={height}
      className={`object-contain bg-gray-700 w-[${width}px] h-[${height}px]`} // Added explicit Tailwind w/h
      style={{ // Explicit style for dimensions as a fallback or override
        width: `${width}px`,
        height: `${height}px`,
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
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center text-xs uppercase text-gray-400 font-mono">
          <span>2019 - 2024</span>
          <a href="#" className="group inline-flex items-center gap-2">
            <span className="text-yellow-400" aria-hidden="true">▶</span>
            <span className="group-hover:text-white transition-colors">PLAY THE REEL</span>
          </a>
        </div>
        <div className="text-center py-32 sm:py-48">
          <h1 id="hero-heading" className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-gray-50 tracking-tighter leading-none">
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
  const [isTextVisible, setIsTextVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTextVisible(true);
          if (currentRef) {
            observer.unobserve(currentRef); // Stop observing once visible
          }
        }
      },
      {
        threshold: 0.65, // Trigger when 65% of the element is visible
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array: run effect once on mount, cleanup on unmount

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <p className="text-6xl font-light text-gray-50">B.</p>
            <div className="w-full h-64 bg-gray-700">
              <img src="https://images.unsplash.com/photo-1749334927556-d9fae29d0637?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Filmmaker adjusting a camera on a tripod outdoors" className="w-full h-full object-cover" />
            </div>
            <p className="max-w-xs text-xs uppercase text-gray-400 tracking-wider leading-relaxed">
              With us, you're in safe hands. We will secure your shoots in France, covering all technical, logistical, and administrative aspects.
            </p>
          </div>
          {/* Right Column */}
          <div className="space-y-8 lg:mt-32">
            <div className="w-full h-56 bg-gray-700">
               <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" alt="Group of diverse people working together on a hill" className="w-full h-full object-cover"/>
            </div>
             <div className="w-full h-56 bg-gray-700 lg:w-2/3 ml-auto">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop" alt="Two professionals in a modern office discussing work" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
        {/* Centered Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2
            id="showcase-heading"
            className={`
              text-5xl sm:text-7xl lg:text-8xl font-extrabold text-center text-gray-50
              tracking-tighter leading-tight max-w-4xl
              transition-all ease-out duration-1000 delay-300
              ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 sm:translate-y-12'}
            `}
          >
            UNITING CREATORS TO MAKE UNFORGETTABLE MOMENTS.
          </h2>
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
        <p className="text-sm uppercase text-gray-500 mb-4">ABOUT US</p>
        <h2 id="bloom-heading" className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-8">
          BLOOM.
          <br />
          WHERE IDEAS FLOURISH.
        </h2>
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed font-light">
          <p>
            Our founder, Remy Solomon, brings to the team nearly 10 years of experience, having worked with inspiring artists as well as the most discerning clients and directors on award-winning international projects.
          </p>
          <p>
            Thriving on attention to detail and the joy of delivering genuine service, he decided to dedicate all his energy to creating a true service-oriented entity in France.
          </p>
          <p>
            Bloom is also ready to support you globally, thanks to its precious affiliated production partners around the world (U.K., Spain, South Africa, U.S.A, Finland, Iceland, Serbia, Italy, Lithuania).
          </p>
        </div>
      </div>
      {/* Right Image Column */}
      <div className="w-full h-96 md:h-auto bg-gray-300">
         <img src="https://images.unsplash.com/photo-1563298059-365737be26b9?q=80&w=800&auto=format&fit=crop" alt="Elegant architectural facade of a historic building" className="w-full h-full object-cover"/>
      </div>
    </div>
  </section>
);

const PartnersSection = () => {
    const NUM_UNIQUE_LOGOS = 8; // Number of unique logos
    const LOGO_DUPLICATIONS = 3; // Number of times to duplicate the set for smooth scrolling
    const LOGO_WIDTH_PX = 140;
    const LOGO_GAP_PX = 32; // Corresponds to mx-4 (1rem = 16px, so 1rem on each side = 32px total gap)

    // Create an array of unique logo IDs
    const uniqueLogoIds = Array.from({ length: NUM_UNIQUE_LOGOS }, (_, i) => `logo-${i + 1}`);

    // Duplicate the logo IDs for a seamless loop
    const animatedLogoIds = Array.from({ length: LOGO_DUPLICATIONS }, () => uniqueLogoIds).flat();

    // Calculate the width of one full set of unique logos including gaps
    // Each logo has mx-4, meaning 1rem (16px) on left and 1rem on right.
    // So, total width taken by a logo including its side margins is LOGO_WIDTH_PX + LOGO_GAP_PX.
    const oneSetWidth = NUM_UNIQUE_LOGOS * (LOGO_WIDTH_PX + LOGO_GAP_PX);

    return (
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8" aria-labelledby="partners-heading">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12"> {/* Increased mb slightly */}
                    <h2 id="partners-heading" className="text-5xl sm:text-7xl font-extrabold text-gray-50 tracking-tighter">
                        OUR PARTNERS
                    </h2>
                    <h3 className="text-4xl sm:text-6xl font-extrabold text-gray-50 tracking-tighter relative -bottom-4">
                        & CLIENTS
                    </h3>
                </div>

                {/* Logo Carousel Viewport */}
                <div
                    className="logo-carousel-viewport w-full overflow-hidden relative"
                    role="region"
                    aria-label="Continuously scrolling partner logos"
                >
                    <div
                        className="flex animate-continuous-logo-scroll"
                        role="list"
                        style={{
                            width: `${animatedLogoIds.length * (LOGO_WIDTH_PX + LOGO_GAP_PX)}px`,
                            '--scroll-width': `-${oneSetWidth}px`
                        } as React.CSSProperties}
                    >
                        {animatedLogoIds.map((logoId, index) => (
                            <LogoPlaceholder
                                key={`${logoId}-${index}`} // Ensure unique keys for duplicated items
                                uniqueId={logoId} // Use the original ID for consistent image
                                width={String(LOGO_WIDTH_PX)}
                                height="50"
                            />
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
        LET'S
        <br />
        COLLABORATE
      </h2>
    </div>
  </section>
);


// --- Main Page Component ---

const AboutUsPage = () => {
  return (
    // The main container sets the base dark background and primary text color
    <div className="bg-gray-900 text-gray-50 font-sans antialiased">
      <main>
        <HeroSection />
        <ShowcaseSection />
        <BloomSection />
        <PartnersSection />
        <CtaSection />
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AboutUsPage />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}

export default AboutUsPage;