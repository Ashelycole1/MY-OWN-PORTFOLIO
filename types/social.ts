export interface SocialLink {
  platform: string;
  url: string;
  icon: string;        // key for PlatformIcon
  brandColor: string;  // hex, for icon chip and hover glow
  handle: string;      // shown on the card, e.g. "@Ashelycole1"
  blurb: string;       // one line on what the profile is for
}
