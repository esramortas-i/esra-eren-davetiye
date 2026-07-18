import { WeddingSettings, RSVPResponse, MusicRequest, GuestWish, PolaroidPhoto } from "./types";

// Default settings for first load
export const DEFAULT_SETTINGS: WeddingSettings = {
  brideName: "Esra",
  groomName: "Hasan Eren",
  brideParents: "Zülfüye Özbek & Fatih Mortaş",
  groomParents: "Esma Yılmaz & Hakan İşçi",
  weddingDate: "2026-09-05T13:00",
  venueName: "Gaziosmanpaşa Belediyesi Nikah Salonu",
  venueAddress: "Millet Bahçesi, Gaziosmanpaşa, İstanbul",
  venueMapUrl: "https://maps.google.com/?q=Gaziosmanpasa+Belediyesi+Nikah+Salonu+Millet+Bahcesi",
  kinaDate: "2026-09-11T19:30",
  kinaVenueName: "Selvi Davet Salonu",
  kinaVenueAddress: "Ihlamur Mahallesi No:12, Beşiktaş, İstanbul",
  kinaVenueMapUrl: "https://maps.google.com/?q=Selvi+Davet+Salonu+Besiktas+Istanbul",
  nikahDate: "2026-09-05T13:00",
  nikahVenueName: "Gaziosmanpaşa Belediyesi Nikah Salonu",
  nikahVenueAddress: "Millet Bahçesi, Gaziosmanpaşa, İstanbul",
  nikahVenueMapUrl: "https://maps.app.goo.gl/STtws9KKwKFb9fSFA",
  loveStoryTitle: "Aşkımızın Hikayesi",
  loveStoryText: "Anıtkabir'in o asil atmosferinde kesişen yollarımız, kalplerimizin de birbirini bulmasıyla tek bir sonsuz hikayeye dönüştü. O günden beri hayatın karşımıza çıkardığı her zorluğu el ele vererek geçmişte bıraktık, birbirimize güvenerek bugünlere geldik. Şimdi ise bu güzel yolculuğumuzu, hayatlarımızı birleştirerek taçlandırmak için sabırsızlanıyoruz. Ömür boyu sürecek bu ortak geleceğimizin ilk gününde, siz değerli misafirlerimizi de aramızda görmekten mutluluk duyarız.",
  driveUrl: "https://drive.google.com/drive/folders/1eWXsckV2yxScCu6_ghsMsl35zkfni3zM?usp=drive_link",
  theme: "gold",
  hostPasswordCode: "1234",
};

// Seed RSVPs for testing
export const SEED_RSVPS: RSVPResponse[] = [
  {
    id: "r1",
    name: "Murat & Seda Kaya",
    isAttending: true,
    guestCount: 2,
    dietPreference: "standard",
    notes: "Canım arkadaşlarım, ömür boyu mutluluklar dileriz! Orada olmak için sabırsızlanıyoruz.",
    timestamp: "2026-07-01T14:30:00.000Z",
  },
  {
    id: "r2",
    name: "Zeynep Demir",
    isAttending: true,
    guestCount: 1,
    dietPreference: "vegetarian",
    notes: "Tebrikler! Çok mutlu olun inşallah.",
    timestamp: "2026-07-02T09:15:00.000Z",
  },
  {
    id: "r3",
    name: "Ömer Şahin",
    isAttending: false,
    guestCount: 0,
    dietPreference: "none",
    notes: "Şehir dışında olacağım için katılamıyorum, ama kalbim sizinle. Mutluluklar!",
    timestamp: "2026-07-02T18:45:00.000Z",
  },
];

// Seed music requests for testing
export const SEED_MUSIC: MusicRequest[] = [
  {
    id: "m1",
    songName: "Evlenmeliyiz",
    artist: "Hadise",
    requestedBy: "Seda Kaya",
    timestamp: "2026-07-01T14:32:00.000Z",
  },
  {
    id: "m2",
    songName: "Fly Me to the Moon",
    artist: "Frank Sinatra",
    requestedBy: "Zeynep Demir",
    timestamp: "2026-07-02T09:17:00.000Z",
  },
];

// Seed wishes for Guestbook
export const SEED_WISHES: GuestWish[] = [
  {
    id: "w1",
    name: "Aylin Şen",
    relation: "Gelinin Arkadaşı",
    message: "Çocukluğumuzdan beri kurduğumuz tüm hayallerin bugün gerçek olduğunu görmek beni o kadar duygulandırıyor ki! Bir ömür boyu sonsuz mutlu olun, sizi çok seviyorum! ❤️",
    emoji: "💖",
    timestamp: "2026-07-02T10:24:00.000Z"
  },
  {
    id: "w2",
    name: "Kerem Demir",
    relation: "Damadın Kuzeni",
    message: "Kardeşim benim! Sonunda aradığın ruh eşini buldun ve hayatlarınızı birleştiriyorsunuz. Bir ömür boyu mutluluk, huzur ve bol kahkahalı günler dilerim. 🥂",
    emoji: "🥂",
    timestamp: "2026-07-02T15:40:00.000Z"
  },
  {
    id: "w3",
    name: "Merve & Burak Kurt",
    relation: "Aile Dostu",
    message: "Gözlerinizdeki bu güzel ışık hiçbir zaman sönmesin. Sevginizin, saygınızın her geçen gün katlanarak büyüyeceği harika bir evlilik hayatı dileriz. Tebrikler! 💍✨",
    emoji: "💍",
    timestamp: "2026-07-03T09:12:00.000Z"
  }
];

