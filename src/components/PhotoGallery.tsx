import React from "react";
import { ExternalLink, QrCode } from "lucide-react";
import { WeddingSettings, WeddingTheme } from "../types";

interface PhotoGalleryProps {
  settings: WeddingSettings;
  theme: WeddingTheme;
}

export default function PhotoGallery({ settings, theme }: PhotoGalleryProps) {
  // Generate QR Code URL from Drive URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(
    settings.driveUrl
  )}&color=0f172a&bgcolor=fcfbf9&margin=15`;

  return (
    <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto border-t border-stone-200/50">
      <div className="text-center mb-12">
        <span className="font-script text-4xl text-stone-500 block mb-2">
          Anıları Paylaşalım
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-stone-800">
          Fotoğraf Paylaşım Karekodu
        </h2>
        <div className="w-16 h-0.5 bg-stone-300 mx-auto my-4"></div>
        <p className="text-stone-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Sevgili misafirlerimiz, düğün günümüzden en güzel anıları bizimle paylaşmak isterseniz, bu QR kodu ile Drive klasörümüze fotoğraflarınızı yükleyebilirsiniz. Şimdiden teşekkürler!
        </p>
      </div>

      {/* Elegant QR Code Card */}
      <div className="max-w-md mx-auto flex flex-col items-center justify-between p-5 sm:p-8 bg-[#FCFBF9] border border-stone-200/60 rounded-3xl text-center shadow-sm min-w-0 overflow-hidden">
        <div className="w-full">
          <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-stone-400 mb-4 bg-stone-100 px-2.5 py-1 rounded-full">
            <QrCode className="w-3.5 h-3.5" /> Google Drive Linki
          </span>
          <h3 className="font-serif text-xl font-medium text-stone-800 mb-2">
            Karekodu Telefonunuzla Taratın
          </h3>
          <p className="text-xs text-stone-500 mb-6 px-2">
            Kameranızı açıp karekodu okutarak doğrudan yükleme yapabilirsiniz.
          </p>
        </div>

        {/* Styled QR Code Image with elegant frame */}
        <div className="relative p-4 bg-white border border-stone-100 rounded-2xl shadow-inner max-w-[200px] sm:max-w-[240px] aspect-square flex items-center justify-center mx-auto mb-6">
          <img
            src={qrCodeUrl}
            alt="Google Drive QR Code"
            className="w-full h-full object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
          {/* Soft decorative flower corner details */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-stone-300"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-stone-300"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-stone-300"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-stone-300"></div>
        </div>

        <div className="w-full">
          <a
            href={settings.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm shadow-sm ${theme.primaryColor}`}
          >
            <ExternalLink className="w-4 h-4" /> Drive Klasörünü Aç
          </a>
          <p className="text-[10px] text-stone-400 mt-2 hover:underline select-all break-all max-w-full px-2">
            {settings.driveUrl}
          </p>
        </div>
      </div>
    </section>
  );
}
