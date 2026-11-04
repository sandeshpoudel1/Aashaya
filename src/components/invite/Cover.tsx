import { useEffect, useRef, useState } from "react";
import { invitation as inv } from "@/config/invitation";
import { useLang } from "@/lib/i18n";
import { formatAdDate, formatBsDate, prefersReducedMotion } from "@/lib/invite-utils";
import { art } from "./assets";
import { Corners } from "./Reveal";

type State = "closed" | "opening" | "gone";

const DOORS_MS = 1700;

/** Carved temple doors that swing open into the invitation. Rare, one-time moment, so it may be slow. */
export function Cover({ onOpen }: { onOpen: () => void }) {
  const { t, lang } = useLang();
  const [state, setState] = useState<State>("closed");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Scroll lock is added by script only, so a guest without JavaScript is never trapped.
  useEffect(() => {
    document.documentElement.classList.add("cover-open");
    return () => document.documentElement.classList.remove("cover-open");
  }, []);

  const open = () => {
    if (state !== "closed") return;
    onOpen();
    const finish = () => {
      document.documentElement.classList.remove("cover-open");
      setState("gone");
      document.getElementById("hero-title")?.focus({ preventScroll: true });
    };
    if (prefersReducedMotion()) return finish();
    setState("opening");
    timer.current = setTimeout(finish, DOORS_MS);
  };

  if (state === "gone") return null;

  return (
    <div className="cover" data-state={state} role="dialog" aria-labelledby="cover-title">
      <noscript>
        <style>
          {
            ".cover{display:none!important}[data-reveal]>*,.hero-text>*,.name-word,.date-row>*{opacity:1!important;transform:none!important;filter:none!important}"
          }
        </style>
      </noscript>
      {(["left", "right"] as const).map((side) => (
        <div key={side} className={`cover-door cover-door--${side}`} aria-hidden>
          <span className="cover-door-art" style={{ backgroundImage: `url(${art.door})` }} />
        </div>
      ))}

      <div className="cover-plaque absolute inset-0 grid place-items-center px-6">
        <div className="paper relative w-full max-w-[21rem] px-6 py-12 text-center shadow-2xl">
          <Corners size="size-10" />
          <img
            src={art.ganesh}
            alt=""
            width={160}
            height={160}
            className="on-paper mx-auto size-16"
          />
          <p className="mt-4 font-display text-sm italic text-ink-muted [&:lang(ne)]:not-italic">
            {t(inv.copy.blessing)}
          </p>
          <h2
            id="cover-title"
            className="mt-4 font-display text-[2.6rem] leading-tight text-maroon [&:lang(ne)]:text-3xl [&:lang(ne)]:leading-normal"
          >
            {t(inv.couple.bride.short)}{" "}
            <span className="font-display text-[0.6em] italic text-gold-ink">&amp;</span>{" "}
            {t(inv.couple.groom.short)}
          </h2>
          <p className="mt-3 text-sm tracking-wide text-ink-muted">
            {t(inv.copy.title)} ·{" "}
            {lang === "ne" ? formatBsDate(inv, lang) : formatAdDate(inv, lang)}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-12 items-center rounded-full bg-maroon px-8 text-paper shadow-lg transition-transform duration-150 active:scale-[0.97]"
              onClick={open}
              autoFocus
            >
              {t(inv.copy.open)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
