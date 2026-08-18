import { WeddingSettings } from "./types";

// Default settings for first load
export const DEFAULT_SETTINGS: WeddingSettings = {
  brideName: "Esra",
  groomName: "Hasan Eren",
  brideParents: "Zülfiye Özbek & Fatih Mortaş",
  groomParents: "Esma Yılmaz & Hakan İşçi",
  weddingDate: "2026-09-05T13:00",
  nikahDate: "2026-09-05T13:00",
  nikahVenueName: "Gaziosmanpaşa Belediyesi Nikah Salonu (Yeni Konum)",
  nikahVenueAddress: "Millet Bahçesi, Gaziosmanpaşa, İstanbul",
  nikahVenueMapUrl: "https://maps.app.goo.gl/STtws9KKwKFb9fSFA",
  loveStoryTitle: "Aşkımızın Hikayesi",
  loveStoryText: "Anıtkabir'in o asil atmosferinde kesişen yollarımız, kalplerimizin de birbirini bulmasıyla tek bir sonsuz hikayeye dönüştü. O günden beri hayatın karşımıza çıkardığı her zorluğu el ele vererek geçmişte bıraktık, birbirimize güvenerek bugünlere geldik. Şimdi ise bu güzel yolculuğumuzu, hayatlarımızı birleştirerek taçlandırmak için sabırsızlanıyoruz. Ömür boyu sürecek bu ortak geleceğimizin ilk gününde, siz değerli misafirlerimizi de aramızda görmekten mutluluk duyarız.",
  driveUrl: "https://drive.google.com/drive/folders/1eWXsckV2yxScCu6_ghsMsl35zkfni3zM?usp=drive_link",
  theme: "gold",
};

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

// Generate calendar link for the Nikah ceremony
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