// Seed photos for Live Photo Gallery
export const SEED_PHOTOS: PolaroidPhoto[] = [
  {
    id: "p1",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
    caption: "Bu masal burada başlamıyor, sonsuza kadar sürüyor! ✨",
    uploadedBy: "Merve & Serkan",
    timestamp: "19:42",
  },
  {
    id: "p2",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
    caption: "Harika çiftimiz, sonsuz mutluluklar! 🥂🎉",
    uploadedBy: "Hakan Yılmaz",
    timestamp: "20:15",
  },
  {
    id: "p3",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600",
    caption: "İlk dans, muhteşem an! 💖💃",
    uploadedBy: "Seda & Caner",
    timestamp: "21:05",
  },
  {
    id: "p4",
    src: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=600",
    caption: "Birlikte yaşlanın inşallah, süpersiniz! 🥰",
    uploadedBy: "Aylin Öz",
    timestamp: "22:30",
  },
];

// Turkish date names helper
export function formatTurkishDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${monthName} ${year}, ${dayName} - Saat ${hours}:${minutes}`;
  } catch (e) {
    return dateStr;
  }
}

// Generate calendar links
export function generateGoogleCalendarUrl(settings: WeddingSettings): string {
  const startDate = new Date(settings.weddingDate);
  // Düğün süresini varsayılan olarak 4 saat yapalım
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

  const formatToISO = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const title = encodeURIComponent(`${settings.brideName} & ${settings.groomName} Nikah Daveti`);
  const details = encodeURIComponent(
    `Sevgili Dostlarımız,\n\n${settings.brideName} & ${settings.groomName} çiftinin nikah töreninde sizleri de aramızda görmekten onur duyarız.\n\nFotoğrafları paylaşmak için Drive Linki:\n${settings.driveUrl}`
  );
  const location = encodeURIComponent(`${settings.venueName}, ${settings.venueAddress}`);
  const dates = `${formatToISO(startDate)}/${formatToISO(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function generateKinaCalendarUrl(settings: WeddingSettings): string {
  const startDate = new Date(settings.kinaDate || "2026-09-11T19:30");
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

  const formatToISO = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const title = encodeURIComponent(`${settings.brideName} & ${settings.groomName} Kına Gecesi`);
  const details = encodeURIComponent(
    `Sevgili Dostlarımız,\n\n${settings.brideName} & ${settings.groomName} çiftinin kına gecesinde sizleri de aramızda görmekten onur duyarız.\n\nFotoğrafları paylaşmak için Drive Linki:\n${settings.driveUrl}`
  );
  const location = encodeURIComponent(`${settings.kinaVenueName || ""}, ${settings.kinaVenueAddress || ""}`);
  const dates = `${formatToISO(startDate)}/${formatToISO(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function generateNikahCalendarUrl(settings: WeddingSettings): string {
  const startDate = new Date(settings.nikahDate || "2026-09-13T14:30");
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatToISO = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const title = encodeURIComponent(`${settings.brideName} & ${settings.groomName} Nikah Töreni`);
  const details = encodeURIComponent(
    `Sevgili Dostlarımız,\n\n${settings.brideName} & ${settings.groomName} çiftinin nikah töreninde sizleri de aramızda görmekten onur duyarız.\n\nFotoğrafları paylaşmak için Drive Linki:\n${settings.driveUrl}`
  );
  const location = encodeURIComponent(`${settings.nikahVenueName || ""}, ${settings.nikahVenueAddress || ""}`);
  const dates = `${formatToISO(startDate)}/${formatToISO(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

// Export array of RSVPs to CSV format
export function downloadRSVPsAsCSV(rsvps: RSVPResponse[]): void {
  const headers = ["Ad Soyad", "Katilim Durumu", "Kisi Sayisi", "Menu Tercihi", "Not", "Tarih"];
  const rows = rsvps.map((r) => [
    r.name,
    r.isAttending ? "Katiliyor" : "Katilmiyor",
    r.guestCount,
    r.dietPreference === "standard"
      ? "Standart"
      : r.dietPreference === "vegan"
      ? "Vegan"
      : r.dietPreference === "vegetarian"
      ? "Vejetaryen"
      : r.dietPreference === "child"
      ? "Cocuk Menusu"
      : "Yok",
    r.notes ? r.notes.replace(/"/g, '""') : "",
    new Date(r.timestamp).toLocaleString("tr-TR"),
  ]);

  const csvContent =
    "\uFEFF" + // BOM for Turkish character support in Excel
    [headers.join(";"), ...rows.map((row) => row.map((val) => `"${val}"`).join(";"))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "davetli_listesi_rsvp.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
