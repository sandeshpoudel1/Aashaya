// Artwork generated with Codex image generation, trimmed and compressed to WebP.
import type { Theme } from "@/lib/theme";
import heroDarkMobile from "@/assets/invite/hero-mobile.webp";
import heroDarkDesktop from "@/assets/invite/hero-desktop.webp";
import heroLightMobile from "@/assets/invite/hero-light-mobile.webp";
import heroLightDesktop from "@/assets/invite/hero-light-desktop.webp";
import closingDark from "@/assets/invite/closing.webp";
import closingLight from "@/assets/invite/closing-light.webp";
import ganesh from "@/assets/invite/ganesh.webp";
import diyo from "@/assets/invite/diyo.webp";
import door from "@/assets/invite/door.webp";
import seal from "@/assets/invite/seal.webp";
import divider from "@/assets/invite/divider.webp";
import corner from "@/assets/invite/corner.webp";
import envelopePocket from "@/assets/invite/envelope-pocket.webp";
import envelopeFlap from "@/assets/invite/envelope-flap.webp";
import envelopeLining from "@/assets/invite/envelope-lining.webp";
import petal1 from "@/assets/invite/petal-1.webp";
import petal2 from "@/assets/invite/petal-2.webp";
import petal3 from "@/assets/invite/petal-3.webp";

/** Art that changes with the light / dark look. */
export const themed: Record<Theme, { heroMobile: string; heroDesktop: string; closing: string }> = {
  light: { heroMobile: heroLightMobile, heroDesktop: heroLightDesktop, closing: closingLight },
  dark: { heroMobile: heroDarkMobile, heroDesktop: heroDarkDesktop, closing: closingDark },
};

export const art = {
  ganesh,
  diyo,
  door,
  seal,
  divider,
  corner,
  envelopePocket,
  envelopeFlap,
  envelopeLining,
};
export const petals = [petal1, petal2, petal3];
