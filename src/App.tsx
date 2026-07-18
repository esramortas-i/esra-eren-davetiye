import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Calendar,
  MapPin,
  Music,
  Users,
  Clock,
  Sparkles,
  CalendarPlus,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";
import { WeddingSettings, RSVPResponse, MusicRequest } from "./types";
import { DEFAULT_SETTINGS, formatTurkishDate, generateGoogleCalendarUrl, generateKinaCalendarUrl, generateNikahCalendarUrl } from "./utils";
import { WEDDING_THEMES } from "./themes";
import PhotoGallery from "./components/PhotoGallery";
import LeafIntro from "./components/LeafIntro";

export default function App() {
  // Opening leaf curtain animation
  const [introDone, setIntroDone] = useState(false);

  // Ref to the Nikah Töreni section, used for the automatic scroll nudge
  const nikahSectionRef = useRef<HTMLElement>(null);

  // Settings loaded from localStorage or default
  const [settings, setSettings] = useState<WeddingSettings>(DEFAULT_SETTINGS);
  const [rsvps, setRsvps] = useState<RSVPResponse[]>([]);
  const [musicRequests, setMusicRequests] = useState<MusicRequest[]>([]);

  // Invitation Form States
  const [guestName, setGuestName] = useState("");
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [dietPreference, setDietPreference] = useState<any>("standard");
  const [notes, setNotes] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Music Form States
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [musicSubmitted, setMusicSubmitted] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  // Load Settings and dynamic lists from localStorage
  useEffect(() => {
    // Settings
    const savedSettings = localStorage.getItem("wedding_invitation_settings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error(e);
      }
    }

    // RSVPs
    const savedRSVPs = localStorage.getItem("wedding_invitation_rsvps");
    if (savedRSVPs) {
      try {
        setRsvps(JSON.parse(savedRSVPs));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem("wedding_invitation_rsvps", JSON.stringify([]));
    }

    // Music
    const savedMusic = localStorage.getItem("wedding_invitation_music");
    if (savedMusic) {
      try {
        setMusicRequests(JSON.parse(savedMusic));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem("wedding_invitation_music", JSON.stringify([]));
    }

  }, []);

  // Countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(settings.weddingDate) - +new Date();
      let timeLeftData = { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isOver: false,
        };
      }
      setTimeLeft(timeLeftData);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [settings.weddingDate]);

  // Lock page scroll while the leaf opening animation plays
  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  // If the guest doesn't scroll on their own, gently auto-scroll to the next card after a pause
  useEffect(() => {
    if (!introDone) return;

    let userScrolled = false;
    const handleScroll = () => {
      userScrolled = true;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const timer = setTimeout(() => {
      if (!userScrolled && nikahSectionRef.current) {
        nikahSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 4500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [introDone]);

  // Update RSVPs handler
  const handleUpdateRSVPs = (newRSVPs: RSVPResponse[]) => {
    setRsvps(newRSVPs);
    localStorage.setItem("wedding_invitation_rsvps", JSON.stringify(newRSVPs));
  };

  // Update Music Requests handler
  const handleUpdateMusic = (newMusic: MusicRequest[]) => {
    setMusicRequests(newMusic);
    localStorage.setItem("wedding_invitation_music", JSON.stringify(newMusic));
  };

  // Submit RSVP Form
  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setFormError("Lütfen isminizi girin.");
      return;
    }
    if (isAttending === null) {
      setFormError("Lütfen katılım durumunuzu seçin.");
      return;
    }

    const newRSVP: RSVPResponse = {
      id: `r-${Date.now()}`,
      name: guestName.trim(),
      isAttending,
      guestCount: isAttending ? guestCount : 0,
      dietPreference: isAttending ? dietPreference : "none",
      notes: notes.trim() || undefined,
      timestamp: new Date().toISOString(),
    };

    const updated = [newRSVP, ...rsvps];
    handleUpdateRSVPs(updated);

    // Reset Form
    setGuestName("");
    setIsAttending(null);
    setGuestCount(1);
    setDietPreference("standard");
    setNotes("");
    setFormError("");
    setFormSubmitted(true);

    // Fade out success notification after 5s
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // Submit Music Request Form
  const handleMusicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songName.trim() || !artist.trim() || !requestedBy.trim()) return;

    const newRequest: MusicRequest = {
      id: `m-${Date.now()}`,
      songName: songName.trim(),
      artist: artist.trim(),
      requestedBy: requestedBy.trim(),
      timestamp: new Date().toISOString(),
    };

    const updated = [newRequest, ...musicRequests];
    handleUpdateMusic(updated);

    setSongName("");
    setArtist("");
    setRequestedBy("");
    setMusicSubmitted(true);

    setTimeout(() => setMusicSubmitted(false), 5000);
  };

  // Current Theme setup
  const theme = WEDDING_THEMES[settings.theme] || WEDDING_THEMES.rose;

  const getBorderColor = () => {
    switch (settings.theme) {
      case "rose": return "border-[#FFF0F2]";
      case "sage": return "border-[#EEF5EE]";
      case "gold": return "border-[#F2EDE4]";
      case "lavender": return "border-[#F3E8FF]";
      default: return "border-[#F1F3F5]";
    }
  };

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textColor} font-sans transition-all duration-700 pb-16 relative overflow-x-hidden border-t-[12px] md:border-[16px] ${getBorderColor()}`}>

      {/* Leaf curtain opening animation */}
      {!introDone && <LeafIntro onComplete={() => setIntroDone(true)} />}

      {/* Decorative background ambient glows */}
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr ${theme.accentGlow} blur-3xl opacity-40 -translate-y-1/2 -translate-x-1/2 pointer-events-none`}></div>
      <div className={`absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr ${theme.accentGlow} blur-3xl opacity-30 pointer-events-none`}></div>

      {/* Subtle paper texture overlay for a warmer, tactile feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      ></div>

      {/* Faint white floral lace motif overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.65]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.9' stroke='%23FFFFFF' stroke-opacity='0.55' stroke-width='1'%3E%3Cg transform='translate(65,65)'%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20'/%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20' transform='rotate(72)'/%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20' transform='rotate(144)'/%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20' transform='rotate(216)'/%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20' transform='rotate(288)'/%3E%3Ccircle cx='0' cy='0' r='5' stroke='none'/%3E%3C/g%3E%3Cpath d='M35 95 C 25 88 22 76 30 68 C 38 76 38 88 35 95 Z'/%3E%3Cpath d='M95 35 C 88 25 76 22 68 30 C 76 38 88 38 95 35 Z'/%3E%3Cpath d='M75 75 C 120 110 150 140 185 185' fill='none' stroke-width='1' stroke-opacity='0.45'/%3E%3Cg transform='translate(195,195) scale(0.75)'%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20'/%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20' transform='rotate(72)'/%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20' transform='rotate(144)'/%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20' transform='rotate(216)'/%3E%3Cellipse cx='0' cy='-13' rx='12' ry='20' transform='rotate(288)'/%3E%3Ccircle cx='0' cy='0' r='5' stroke='none'/%3E%3C/g%3E%3Cpath d='M165 225 C 155 218 152 206 160 198 C 168 206 168 218 165 225 Z'/%3E%3Cpath d='M225 165 C 218 155 206 152 198 160 C 206 168 218 168 225 165 Z'/%3E%3Cg transform='translate(230,35)'%3E%3Ccircle cx='0' cy='-8' r='3'/%3E%3Ccircle cx='7' cy='-4' r='3'/%3E%3Ccircle cx='7' cy='4' r='3'/%3E%3Ccircle cx='0' cy='8' r='3'/%3E%3Ccircle cx='-7' cy='4' r='3'/%3E%3Ccircle cx='-7' cy='-4' r='3'/%3E%3Ccircle cx='0' cy='0' r='2.5'/%3E%3C/g%3E%3Cg transform='translate(30,230)'%3E%3Ccircle cx='0' cy='-6' r='2.5'/%3E%3Ccircle cx='5' cy='-3' r='2.5'/%3E%3Ccircle cx='5' cy='3' r='2.5'/%3E%3Ccircle cx='0' cy='6' r='2.5'/%3E%3Ccircle cx='-5' cy='3' r='2.5'/%3E%3Ccircle cx='-5' cy='-3' r='2.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "260px 260px",
        }}
      ></div>

      {/* Hero section */}
      <main className="max-w-4xl mx-auto px-4 relative z-10 mt-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`${theme.cardBgClass} rounded-[40px] px-6 py-16 md:p-16 text-center relative overflow-hidden`}
        >
          {/* Subtle floral pattern or border accent */}
          <div className="absolute top-6 left-6 right-6 bottom-6 border border-stone-200/40 rounded-[30px] pointer-events-none"></div>

          {/* Parents info at the very top */}
          <div className="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-center relative z-10">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-400 mb-1">
                Gelinin Ailesi
              </span>
              <span className="text-sm md:text-base font-serif font-medium text-stone-700 tracking-wide">
                {settings.brideParents || "Yılmaz Ailesi"}
              </span>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-stone-200"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-400 mb-1">
                Damadın Ailesi
              </span>
              <span className="text-sm md:text-base font-serif font-medium text-stone-700 tracking-wide">
                {settings.groomParents || "Demir Ailesi"}
              </span>
            </div>
          </div>

          <div className="h-[1px] w-12 bg-[#D4AF37] mx-auto mb-6"></div>

          <span className="font-script text-5xl md:text-7xl text-stone-500 block mb-4">
            Evleniyoruz
          </span>

          {/* Couples' names - Styled in a gorgeous centered, stacked layout to ensure perfect symmetry on all devices */}
          <div className="flex flex-col items-center justify-center my-6 gap-2">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-stone-800 leading-tight">
              {settings.brideName}
            </h1>
            <div className="text-[#D4AF37] font-script text-5xl sm:text-6xl md:text-[68px] my-1 select-none">
              &amp;
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-stone-800 leading-tight">
              {settings.groomName}
            </h1>
          </div>

          <div className="w-16 h-px bg-stone-300 mx-auto my-6"></div>

          <p className="font-serif text-base sm:text-lg text-stone-600 italic tracking-wide max-w-lg mx-auto leading-relaxed mb-10">
            &ldquo;Hayatımızın en anlamlı gününde, sevgimizi ve mutluluğumuzu sizlerle paylaşmaktan onur duyarız.&rdquo;
          </p>

          {/* Elegant Countdown Clock */}
          <div className="bg-stone-50/50 backdrop-blur-sm border border-stone-200/50 rounded-2xl p-6 max-w-md mx-auto shadow-sm">
            {timeLeft.isOver ? (
              <span className="font-serif text-lg text-stone-600 flex items-center justify-center gap-2 font-medium">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Hayatımızın İlk Günü! Teşekkür Ederiz ❤️
              </span>
            ) : (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-3">
                  Büyük Güne Kalan Süre
                </span>
                <div className="grid grid-cols-4 gap-2 text-stone-800">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-stone-100">
                    <span className="text-2xl font-bold font-serif block">{timeLeft.days}</span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono">Gün</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-stone-100">
                    <span className="text-2xl font-bold font-serif block">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono">Saat</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-stone-100">
                    <span className="text-2xl font-bold font-serif block">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono">Dk</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-stone-100">
                    <span className="text-2xl font-bold font-serif block text-rose-500">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono">Sn</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <ChevronDown className="w-5 h-5 text-stone-400 animate-bounce" />
          </div>
        </motion.div>
      </main>

      {/* Date & Location Section */}
      <section ref={nikahSectionRef} className="max-w-4xl mx-auto px-4 md:px-8 mt-16 relative z-10">
        {/* Nikah Töreni Card */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur p-8 md:p-12 rounded-[32px] border border-stone-100 shadow-md flex flex-col justify-between items-center text-center group hover:shadow-lg transition-all"
        >
          <div className="flex flex-col items-center w-full">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-colors ${theme.secondaryColor}`}>
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-serif text-3xl font-semibold text-stone-800 mb-6">
              Nikah Töreni
            </h3>

            <div className="w-full border-t border-stone-100/80 my-2 pt-6 space-y-4">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-1.5">Tarih & Saat</span>
                <span className="text-base font-medium text-stone-700 font-serif">
                  {formatTurkishDate(settings.nikahDate || "2026-09-13T14:30")}
                </span>
              </div>
              
              <div className="flex flex-col items-center pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-1.5">Mekan & Adres</span>
                <span className="text-base font-semibold text-stone-800 font-serif">
                  {settings.nikahVenueName || "Beşiktaş Evlendirme Dairesi"}
                </span>
                <p className="text-xs text-stone-500 mt-1.5 max-w-sm leading-relaxed whitespace-pre-line">
                  {settings.nikahVenueAddress || "Türkali Mahallesi, Beşiktaş, İstanbul"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center w-full">
            <a
              href={generateNikahCalendarUrl(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs font-semibold shadow-sm transition-all ${theme.primaryColor}`}
            >
              <CalendarPlus className="w-3.5 h-3.5" /> Takvime Ekle
            </a>
            <a
              href={settings.nikahVenueMapUrl || "https://maps.google.com/?q=Besiktas+Evlendirme+Dairesi+Istanbul"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/40 rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <MapPin className="w-3.5 h-3.5" /> Yol Tarifi
            </a>
          </div>
        </motion.div>
      </section>

      {/* Love Story Section */}
      <section className="max-w-4xl mx-auto px-4 mt-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="bg-white/40 backdrop-blur-sm border border-stone-200/30 rounded-3xl p-8 md:p-12"
        >
          <span className="font-script text-3xl text-stone-500 block mb-1">Bizim Öykümüz</span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-800 tracking-tight">
            {settings.loveStoryTitle}
          </h2>
          <div className="w-12 h-0.5 bg-stone-300 mx-auto my-4"></div>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto italic font-serif whitespace-pre-line">
            {settings.loveStoryText}
          </p>

          {/* Handwritten-style signature */}
          <div className="mt-8 flex items-center justify-center gap-3 text-[#D4AF37]">
            <span className="w-8 h-px bg-[#D4AF37]/40"></span>
            <span className="font-script text-3xl sm:text-4xl">
              {settings.brideName} &amp; {settings.groomName}
            </span>
            <span className="w-8 h-px bg-[#D4AF37]/40"></span>
          </div>
        </motion.div>
      </section>

      {/* Photographic Google Drive Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mt-20"
      >
        <PhotoGallery
          settings={settings}
          theme={theme}
        />
      </motion.div>


      {/* Soft Elegant Footer */}
      <footer className="text-center mt-24 relative z-10 px-4">
        <div className="flex items-center justify-center gap-1.5 text-stone-400 mb-2">
          <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
          <span className="font-serif text-xs tracking-wider">
            {settings.brideName} &amp; {settings.groomName}
          </span>
        </div>
        <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">
          5 Eylül 2026 • Sevgiyle ve Mutlulukla
        </p>
      </footer>
    </div>
  );
}
