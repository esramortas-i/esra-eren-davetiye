import React, { useState, useEffect } from "react";
import {
  Users,
  Music,
  Settings as SettingsIcon,
  Download,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  Palette,
  RefreshCw,
  PlusCircle,
  LogOut,
  Calendar,
  MapPin,
  CheckCircle2,
  FolderOpen,
  Heart,
  Sparkles,
  Camera,
} from "lucide-react";
import { WeddingSettings, RSVPResponse, MusicRequest, WeddingTheme, GuestWish, PolaroidPhoto } from "../types";
import { formatTurkishDate, downloadRSVPsAsCSV, SEED_RSVPS, SEED_MUSIC, SEED_WISHES, SEED_PHOTOS } from "../utils";
import { WEDDING_THEMES } from "../themes";

interface HostDashboardProps {
  settings: WeddingSettings;
  onUpdateSettings: (newSettings: WeddingSettings) => void;
  rsvps: RSVPResponse[];
  onUpdateRSVPs: (newRSVPs: RSVPResponse[]) => void;
  musicRequests: MusicRequest[];
  onUpdateMusic: (newMusic: MusicRequest[]) => void;
  photos: PolaroidPhoto[];
  onUpdatePhotos: (newPhotos: PolaroidPhoto[]) => void;
  onClose: () => void;
}

