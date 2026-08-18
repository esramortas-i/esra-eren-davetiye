export interface WeddingSettings {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  weddingDate: string; // ISO format string, used for the countdown timer
  nikahDate: string;
  nikahVenueName: string;
  nikahVenueAddress: string;
  nikahVenueMapUrl: string;
  loveStoryTitle: string;
  loveStoryText: string;
  driveUrl: string; // Google Drive folder link
  theme: "rose" | "sage" | "gold" | "lavender" | "slate";
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
