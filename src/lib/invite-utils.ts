import type { Invitation } from "@/config/invitation";
import { digits, type Lang } from "@/lib/i18n";

const AD_MONTHS = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  ne: [
    "जनवरी",
    "फेब्रुअरी",
    "मार्च",
    "अप्रिल",
    "मे",
    "जुन",
    "जुलाई",
    "अगस्ट",
    "सेप्टेम्बर",
    "अक्टोबर",
    "नोभेम्बर",
    "डिसेम्बर",
  ],
};

// Read the calendar day straight from the ISO string (it carries the Nepal offset),
// so server and browser render identical text whatever their own timezone is.
function adParts(iso: string) {
  const [y = 0, m = 1, d = 1] = iso.slice(0, 10).split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

/** e.g. "5 December 2026" / "५ डिसेम्बर २०२६" */
export function formatAdDate(inv: Invitation, lang: Lang) {
  const { year, month, day } = adParts(inv.wedding.startsAt);
  return `${digits(day, lang)} ${AD_MONTHS[lang][month]} ${digits(year, lang)}`;
}

/** e.g. "Mangsir 19, 2083 BS" / "२०८३ मंसिर १९ गते" */
export function formatBsDate(inv: Invitation, lang: Lang) {
  const { day, month, year } = inv.wedding.bs;
  return lang === "ne"
    ? `वि.सं. ${digits(year, lang)} ${month.ne} ${digits(day, lang)} गते`
    : `${month.en} ${day}, ${year} BS`;
}

/** Day, month, year shown on the scratch card: Bikram Sambat in Nepali, Gregorian in English. */
export function revealParts(inv: Invitation, lang: Lang) {
  if (lang === "ne") {
    const { day, month, year } = inv.wedding.bs;
    return { day: digits(day, lang), month: month.ne, year: digits(year, lang) };
  }
  const { year, month, day } = adParts(inv.wedding.startsAt);
  return { day: String(day), month: AD_MONTHS.en[month] ?? "", year: String(year) };
}

const toIcsDate = (d: Date) =>
  d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

const esc = (s: string) => s.replace(/[\\,;]/g, (m) => "\\" + m).replace(/\n/g, "\\n");

export function buildIcs(inv: Invitation, url: string) {
  const start = new Date(inv.wedding.startsAt);
  const end = new Date(start.getTime() + inv.wedding.calendarHours * 36e5);
  const { bride, groom } = inv.couple;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sahana and Sandesh//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:sahana-sandesh-wedding@invitation",
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${esc(`${bride.short.en} & ${groom.short.en} Wedding`)}`,
    `DESCRIPTION:${esc(url)}`,
    `LOCATION:${esc(`${inv.venue.name.en}, ${inv.venue.address.en}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function timeLeft(target: number, now: number) {
  const diff = Math.max(0, target - now);
  return {
    done: diff === 0,
    days: Math.floor(diff / 864e5),
    hours: Math.floor(diff / 36e5) % 24,
    minutes: Math.floor(diff / 6e4) % 60,
    seconds: Math.floor(diff / 1e3) % 60,
  };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