export default function HostDashboard({
  settings,
  onUpdateSettings,
  rsvps,
  onUpdateRSVPs,
  musicRequests,
  onUpdateMusic,
  photos,
  onUpdatePhotos,
  onClose,
}: HostDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [activeTab, setActiveTab] = useState<"settings" | "themes" | "photos">("settings");

  const [wishes, setWishes] = useState<GuestWish[]>([]);
  
  // Custom confirmation modal state
  const [confirmAction, setConfirmAction] = useState<{ message: string; onConfirm: () => void } | null>(null);

  const askConfirmation = (message: string, onConfirm: () => void) => {
    setConfirmAction({
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmAction(null);
      }
    });
  };

  // Photo management handlers
  const handleDeletePhoto = (id: string) => {
    askConfirmation("Bu fotoğrafı anı duvarından silmek istediğinize emin misiniz?", () => {
      const updated = photos.filter((p) => p.id !== id);
      onUpdatePhotos(updated);
    });
  };

  const handleResetPhotos = () => {
    askConfirmation("Tüm fotoğrafları silip örnek fotoğrafları geri yüklemek istediğinize emin misiniz?", () => {
      onUpdatePhotos(SEED_PHOTOS);
    });
  };

  const handleClearAllPhotos = () => {
    askConfirmation("Anı duvarındaki TÜM fotoğrafları kalıcı olarak silmek istediğinize emin misiniz?", () => {
      onUpdatePhotos([]);
    });
  };

  // Load guestbook wishes when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const saved = localStorage.getItem("wedding_guestbook_wishes");
      if (saved) {
        try {
          setWishes(JSON.parse(saved));
        } catch (e) {
          setWishes(SEED_WISHES);
        }
      } else {
        setWishes(SEED_WISHES);
      }
    }
  }, [isAuthenticated]);

  // Setting edit form states
  const [brideName, setBrideName] = useState(settings.brideName);
  const [groomName, setGroomName] = useState(settings.groomName);
  const [brideParents, setBrideParents] = useState(settings.brideParents);
  const [groomParents, setGroomParents] = useState(settings.groomParents);
  const [weddingDate, setWeddingDate] = useState(settings.weddingDate);
  const [venueName, setVenueName] = useState(settings.venueName);
  const [venueAddress, setVenueAddress] = useState(settings.venueAddress);
  const [venueMapUrl, setVenueMapUrl] = useState(settings.venueMapUrl);
  const [kinaDate, setKinaDate] = useState(settings.kinaDate || "2026-09-11T19:30");
  const [kinaVenueName, setKinaVenueName] = useState(settings.kinaVenueName || "Selvi Davet Salonu");
  const [kinaVenueAddress, setKinaVenueAddress] = useState(settings.kinaVenueAddress || "Ihlamur Mahallesi No:12, Beşiktaş, İstanbul");
  const [kinaVenueMapUrl, setKinaVenueMapUrl] = useState(settings.kinaVenueMapUrl || "https://maps.google.com/?q=Selvi+Davet+Salonu+Besiktas+Istanbul");
  const [nikahDate, setNikahDate] = useState(settings.nikahDate || "2026-09-13T14:30");
  const [nikahVenueName, setNikahVenueName] = useState(settings.nikahVenueName || "Beşiktaş Evlendirme Dairesi");
  const [nikahVenueAddress, setNikahVenueAddress] = useState(settings.nikahVenueAddress || "Türkali Mahallesi, Beşiktaş, İstanbul");
  const [nikahVenueMapUrl, setNikahVenueMapUrl] = useState(settings.nikahVenueMapUrl || "https://maps.google.com/?q=Besiktas+Evlendirme+Dairesi+Istanbul");
  const [loveStoryTitle, setLoveStoryTitle] = useState(settings.loveStoryTitle);
  const [loveStoryText, setLoveStoryText] = useState(settings.loveStoryText);
  const [driveUrl, setDriveUrl] = useState(settings.driveUrl);
  const [hostPasswordCode, setHostPasswordCode] = useState(settings.hostPasswordCode);

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Auth Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === settings.hostPasswordCode) {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Hatalı giriş şifresi! Lütfen tekrar deneyin.");
    }
  };

  // Seed Data Handler
  const handleLoadSeedData = () => {
    askConfirmation("Test amaçlı hazır örnek verileri yüklemek istiyor musunuz? (Mevcut verileriniz silinir)", () => {
      onUpdateRSVPs(SEED_RSVPS);
      onUpdateMusic(SEED_MUSIC);
      setWishes(SEED_WISHES);
      localStorage.setItem("wedding_guestbook_wishes", JSON.stringify(SEED_WISHES));
    });
  };

  // Clear RSVPs
  const handleClearRSVPs = () => {
    askConfirmation("Tüm davetli listesini temizlemek istediğinize emin misiniz? Bu işlem geri alınamaz!", () => {
      onUpdateRSVPs([]);
    });
  };

  // Clear Music
  const handleClearMusic = () => {
    askConfirmation("Tüm müzik isteklerini temizlemek istediğinize emin misiniz?", () => {
      onUpdateMusic([]);
    });
  };

  // Delete Guestbook Wish
  const handleDeleteWish = (id: string) => {
    askConfirmation("Bu tebrik mesajını silmek istediğinize emin misiniz?", () => {
      const updated = wishes.filter((w) => w.id !== id);
      setWishes(updated);
      localStorage.setItem("wedding_guestbook_wishes", JSON.stringify(updated));
    });
  };

  // Clear All Guestbook Wishes
  const handleClearWishes = () => {
    askConfirmation("Tüm tebrik mesajlarını silmek istediğinize emin misiniz? Bu işlem geri alınamaz!", () => {
      setWishes([]);
      localStorage.setItem("wedding_guestbook_wishes", JSON.stringify([]));
    });
  };

  // Settings Save Handler
  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: WeddingSettings = {
      ...settings,
      brideName,
      groomName,
      brideParents,
      groomParents,
      weddingDate,
      venueName,
      venueAddress,
      venueMapUrl,
      kinaDate,
      kinaVenueName,
      kinaVenueAddress,
      kinaVenueMapUrl,
      nikahDate,
      nikahVenueName,
      nikahVenueAddress,
      nikahVenueMapUrl,
      loveStoryTitle,
      loveStoryText,
      driveUrl,
      hostPasswordCode,
    };
    onUpdateSettings(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Theme Save Handler
  const handleThemeSelect = (themeId: "rose" | "sage" | "gold" | "lavender" | "slate") => {
    onUpdateSettings({
      ...settings,
      theme: themeId,
    });
  };

  // Calculate RSVP Statistics
  const totalSubmissions = rsvps.length;
  const attendingCount = rsvps.filter((r) => r.isAttending).length;
  const totalGuests = rsvps.reduce((sum, r) => sum + (r.isAttending ? r.guestCount : 0), 0);
  const nonAttendingCount = rsvps.filter((r) => !r.isAttending).length;

  const dietStats = rsvps.reduce(
    (acc, r) => {
      if (r.isAttending) {
        acc[r.dietPreference] = (acc[r.dietPreference] || 0) + r.guestCount;
      }
      return acc;
    },
    { standard: 0, vegan: 0, vegetarian: 0, child: 0, none: 0 } as Record<string, number>
  );

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#FCFBF9] w-full max-w-md rounded-3xl p-8 border border-stone-200/50 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors text-xl font-medium w-8 h-8 flex items-center justify-center rounded-full bg-stone-100"
          >
            ×
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-stone-600" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-stone-800">Düğün Sahibi Paneli</h3>
            <p className="text-xs text-stone-500 mt-1">
              Anı defteri dileklerini ve davetiye ayarlarını düzenlemek için şifrenizi girin.
            </p>
            <p className="text-[10px] text-amber-600 bg-amber-50 rounded-lg px-2 py-1 mt-2 inline-block">
              Varsayılan Test Şifresi: <span className="font-mono font-bold">1234</span>
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Yönetici Şifresi"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent text-sm placeholder-stone-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {errorMsg && <p className="text-xs text-red-500 text-center font-medium">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-medium text-sm transition-all duration-300 shadow-sm"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FCFBF9] w-full max-w-5xl h-[90vh] md:h-[80vh] rounded-3xl border border-stone-200/50 shadow-2xl overflow-hidden flex flex-col">
        {/* Panel Header */}
        <div className="bg-white border-b border-stone-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="font-serif text-2xl font-bold text-stone-800">
                Düğün Yönetim Paneli
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {settings.brideName} & {settings.groomName} Düğünü Yönetim Sayfası
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleLoadSeedData}
              className="px-3.5 py-2 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-colors"
              title="Test etmek için örnek anı defteri tebrikleri ekler."
            >
              <RefreshCw className="w-3.5 h-3.5" /> Örnek Veri Yükle
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 border border-rose-100 hover:bg-rose-50 text-rose-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Paneli Kapat
            </button>
          </div>
        </div>

        {/* Panel Navigation & Body Layout */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-60 bg-stone-50/50 border-r border-stone-100 p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap md:whitespace-normal w-full ${
                activeTab === "settings"
                  ? "bg-white text-stone-900 border border-stone-200 shadow-sm font-semibold"
                  : "text-stone-600 hover:bg-stone-100/50 hover:text-stone-900"
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-stone-500" /> Davetiye Ayarları
            </button>

            <button
              onClick={() => setActiveTab("themes")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap md:whitespace-normal w-full ${
                activeTab === "themes"
                  ? "bg-white text-stone-900 border border-stone-200 shadow-sm font-semibold"
                  : "text-stone-600 hover:bg-stone-100/50 hover:text-stone-900"
              }`}
            >
              <Palette className="w-4 h-4 text-stone-500" /> Renk Teması Seçici
            </button>

            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap md:whitespace-normal w-full ${
                activeTab === "photos"
                  ? "bg-white text-stone-900 border border-stone-200 shadow-sm font-semibold"
                  : "text-stone-600 hover:bg-stone-100/50 hover:text-stone-900"
              }`}
            >
              <Camera className="w-4 h-4 text-stone-500" /> Anı Duvarı Fotoğrafları
            </button>
          </div>

          {/* Active Content Area */}
          <div className="flex-grow p-6 overflow-y-auto bg-white">
            {/* TAB 3: SETTINGS FORM */}
            {activeTab === "settings" && (
              <form onSubmit={handleSettingsSubmit} className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-stone-800">Davetiye Bilgilerini Düzenle</h3>
                    <p className="text-xs text-stone-500 mt-1">Davetiyede görüntülenen her şeyi anında güncelleyin.</p>
                  </div>
                  {saveSuccess && (
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-lg animate-fade-in flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Başarıyla Kaydedildi!
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Bride & Groom names */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Gelin Adı *</label>
                    <input
                      type="text"
                      required
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Damat Adı *</label>
                    <input
                      type="text"
                      required
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm"
                    />
                  </div>

                  {/* Parents info */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Gelinin Ailesi</label>
                    <input
                      type="text"
                      value={brideParents}
                      onChange={(e) => setBrideParents(e.target.value)}
                      placeholder="Örn: Ayşe & Ahmet Yılmaz"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Damadın Ailesi</label>
                    <input
                      type="text"
                      value={groomParents}
                      onChange={(e) => setGroomParents(e.target.value)}
                      placeholder="Örn: Fatma & Mehmet Demir"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm"
                    />
                  </div>

                  {/* Google Drive Folder Link (CRITICAL) */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1 text-emerald-700">
                      <FolderOpen className="w-3.5 h-3.5" /> Google Drive Klasör Linki *
                    </label>
                    <input
                      type="url"
                      required
                      value={driveUrl}
                      onChange={(e) => setDriveUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/..."
                      className="w-full px-4 py-2.5 bg-emerald-50/20 border border-emerald-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white text-sm text-stone-800"
                    />
                    <span className="text-[9px] text-emerald-600 leading-tight block mt-1">
                      Misafirlerin fotoğraf yükleyebilmesi için Drive klasörünüzün paylaşım ayarını <strong>&quot;Bağlantıya sahip olan herkes düzenleyebilir&quot; (Editor)</strong> yapmayı unutmayın!
                    </span>
                  </div>
                </div>

                {/* NİKAH TÖRENİ BİLGİLERİ */}
                <div className="space-y-4 border-t border-stone-100 pt-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-stone-400 flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Nikah Töreni Bilgileri
                  </span>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">Nikah Tarihi & Saati *</label>
                      <input
                        type="datetime-local"
                        required
                        value={nikahDate}
                        onChange={(e) => setNikahDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm"
                      />
                      <span className="text-[10px] text-stone-400 mt-1 block">
                        Seçilen: {formatTurkishDate(nikahDate)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">Nikah Mekan Adı *</label>
                      <input
                        type="text"
                        required
                        value={nikahVenueName}
                        onChange={(e) => setNikahVenueName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">Nikah Google Harita Linki</label>
                      <input
                        type="url"
                        value={nikahVenueMapUrl}
                        onChange={(e) => setNikahVenueMapUrl(e.target.value)}
                        placeholder="https://maps.google.com/..."
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">Nikah Açık Adresi *</label>
                      <textarea
                        required
                        rows={2}
                        value={nikahVenueAddress}
                        onChange={(e) => setNikahVenueAddress(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Story details */}
                <div className="space-y-4">
                  <div className="border-t border-stone-100 pt-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-stone-400 flex items-center gap-1 mb-3">
                      <Calendar className="w-3.5 h-3.5" /> Aşkımızın Hikayesi (Bölümü)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Hikaye Başlığı</label>
                    <input
                      type="text"
                      value={loveStoryTitle}
                      onChange={(e) => setLoveStoryTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Giriş/Hikaye Metni</label>
                    <textarea
                      rows={4}
                      value={loveStoryText}
                      onChange={(e) => setLoveStoryText(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white text-sm resize-none leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                {/* Password and Controls */}
                <div className="border-t border-stone-100 pt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">Yönetim Paneli Giriş Şifresi *</label>
                      <input
                        type="text"
                        required
                        value={hostPasswordCode}
                        onChange={(e) => setHostPasswordCode(e.target.value)}
                        className="w-full px-4 py-2.5 bg-amber-50/10 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="px-6 py-3 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm inline-flex items-center gap-2"
                >
                  Değişiklikleri Kaydet
                </button>
              </form>
            )}

            {/* TAB 4: THEMES */}
            {activeTab === "themes" && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-800">Renk Paleti & Stil Seçimi</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Davetiyenizin renklerini tek tıkla soft davetiye temalarından birine dönüştürün.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.values(WEDDING_THEMES).map((theme) => {
                    const isSelected = settings.theme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleThemeSelect(theme.id as any)}
                        className={`p-5 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group ${
                          isSelected
                            ? "border-stone-800 bg-[#FCFBF9] ring-2 ring-stone-200 shadow-md"
                            : "border-stone-200 hover:border-stone-300 bg-white shadow-sm"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-stone-800">{theme.name}</span>
                            {isSelected && (
                              <span className="bg-stone-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                Aktif
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400 mt-1 block">
                            {theme.id === "rose" && "Sıcak & Romantik Toz Pembe"}
                            {theme.id === "sage" && "Doğal & Dingin Adaçayı Yeşili"}
                            {theme.id === "gold" && "Zarif & Zamansız Altın Şampanya"}
                            {theme.id === "lavender" && "Düşsel & Çekici Lavanta Moru"}
                            {theme.id === "slate" && "Ultra Minimalist Keten Tonları"}
                          </span>
                        </div>

                        {/* Tiny color preview bubbles */}
                        <div className="flex gap-1.5 pl-3">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-stone-200"
                            style={{
                              backgroundColor:
                                theme.id === "rose"
                                  ? "#f43f5e"
                                  : theme.id === "sage"
                                  ? "#047857"
                                  : theme.id === "gold"
                                  ? "#d97706"
                                  : theme.id === "lavender"
                                  ? "#9333ea"
                                  : "#44403c",
                            }}
                          ></span>
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-stone-200"
                            style={{
                              backgroundColor:
                                theme.id === "rose"
                                  ? "#ffe4e6"
                                  : theme.id === "sage"
                                  ? "#e2ede2"
                                  : theme.id === "gold"
                                  ? "#eae0cd"
                                  : theme.id === "lavender"
                                  ? "#e9d5ff"
                                  : "#e9ecef",
                            }}
                          ></span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 bg-stone-50 border border-stone-100 rounded-2xl text-xs text-stone-500 leading-relaxed">
                  <strong>İpucu:</strong> Davetiyenizin genel görünümü seçtiğiniz tema doğrultusunda tamamen değişir. Seçilen tema arka plan geçişlerini, kart kenarlıklarını, buton renklerini ve form odaklanma alanlarını kapsar.
                </div>
              </div>
            )}

            {/* TAB 5: PHOTOS */}
            {activeTab === "photos" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-stone-800">Anı Duvarı Fotoğraf Yönetimi</h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Misafirlerinizin yüklediği fotoğrafları yönetin. İstenmeyen fotoğrafları anında kaldırabilirsiniz.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleResetPhotos}
                      className="px-3 py-1.5 border border-stone-200 hover:bg-stone-50 rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Örnek Fotoğrafları Geri Yükle
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAllPhotos}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Tüm Fotoğrafları Sil
                    </button>
                  </div>
                </div>

                {photos.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-stone-200 rounded-2xl text-stone-400 text-sm italic">
                    Anı duvarında şu anda hiç fotoğraf bulunmuyor. 📸
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between group relative shadow-sm"
                      >
                        {/* Photo Container */}
                        <div className="aspect-square w-full bg-stone-100 relative overflow-hidden">
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow transition-all duration-200"
                              title="Bu fotoğrafı kaldır"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono px-1.5 py-0.5 rounded">
                            {photo.timestamp}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-3 flex-grow flex flex-col justify-between">
                          <p className="text-xs text-stone-700 font-serif line-clamp-2 mb-2 italic">
                            &ldquo;{photo.caption}&rdquo;
                          </p>
                          <div className="border-t border-stone-100 pt-2 mt-auto">
                            <div className="flex items-center justify-between text-[10px] text-stone-500">
                              <span className="truncate max-w-[80px]" title={photo.uploadedBy}>
                                {photo.uploadedBy}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeletePhoto(photo.id)}
                                className="text-rose-600 hover:text-rose-800 font-medium flex items-center gap-0.5"
                              >
                                <Trash2 className="w-2.5 h-2.5" /> Sil
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-100 max-w-sm w-full p-6 shadow-xl">
            <h4 className="font-serif text-lg font-medium text-stone-900 mb-2">
              Onay Gerekiyor
            </h4>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              {confirmAction.message}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-medium text-stone-700 transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={confirmAction.onConfirm}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-medium shadow-sm transition-colors"
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
