import React, { useState, useEffect, useCallback, memo, useRef } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500 to-gray-300 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-gray-200 to-white text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-gray-300" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-white to-gray-400 blur-2xl opacity-10"></span>
        <span className="relative bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Frontend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-gray-400 to-gray-600 blur-2xl opacity-10"></span>
        <span className="relative bg-gradient-to-r from-gray-300 to-gray-600 bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl opacity-30 blur-md group-hover:opacity-60 transition-all duration-700"></div>
      <div className="relative h-11 bg-black/50 backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-gray-500/20 to-white/10"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-white rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Informatics Student", "Tech Enthusiast"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/hissyam90" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/antung-hissyam-225306381/" },
  { icon: Instagram, link: "https://www.instagram.com/a_hssym" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef(null); // Ref untuk container kartu

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
    setIsLoaded(true);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // LOGIK UNTUK FITUR BUSINESS CARD INTERAKTIF (TILT EFFECT)
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Hitung sudut kemiringan (maksimal 10 derajat)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.1s ease";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transition = "transform 0.5s ease";
    // Kembalikan ke posisi semula
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    // Menghapus grayscale agar Lottie tetap berwarna
    className: `w-full h-full transition-all duration-500 ${isHovering ? "scale-110 rotate-2" : "scale-100"}` 
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] flex items-center justify-center" id="Home">
      <div className={`relative z-10 transition-all duration-1000 w-full max-w-6xl ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        
        {/* Business Card Container - TAMBAHKAN REF DAN EVENT HANDLERS UNTUK TILT */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/50 overflow-hidden group transition-transform duration-100" // Tambahkan transisi dasar
        >
          {/* subtle noise/glow effect inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left z-10" data-aos="fade-right">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-gray-400 to-white ml-1 animate-blink"></span>
                </div>

                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light" data-aos="fade-up" data-aos-delay="1000">
                  Menciptakan Website Yang Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
                </p>

                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                <div className="flex flex-row gap-3 w-full justify-start pt-4" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                <div className="hidden sm:flex gap-4 justify-start pt-2" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] relative flex items-center justify-center z-10"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600">
              
              <div className="relative w-full h-full flex justify-center items-center">
                <div className={`absolute inset-0 bg-gradient-to-r from-gray-500/10 to-white/5 rounded-full blur-3xl transition-all duration-700 ${isHovering ? "opacity-40 scale-110" : "opacity-20 scale-100"}`}></div>
                <div className="w-[80%] h-[80%] relative z-10 drop-shadow-2xl">
                  <DotLottieReact {...lottieOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default memo(Home);