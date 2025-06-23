import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// --- Intro Loader Animation (show only once per page load) ---
let landingLoaderShown = false;

const LandingIntroLoader = ({ text = "DSFILMS" }) => {
  const [loadingDone, setLoadingDone] = useState(landingLoaderShown);
  const [titleHeight, setTitleHeight] = useState(null);
  const [progress, setProgress] = useState(0);
  const titleRef = useRef(null);

  useEffect(() => {
	if (loadingDone) return;
	if (titleRef.current) {
	  const computed = window.getComputedStyle(titleRef.current);
	  setTitleHeight(parseFloat(computed.fontSize));
	}
  }, [loadingDone]);

  useEffect(() => {
	if (loadingDone) return;
	const timer = setTimeout(() => {
	  setLoadingDone(true);
	  landingLoaderShown = true; // Set the flag to true after loading
	}, 3200);
	return () => clearTimeout(timer);
  }, [loadingDone]);

  useEffect(() => {
	if (loadingDone) return;
	let start = Date.now();
	let raf;
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

  const loaderStyleTag = `
	@keyframes hero-loader-stutter {
	  ${keyframes.map(kf => `${kf.percent}% { width: ${kf.width}; }`).join('\n')}
	}
	@keyframes hero-loader-fade {
	  0% { opacity: 1; }
	  100% { opacity: 0; }
	}
  `;

  useEffect(() => {
	if (!loadingDone) {
	  document.body.style.overflow = 'hidden';
	} else {
	  document.body.style.overflow = '';
	}
	return () => {
	  document.body.style.overflow = '';
	};
  }, [loadingDone]);

  if (loadingDone) return null;

  return (
	<div>
	  <style>{loaderStyleTag}</style>
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
	/* Centered text after loading */
		<div
		  className="w-full"
		  style={{
			opacity: loadingDone ? 1 : 0,
			transition: "opacity 0.2s",
		  }}
		>
		  <div
			className="absolute inset-0 flex items-center justify-center"
			style={{
			zIndex: 10,
			pointerEvents: "none",
			}}
		  >
			<h1
			ref={titleRef}
			className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-gray-50 tracking-tighter leading-none transition-opacity duration-500"
			style={{ textAlign: "center", marginTop: 0, fontFamily: "'Goldman', sans-serif" }}
			>
			{text.split("").map((char, index) => (
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
		</div>
	  );
	};
	// --- End Intro Loader Animation ---

	const videos = [
		{
			id: 1,
			artist: '2024',
			title: 'Águas Calmas',
			duration: '00:01:15',
			poster: '/assets/images/1.jpg',
			videoSrc: '/assets/videos/v1.mp4',
		},
		{
			id: 2,
			artist: '2024',
			title: 'Shapers',
			duration: '00:02:30',
			poster: '/assets/images/2.jpg',
			videoSrc: '/assets/videos/v2.mp4',
		},
		{
			id: 3,
			artist: '2023',
			title: 'Fauna Sicó',
			duration: '00:01:45',
			poster: '/assets/images/3.jpg',
			videoSrc: '/assets/videos/v3.mp4',
		},
		{
			id: 4,
			artist: '2025',
			title: 'Sarrano',
			duration: '00:02:10',
			poster: '/assets/images/4.jpg',
			videoSrc: '/assets/videos/v4.mp4',
		},
		{
			id: 5,
			artist: '2022',
			title: 'Get Close',
			duration: '00:01:55',
			poster: '/assets/images/5.jpg',
			videoSrc: '/assets/videos/v5.mp4',
		},
	];

const CornerFrames = () => (
	<div className="corner-frames">
		<svg
			width="22"
			height="22"
			viewBox="0 0 22 22"
			className="corner corner-tl"
		>
			<line x1="0.5" y1="0" x2="0.5" y2="22" stroke="#F0F2F1" />
			<line x1="0" y1="0.5" x2="22" y2="0.5" stroke="#F0F2F1" />
		</svg>
		<svg
			width="22"
			height="22"
			viewBox="0 0 22 22"
			className="corner corner-tr"
		>
			<line x1="21.5" y1="0" x2="21.5" y2="22" stroke="#F0F2F1" />
			<line x1="22" y1="0.5" x2="0" y2="0.5" stroke="#F0F2F1" />
		</svg>
		<svg
			width="22"
			height="22"
			viewBox="0 0 22 22"
			className="corner corner-bl"
		>
			<line x1="0.5" y1="22" x2="0.5" y2="0" stroke="#F0F2F1" />
			<line x1="0" y1="21.5" x2="22" y2="21.5" stroke="#F0F2F1" />
		</svg>
		<svg
			width="22"
			height="22"
			viewBox="0 0 22 22"
			className="corner corner-br"
		>
			<line x1="21.5" y1="22" x2="21.5" y2="0" stroke="#F0F2F1" />
			<line x1="22" y1="21.5" x2="0" y2="21.5" stroke="#F0F2F1" />
		</svg>
	</div>
);

// Add this new component above Thumbnail
const CenterCrosshair = () => (
	<div className="center-crosshair">
		<svg width="60" height="60" viewBox="0 0 60 60">
			{/* Top-left corner */}
			<line x1="0" y1="20" x2="0" y2="0" stroke="#F0F2F1" strokeWidth="2" />
			<line x1="0" y1="0.5" x2="20" y2="0.5" stroke="#F0F2F1" strokeWidth="2" />
			{/* Top-right corner */}
			<line x1="40" y1="0" x2="60" y2="0" stroke="#F0F2F1" strokeWidth="2" />
			<line x1="60" y1="0.5" x2="60" y2="20" stroke="#F0F2F1" strokeWidth="2" />
			{/* Bottom-left corner */}
			<line x1="0" y1="40" x2="0" y2="60" stroke="#F0F2F1" strokeWidth="2" />
			<line x1="0" y1="60" x2="20" y2="60" stroke="#F0F2F1" strokeWidth="2" />
			{/* Bottom-right corner */}
			<line x1="40" y1="60" x2="60" y2="60" stroke="#F0F2F1" strokeWidth="2" />
			<line x1="60" y1="60" x2="60" y2="40" stroke="#F0F2F1" strokeWidth="2" />
			{/* Plus sign in the center */}
			<line x1="30" y1="22" x2="30" y2="38" stroke="#F0F2F1" strokeWidth="2" />
			<line x1="22" y1="30" x2="38" y2="30" stroke="#F0F2F1" strokeWidth="2" />
		</svg>
	</div>
);

const Thumbnail = ({
	video,
	index,
	isActive,
	isPlayed,
	progress,
	isHovered,
	hoveredIndex,
	onMouseEnter,
	onMouseLeave,
	onClick,
}) => {
	const getBlurState = () => {
		if (isPlayed) return 'played';
		if (isActive) return 'playing';
		return 'unplayed';
	};

	const blurState = getBlurState();

	// Calculate position adjustment based on hovered state
	const getPositionClass = () => {
		if (hoveredIndex === null) return '';
		if (isHovered) return 'hovered';
		if (index < hoveredIndex) return 'move-left';
		if (index > hoveredIndex) return 'move-right';
		return '';
	};

	return (
		<div className={`thumbnail-container relative ${getPositionClass()}`}>
			{/* Text overlay above thumbnail */}
			{isHovered && (
				<div className="absolute -top-8 left-0 w-full text-gray-100 text-xs uppercase font-semibold z-20 flex justify-between">
					<span>{`0${video.id}`}</span>
					<span>{`${video.artist} | ${video.title}`}</span>
					<span className="font-normal">{video.duration}</span>
				</div>
			)}

			<div
				className={`thumbnail relative transition-all duration-500 ease-out cursor-pointer ${
					isHovered ? 'hovered' : ''
				} ${isActive ? 'active' : ''}`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
			>
				{/* Corner frames */}
				<CornerFrames />

				{/* Center crosshair only when hovered */}
				{isHovered && <CenterCrosshair />}

				{/* Image container with 16:9 aspect ratio */}
				<div className="relative w-full aspect-[16/9] overflow-hidden ">
					{/* Blur overlay - only behind progress bar on active thumbnail */}
					{blurState === 'playing' && progress < 100 && (
						<div
							className="absolute inset-0 /30 backdrop-blur-md z-10"
							style={{
								clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
								transition: 'clip-path 0.1s linear',
							}}
						/>
					)}

					{/* Progress bar - only visible on active thumbnail */}
					{isActive && (
						<div
							className="absolute top-0 bottom-0 w-px bg-gray-100 z-30 transition-all duration-100 ease-linear"
							style={{
								left: `calc(${progress}% - 0.5px)`,
							}}
						/>
					)}

					{/* Main image */}
					<img
						src={video.poster}
						alt={`${video.artist} - ${video.title}`}
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

// Utility to get average luminance of a region in a canvas
function getAverageLuminance(imageData) {
	let total = 0;
	const data = imageData.data;
	for (let i = 0; i < data.length; i += 4) {
		// Perceived luminance formula
		const r = data[i], g = data[i + 1], b = data[i + 2];
		const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
		total += lum;
	}
	return total / (imageData.width * imageData.height);
}

// Hook to get an array of luminance values for each letter in the title
function useLetterLuminance(videoRef, text, fontSize = 120) {
	const [luminances, setLuminances] = useState([]);

	useEffect(() => {
		if (!videoRef.current || !text) return;

		const video = videoRef.current;
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const width = video.videoWidth || 1280;
		const height = video.videoHeight || 720;
		canvas.width = width;
		canvas.height = height;

		// Draw current video frame to canvas
		try {
			ctx.drawImage(video, 0, 0, width, height);
		} catch {
			setLuminances(Array.from({ length: text.length }, () => 128));
			return;
		}

		// For each letter, sample the background behind where it would be rendered
		const letterBoxes = [];
		const totalTextWidth = ctx.measureText(text).width || (text.length * fontSize * 0.6);
		let x = (width - totalTextWidth) / 2;
		const y = height / 2 - fontSize / 2;
		for (let i = 0; i < text.length; i++) {
			const letter = text[i];
			const letterWidth = ctx.measureText(letter).width || fontSize * 0.6;
			letterBoxes.push({ x: Math.round(x), y: Math.round(y), w: Math.round(letterWidth), h: Math.round(fontSize) });
			x += letterWidth;
		}

		const lums = letterBoxes.map(box => {
			try {
				const imgData = ctx.getImageData(box.x, box.y, Math.max(1, box.w), Math.max(1, box.h));
				return getAverageLuminance(imgData);
			} catch {
				return 128;
			}
		});
		setLuminances(lums);
		// eslint-disable-next-line
	}, [videoRef, text]);

	return luminances;
}

// --- TimelineVisualizer: match ticks to videos and quarters ---
const TimelineVisualizer = ({
	majorCount = 5,
	minorPerMajor = 3, // 3 minors = 4 ticks per video
	progress = 0, // 0-100
	currentVideoIndex = 0,
}) => {
	const totalTicks = majorCount * (minorPerMajor + 1); // e.g. 5*4=20
	const ticks = [];
	let tickIdx = 0;
	for (let major = 0; major < majorCount; major++) {
		ticks.push({
			type: 'major',
			label: String(major + 1).padStart(2, '0'),
			idx: tickIdx++,
		});
		for (let m = 0; m < minorPerMajor; m++) {
			ticks.push({
				type: 'minor',
				idx: tickIdx++,
			});
		}
	}

	const ticksPerVideo = minorPerMajor + 1;
	const activeTick =
		(currentVideoIndex * ticksPerVideo +
			Math.round((progress / 100) * (ticksPerVideo - 1))) % totalTicks;

	const WIDTH = 700;
	const HEIGHT = 28;
	const LABEL_HEIGHT = 18;
	const CENTER_X = WIDTH / 2;
	const TICK_SPACING = WIDTH / (totalTicks - 1);
	const VISIBLE_TICKS = 17;
	const HALF_VISIBLE = Math.floor(VISIBLE_TICKS / 2);

	const getCylinderParams = (relIdx) => {
		const norm = relIdx / HALF_VISIBLE;
		const scale = 0.5 + 0.5 * Math.cos(norm * Math.PI / 2);
		const opacity = 0.25 + 0.75 * Math.cos(norm * Math.PI / 2);
		const y = HEIGHT / 2;
		return { scale, opacity, y };
	};

	return (
		<div className="w-full flex flex-col items-center pointer-events-none select-none">
			<svg
				width={WIDTH}
				height={HEIGHT + LABEL_HEIGHT}
				viewBox={`0 0 ${WIDTH} ${HEIGHT + LABEL_HEIGHT}`}
				className="transition-transform duration-300"
				style={{
					filter: 'drop-shadow(0 2px 8px #0008)',
					marginTop: '6px',
				}}
			>
				{Array.from({ length: VISIBLE_TICKS }).map((_, visIdx) => {
					const relIdx = visIdx - HALF_VISIBLE;
					let tickIdx = (activeTick + relIdx + totalTicks) % totalTicks;
					const tick = ticks[tickIdx];
					const x = CENTER_X + relIdx * TICK_SPACING;
					const { scale, opacity, y } = getCylinderParams(relIdx);
					const h = (tick.type === 'major' ? 18 : 8) * scale;
					const y1 = y + h / 2;
					const y2 = y - h / 2;
					const isActive = relIdx === 0;
					return (
						<g key={visIdx}>
							{tick.type === 'major' && (
								<text
									x={x}
									y={y2 + 6}
									textAnchor="middle"
									fontSize={9 * scale}
									fontFamily="monospace"
									fill={isActive ? '#fff' : '#888'}
									opacity={isActive ? 1 : opacity}
									style={{
										transition: 'fill 0.2s, opacity 0.2s, font-size 0.2s',
										letterSpacing: '0.05em',
										userSelect: 'none',
										fontWeight: isActive ? 700 : 400,
									}}
								>
									{tick.label}
								</text>
							)}
							<line
								x1={x}
								y1={y1 + 8}
								x2={x}
								y2={y2 + 8}
								stroke={isActive ? '#fff' : '#444'}
								strokeWidth={tick.type === 'major' ? 3 : 2}
								opacity={isActive ? 1 : opacity}
								style={{
									transition: 'stroke 0.2s, opacity 0.2s',
									filter: isActive
										? 'drop-shadow(0 0 4px #fff8)'
										: undefined,
								}}
							/>
						</g>
					);
				})}
			</svg>
		</div>
	);
};

// Simplified MenuButton component
const MenuButton = ({ onClick, isOpen }) => {
  const handleClick = () => {
    onClick();
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`menu-toggle w-12 h-12 fixed top-6 right-6 z-50 flex flex-col justify-center items-center transition-all duration-300 ${
        isOpen ? 'open' : ''
      }`}
      style={{ 
        top: '24px',
        right: isOpen ? '39px' : '24px', // X button at 34px, hamburger at 44px
        transition: 'right 0.3s ease, transform 0.3s ease'
      }}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <span className={`block w-8 h-1 bg-white mb-2 transition-all ${isOpen ? 'rotate-45 translate-y-3.5 -translate-x-1' : ''}`}></span>
      <span className={`block w-8 h-1 bg-white mb-2 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
      <span className={`block w-8 h-1 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2.5 -translate-x-1' : ''}`}></span>
    </button>
  );
};

const ArtistPortfolioMenu = ({ open, onClose, activeVideoRef }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // Move useMemo to the top, before any return
  const previewVideos = useMemo(() => [
    "/assets/videos/v1.mp4",
    "/assets/videos/v2.mp4",
    "/assets/videos/v3.mp4"
  ], []);

  /**
   * Custom hook to handle frame animation on canvas
   */
  const useCanvasAnimation = () => {
    useEffect(() => {
      if (!open || !activeVideoRef?.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const video = activeVideoRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const drawFrame = () => {
        if (video.videoWidth === 0 || video.videoHeight === 0) return;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        animationFrameId.current = requestAnimationFrame(drawFrame);
      };

      drawFrame();

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }, [open, activeVideoRef]);
  };

  /**
   * Custom hook to handle escape key press
   */
  const useEscapeKey = (callback) => {
    useEffect(() => {
      const handleEsc = (e) => {
        if (e.key === 'Escape') callback();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, [callback]);
  };

  // Initialize hooks
  useCanvasAnimation();
  useEscapeKey(onClose);

  useEffect(() => {
    if (!open || !activeVideoRef?.current) return;

    const canvas = canvasRef.current;
    const video = activeVideoRef.current;
    const ctx = canvas.getContext('2d');

    const drawFrame = () => {
      if (video.videoWidth === 0 || video.videoHeight === 0) return;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      animationFrameId.current = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [open, activeVideoRef]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'blur(12px)' }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <nav className="space-y-1 text-center">
          <ul>
            {['About Us', 'Services', 'Contacts'].map((text, index) => (
              <li 
                key={text}
                className="relative group"
                style={{ overflow: 'visible', minHeight: '6.5em' }}
              >
                <button 
                  style={{ 
                    fontSize: '6.5em', 
                    fontWeight: 'bold', 
                    padding: '0.1em 0', 
                    display: 'block',
                    transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                  className="relative group-hover:translate-x-[180px]"
                  onClick={() => text === 'About Us' ? navigate('/aboutuspage') : null}
                >
                  {text}
                </button>
                {/* Video preview appears to the left of the text */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[020px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none"
                  style={{
                    height: '6.5em',
                    width: `calc(6.5em * 16 / 9)`,
                    borderRadius: '8px',
                    boxShadow: '0 0 16px rgba(0,0,0,0.35)',
                    background: '#000',
                    overflow: 'hidden',
                    display: 'block',
                  }}
                >
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  >
                    <source src={previewVideos[index % previewVideos.length]} type="video/mp4" />
                  </video>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

// --- VideoShowcase component ---
const SCROLLS_PER_VIDEO = 4;

const VideoShowcase = (props) => {
	const { initialVideos = videos } = props;
	const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [isPaused, setIsPaused] = useState(false);
	const [showMouseRect, setShowMouseRect] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	// const [menuStage, setMenuStage] = useState(0); // 0: anim, 1: company, 2: bio, 3: contact

	// Track scroll step for current video (0-3)
	const [scrollStep, setScrollStep] = useState(0);

	// Dual video refs and state for crossfade
	const [activeVideo, setActiveVideo] = useState(0); // 0 or 1
	const videoRefs = [useRef(null), useRef(null)];
	const [videoSources, setVideoSources] = useState([
		initialVideos[1].videoSrc,
		initialVideos[1].videoSrc,
	]);
	const [videoReady, setVideoReady] = useState([true, false]);

	const scrollLock = useRef(false);

	// Handle scroll: each scroll is a quarter, at end switch to next video
	const handleWheel = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (menuOpen || scrollLock.current) return;
		scrollLock.current = true;

		const direction = e.deltaY > 0 ? 1 : -1;
		let newStep = scrollStep + direction;

		if (newStep >= SCROLLS_PER_VIDEO) {
			// Next video, step 0
			const nextIndex = (currentVideoIndex + 1) % initialVideos.length;
			setCurrentVideoIndex(nextIndex);
			setScrollStep(0);
			setIsPaused(false);
		} else if (newStep < 0) {
			// Previous video, step 3
			const prevIndex = (currentVideoIndex - 1 + initialVideos.length) % initialVideos.length;
			setCurrentVideoIndex(prevIndex);
			setScrollStep(SCROLLS_PER_VIDEO - 1);
			setIsPaused(false);
		} else {
			setScrollStep(newStep);
			// Seek within current video
			const video = videoRefs[activeVideo].current;
			if (video && video.duration) {
				const percent = (newStep / SCROLLS_PER_VIDEO) * 100;
				video.currentTime = (percent / 100) * video.duration;
			}
		}

		setTimeout(() => {
			scrollLock.current = false;
		}, 120);
	};

	// When switching videos, always start at scrollStep (0 or 3)
	useEffect(() => {
		const video = videoRefs[activeVideo].current;
		if (video && video.duration) {
			const percent = (scrollStep / SCROLLS_PER_VIDEO) * 100;
			video.currentTime = (percent / 100) * video.duration;
		}
		// eslint-disable-next-line
	}, [currentVideoIndex, activeVideo, scrollStep]);

	// Crossfade logic
	useEffect(() => {
		const nextVideo = (activeVideo + 1) % 2;
		setVideoSources((sources) => {
			const newSources = [...sources];
			newSources[nextVideo] = initialVideos[currentVideoIndex].videoSrc;
			return newSources;
		});
		setVideoReady((ready) => {
			const newReady = [...ready];
			newReady[nextVideo] = false;
			return newReady;
		});
	}, [currentVideoIndex, initialVideos]);

	const handleCanPlay = (idx) => {
		setVideoReady((ready) => {
			const newReady = [...ready];
			newReady[idx] = true;
			return newReady;
		});
		const inactive = (idx + 1) % 2;
		if (videoRefs[inactive].current) {
			videoRefs[inactive].current.pause();
		}
		if (!isPaused && videoRefs[idx].current) {
			videoRefs[idx].current.play().catch(() => {});
		}
		setActiveVideo(idx);
	};

	useEffect(() => {
		videoRefs.forEach((ref) => {
			if (ref.current) {
				if (isPaused) {
					ref.current.pause();
				} else {
					ref.current.play().catch(() => {});
				}
			}
		});
	}, [isPaused]);

	const currentVideo = initialVideos[currentVideoIndex];
	const titleText = `${currentVideo.artist} | ${currentVideo.title}`;
	const videoRefForLuminance = videoRefs[activeVideo];
	const luminances = useLetterLuminance(videoRefForLuminance, titleText);

	// Progress for current video (0, 25, 50, 75, 100)
	const currentProgress = (scrollStep / SCROLLS_PER_VIDEO) * 100;

	// Helper to determine if mouse is over the video area
		const handleMouseMove = (e) => {
		// Get bounding rects for overlays
		const logo = document.getElementById('logo-link');
		const menu = document.getElementById('menu-btn');
		const footer = document.getElementById('footer');
		const thumbs = document.getElementById('thumbnails');
		const clock = document.getElementById('lisbon-clock');
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		const isOver = (el) => {
			if (!el) return false;
			const rect = el.getBoundingClientRect();
			return (
				mouseX >= rect.left &&
				mouseX <= rect.right &&
				mouseY >= rect.top &&
				mouseY <= rect.bottom
			);
		};

		// If mouse is over any overlay or menu button, hide the play/pause rect
		if (
			isOver(logo) ||
			isOver(menu) ||
			isOver(footer) ||
			isOver(thumbs) ||
			isOver(clock) ||
			isOver(document.querySelector('.menu-toggle')) // Check menu button hover
		) {
			setShowMouseRect(false);
		} else {
			setShowMouseRect(true);
		}
	};

	// Prevent double scrollbars on menu
	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	const handleThumbnailClick = (index) => {
		if (index === currentVideoIndex) {
			// If already on this video, just seek to start
			setScrollStep(0);
			setIsPaused(false);
			const video = videoRefs[activeVideo].current;
			if (video && video.duration) {
				video.currentTime = 0;
			}
		} else {
			setCurrentVideoIndex(index);
			setScrollStep(0);
			setIsPaused(false);
		}
	};

	return (
		<>
			<LandingIntroLoader text="DSFILMS" />
			<div
				className="relative h-screen w-full text-gray-100 overflow-hidden font-sans bg-black"
				onWheel={handleWheel}
				onMouseMove={handleMouseMove}
				onMouseLeave={() => setShowMouseRect(false)}
			>
				{/* Video background always rendered, even when menu is open */}
				<div 
	        className="absolute inset-0 w-full h-full z-0 bg-black" 
	        onClick={() => setIsPaused(!isPaused)}
	        style={{ cursor: 'pointer' }}
	      >
					{[0, 1].map((idx) => (
						<video
							key={videoSources[idx]}
							ref={videoRefs[idx]}
							muted
							autoPlay={!isPaused}
							loop
							playsInline
							onCanPlay={() => handleCanPlay(idx)}
							style={{
								opacity: activeVideo === idx && videoReady[idx] ? 1 : 0,
								transition: 'opacity 0.3s',
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								background: 'black',
								pointerEvents: 'none',
							}}
						>
							<source src={videoSources[idx]} type="video/mp4" />
						</video>
					))}
				</div>
				{/* Menu Overlay */}
				<ArtistPortfolioMenu 
	        open={menuOpen} 
	        onClose={() => setMenuOpen(false)}
	        activeVideoRef={videoRefs[activeVideo]}
	      />
				{/* Animated Menu button in the top right */}
				<MenuButton
					isOpen={menuOpen}
					onClick={() => {
						if (menuOpen) {
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}
						setMenuOpen(!menuOpen);
					}}
				/>
				{/* Play/Pause rectangle that follows the mouse */}
				<PlayPauseMouseRect isPaused={isPaused} visible={showMouseRect && !menuOpen} />

				{/* Lisbon Clock at the top center */}
				<LisbonClock id="lisbon-clock" />

				{/* Logo in the top left corner */}
				<a
					id="logo-link"
					href="/"
					className="absolute top-6 left-6 z-40"
					style={{ display: 'block', width: 96, height: 96 }}
				>
					<img
						src="/assets/logo/png-white.png"
						alt="Logo"
						style={{
							width: 100,
							height: 100,
							objectFit: 'contain',
							display: 'block',
						}}
					/>
				</a>

				{/* Only show the video UI and visualizer when menuOpen is false */}
				{!menuOpen && (
					<>
						{/* Centered Title - only shown when paused */}
						{isPaused && (
							<div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
								<div className="text-center title-text mix-blend-difference" style={{ display: 'inline-block' }}>
									<h1 className="text-[min(7vw,120px)] font-medium uppercase leading-none tracking-wide" style={{ display: 'flex', justifyContent: 'center', gap: 0 }}>
										{titleText.split('').map((char, i) => (
											<span
												key={i}
												style={{
													color:
														luminances[i] === undefined
															? '#f0f2f1'
															: luminances[i] < 128
															? '#f0f2f1'
															: '#232323',
													transition: 'color 0.2s'
												}}
											>
												{char}
											</span>
										))}
									</h1>
								</div>
							</div>
						)}

						{/* Bottom Thumbnail Gallery */}
						<div
							id="thumbnails"
							className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 w-full max-w-[95vw]"
						>
							<div className="flex justify-center items-end gap-4">
								{initialVideos.map((video, index) => (
									<Thumbnail
										key={video.id}
										video={video}
										index={index}
										isActive={index === currentVideoIndex}
										isPlayed={index < currentVideoIndex}
										progress={
											index < currentVideoIndex
												? 100
												: index > currentVideoIndex
												? 0
												: currentProgress
										}
										isHovered={hoveredIndex === index}
										hoveredIndex={hoveredIndex}
										onMouseEnter={() => setHoveredIndex(index)}
										onMouseLeave={() => setHoveredIndex(null)}
										onClick={() => handleThumbnailClick(index)}
									/>
								))}
							</div>
						</div>

						{/* TimelineVisualizer - tire tread/clock style, progress-matched */}
						<div className="absolute left-0 right-0 bottom-2 z-30 flex justify-center">
							<TimelineVisualizer
								majorCount={videos.length}
								minorPerMajor={SCROLLS_PER_VIDEO - 1}
								progress={currentProgress}
								currentVideoIndex={currentVideoIndex}
							/>
						</div>
					</>
				)}

				{/* Footer */}
				<footer
					id="footer"
					className="absolute bottom-4 left-0 w-full px-6 z-20 flex justify-between items-center text-xs uppercase font-semibold"
				>
					<div className="flex space-x-6">
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline transition-all duration-300"
						>
							Instagram
						</a>
						<a
							href="https://example.com/cinematography"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline transition-all duration-300"
						>
							Cinematography
						</a>
					</div>
					<div>
						<p>Portugal Based Director</p>
					</div>
				</footer>

				<style>{`
	        #menu li {
	          --text-height: 1.2em;
	        }

	        .font-sans {
	          font-family: "Goldman", "DM Sans", "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
	        }

	        .title-text {
	          color: #f0f2f1;
	          font-family: "Goldman", "DM Sans", "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
	          font-weight: 400;
	          letter-spacing: 0.01em;
	        }
	        
	        .thumbnail-container {
	          width: 24vw;
	          max-width: 350px;
	          min-width: 250px;
	          transition: transform 0.5s ease-out;
	        }
	        
	        /* Position adjustments for non-hovered thumbnails */
	        .thumbnail-container.move-left {
	          transform: translateX(-12px);
	        }
	        
	        .thumbnail-container.move-right {
	          transform: translateX(12px);
	        }
	        
	        .thumbnail {
	          position: relative;
	          transform-origin: center bottom;
	          transition: all 0.4s ease-out;
	        }
	        
	        .thumbnail.active {
	          transform: scale(1.02);
	        }
	        
	        .corner-frames {
	          position: absolute;
	          inset: -12px; /* Move corners further from the image */
	          z-index: 15;
	          opacity: 0;
	          transition: opacity 0.4s ease-out;
	          pointer-events: none;
	        }
	        
	        .thumbnail.hovered .corner-frames {
	          opacity: 1;
	        }
	        
	        .center-crosshair {
	          position: absolute;
	          top: 50%;
	          left: 50%;
	          z-index: 16;
	          transform: translate(-50%, -50%);
	          pointer-events: none;
	          opacity: 0.7;
	        }
	        
	        .corner {
	          position: absolute;
	          width: 22px;
	          height: 22px;
	          transition: transform 0.4s ease-out;
	          transform: scale(0);
	        }
	        
	        .thumbnail.hovered .corner {
	          transform: scale(1);
	        }
	        
	        .corner-tl { top: 0; left: 0; transform-origin: top left; }
	        .corner-tr { top: 0; right: 0; transform-origin: top right; }
	        .corner-bl { bottom: 0; left: 0; transform-origin: bottom left; }
	        .corner-br { bottom: 0; right: 0; transform-origin: bottom right; }
	      `}</style>
			</div>
		</>
	);
};

// Add this component for the play/pause rectangle following the mouse
const PlayPauseMouseRect = ({ isPaused, visible }) => {
	const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
	const [internalVisible, setInternalVisible] = useState(false);
	const videoContainerRef = useRef(null);

	useEffect(() => {
		const handleMove = (e) => {
			setPos({ x: e.clientX, y: e.clientY });
			
			// Check if mouse is over video area (not over UI elements)
			const videoContainer = document.querySelector('.absolute.inset-0.w-full.h-full.z-0.bg-black');
			if (!videoContainer) {
				setInternalVisible(false);
				return;
			}
			
			const rect = videoContainer.getBoundingClientRect();
			const isOverVideo = 
				e.clientX >= rect.left && 
				e.clientX <= rect.right &&
				e.clientY >= rect.top && 
				e.clientY <= rect.bottom;
			
			setInternalVisible(isOverVideo);
		};

		const handleLeave = () => setInternalVisible(false);

		window.addEventListener('mousemove', handleMove);
		window.addEventListener('mouseleave', handleLeave);
		return () => {
			window.removeEventListener('mousemove', handleMove);
			window.removeEventListener('mouseleave', handleLeave);
		};
	}, []);

	return (
		<div
			style={{
				position: 'fixed',
				left: pos.x,
				top: pos.y,
				transform: 'translate(-50%, -50%)',
				pointerEvents: 'none',
				zIndex: 50,
				opacity: visible && internalVisible ? 0.85 : 0,
				transition: 'opacity 0.18s',
			}}
		>
			<svg width={38} height={38} viewBox="0 0 38 38">
				<rect
					x={2}
					y={2}
					width={34}
					height={34}
					rx={7}
					fill="none"
					stroke="#fff"
					strokeWidth={1.5}
				/>
				{isPaused ? (
					// Play icon (triangle, only lines)
					<polygon
						points="15,11 28,19 15,27"
						fill="none"
						stroke="#fff"
						strokeWidth={2}
						style={{ filter: 'drop-shadow(0 0 2px #000a)' }}
					/>
				) : (
					// Pause icon (two bars, only lines)
					<g>
						<rect x="15" y="12" width="3.5" height="14" rx="1.2" fill="none" stroke="#fff" strokeWidth={2} />
						<rect x="21" y="12" width="3.5" height="14" rx="1.2" fill="none" stroke="#fff" strokeWidth={2} />
					</g>
				)}
			</svg>
		</div>
	);
};

// Add LisbonClock component at the end of the file
const LisbonClock = ({ id }) => {
	const [time, setTime] = useState(() => {
		const now = new Date();
		return now.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZone: 'Europe/Lisbon',
		});
	});

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			setTime(
				now.toLocaleTimeString('en-GB', {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					timeZone: 'Europe/Lisbon',
				})
			);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			id={id}
			className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none select-none"
			style={{ minWidth: 120 }}
		>
			<svg width={160} height={44} viewBox="0 0 160 44" style={{ display: 'block' }}>
				<text
					x="80"
					y="23"
					textAnchor="middle"
					dominantBaseline="middle"
					fontFamily="monospace"
					fontSize="20"
					fill="#fff"
					style={{ fontWeight: 600, letterSpacing: '0.15em', userSelect: 'none' }}
				>
					{time}
				</text>
				<text
					x="80"
					y="38"
					textAnchor="middle"
					dominantBaseline="middle"
					fontFamily="monospace"
					fontSize="11"
					fill="#fff"
					style={{ fontWeight: 400, letterSpacing: '0.12em', opacity: 0.7, textTransform: 'uppercase' }}
				>
					UTC+0 · Lisbon
				</text>
			</svg>
		</div>
	);
};

function CodeByCSSPicker() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Code by CSSPicker</h1>
        <p className="text-lg text-gray-700">Welcome to your landing page!</p>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-blue-600 hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-blue-600 hover:underline">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-blue-600 hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default VideoShowcase;
