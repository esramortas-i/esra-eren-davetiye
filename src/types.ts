export interface WeddingSettings {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  weddingDate: string; // ISO format string (can be used as fallback or main date)
  venueName: string;
  venueAddress: string;
  venueMapUrl: string;
  kinaDate: string;
  kinaVenueName: string;
  kinaVenueAddress: string;
  kinaVenueMapUrl: string;
  nikahDate: string;
  nikahVenueName: string;
  nikahVenueAddress: string;
  nikahVenueMapUrl: string;
  loveStoryTitle: string;
  loveStoryText: string;
  driveUrl: string; // Google Drive folder link
  theme: "rose" | "sage" | "gold" | "lavender" | "slate";
  hostPasswordCode: string;
}

export interface RSVPResponse {
  id: string;
  name: string;
  isAttending: boolean;
  guestCount: number;
  dietPreference: "standard" | "vegan" | "vegetarian" | "child" | "none";
  notes?: string;
  timestamp: string;
}

export interface MusicRequest {
  id: string;
  songName: string;
  artist: string;
  requestedBy: string;
  timestamp: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  emoji: string;
  timestamp: string;
}

export interface PolaroidPhoto {
  id: string;
  src: string;
  caption: string;
  uploadedBy: string;
  timestamp: string;
}

export type WeddingTheme = {
  id: string;
  name: string;
  bgClass: string; // main background gradient/color
  cardBgClass: string; // container card background
  primaryColor: string; // text, primary button background, accent borders
  secondaryColor: string; // secondary buttons, tag background
  textColor: string; // dark slate/charcoal text for readabilty
  accentColor: string; // decorative strokes or light borders
  ringColor: string; // focus rings
  accentGlow: string; // background decorative elements
};
