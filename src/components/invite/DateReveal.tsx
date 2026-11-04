import { useCallback, useEffect, useRef, useState } from "react";
import { invitation as inv } from "@/config/invitation";
import { useLang } from "@/lib/i18n";
import { formatAdDate, formatBsDate, prefersReducedMotion, revealParts } from "@/lib/invite-utils";
import { cn } from "@/lib/utils";
import { PetalBurst } from "./Petals";
import { Reveal, ScriptHeading } from "./Reveal";

const BRUSH = 46;
const REVEAL_AT = 0.42;

/** Gold foil scratch card. Rare one-time discovery, so the reward is expressive (petal burst). */
export function DateReveal() {
  const { t, lang } = useLang();
  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const widthRef = useRef(0);
  const parts = revealParts(inv, lang);
  const cover = t(inv.copy.scratchCover);

  const paint = useCallback(() => {
    const c = canvasRef.current;
    const wrap = wrapRef.current;
    if (!c || !wrap) return;
    const { width: w, height: h } = wrap.getBoundingClientRect();
    widthRef.current = w;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // maroon lacquer with a soft sheen
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#4a0f1d");
    g.addColorStop(0.45, "#6e1423");
    g.addColorStop(0.6, "#7d1a2b");
    g.addColorStop(1, "#4a0f1d");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // fine grain so it reads as a physical surface
    for (let i = 0; i < (w * h) / 60; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,225,200,0.07)" : "rgba(20,0,5,0.18)";
      ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }
    // gold dhaka lattice pressed into the lacquer
    ctx.strokeStyle = "rgba(201,162,77,0.28)";
    ctx.lineWidth = 1;
    for (let x = -h; x < w + h; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.moveTo(x + h, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(226,200,143,0.7)";
    ctx.strokeRect(8.5, 8.5, w - 17, h - 17);
    ctx.strokeStyle = "rgba(226,200,143,0.35)";
    ctx.strokeRect(12.5, 12.5, w - 25, h - 25);

    const tg = ctx.createLinearGradient(w / 2 - 90, 0, w / 2 + 90, 0);
    tg.addColorStop(0, "#c9a24d");
    tg.addColorStop(0.5, "#f3e2b3");
    tg.addColorStop(1, "#c9a24d");
    ctx.fillStyle = tg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `500 ${lang === "ne" ? 22 : 28}px "Cormorant Garamond", "Noto Serif Devanagari", serif`;
    ctx.fillText(cover, w / 2, h / 2);
  }, [cover, lang]);

  useEffect(() => {
    if (revealed) return;
    let cancelled = false;
    void document.fonts.ready.then(() => !cancelled && paint());
    const wrap = wrapRef.current;
    const ro = new ResizeObserver(() => {
      // only repaint on a real width change (mobile URL bars fire resize constantly)
      if (wrap && Math.abs(wrap.getBoundingClientRect().width - widthRef.current) > 1) paint();
    });
    if (wrap) ro.observe(wrap);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [paint, revealed]);

  const reveal = useCallback(() => {
    setRevealed((was) => {
      if (!was && !prefersReducedMotion()) setBurst(true);
      return true;
    });
  }, []);

  // let the petal burst play, then unmount the canvas and petals
  useEffect(() => {
    if (!burst) return;
    const id = setTimeout(() => setBurst(false), 2200);
    return () => clearTimeout(id);
  }, [burst]);

  const pointAt = (e: React.PointerEvent) => {
    const r = canvasRef.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  };

  const scratch = (e: React.PointerEvent) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = pointAt(e);
    const from = last.current ?? p;
    ctx.globalCompositeOperation = "destination-out";
    // opaque brush: destination-out removes in proportion to the stroke alpha,
    // and paint() leaves a translucent strokeStyle behind
    ctx.strokeStyle = "#000";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(p.x + 0.01, p.y);
    ctx.stroke();
    last.current = p;
  };

  const clearedRatio = () => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return 0;
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++;
      if ((data[i] ?? 255) < 40) clear++;
    }
    return clear / total;
  };

  const endStroke = () => {
    if (!last.current) return;
    last.current = null;
    if (clearedRatio() > REVEAL_AT) reveal();
  };

  const primary = lang === "ne" ? formatBsDate(inv, lang) : formatAdDate(inv, lang);
  const secondary = lang === "ne" ? formatAdDate(inv, lang) : formatBsDate(inv, lang);

  return (
    <section className="px-6 py-7 sm:py-10">
      <Reveal className="mx-auto max-w-xl text-center">
        <ScriptHeading eyebrow={t(inv.copy.secretEyebrow)} title={t(inv.copy.dateTitle)} />
        <p className="serif-italic mt-2 text-lg text-fg-muted [&:lang(ne)]:text-base">
          {t(inv.copy.scratchHint)}
        </p>

        <div
          ref={wrapRef}
          data-revealed={revealed}
          className="paper relative mx-auto mt-6 w-full max-w-[22rem] select-none"
        >
          <div
            className="date-value date-row grid grid-cols-3 items-end px-2 pb-6 pt-8 text-maroon"
            aria-hidden={!revealed}
          >
            {(
              [
                [parts.day, inv.copy.dayLabel, "text-6xl"],
                [parts.month, inv.copy.monthLabel, "text-3xl [&:lang(ne)]:text-2xl"],
                [parts.year, inv.copy.yearLabel, "text-4xl"],
              ] as const
            ).map(([value, label, size], i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col items-center gap-2",
                  i === 1 && "border-x border-gold/40",
                )}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={cn("font-display leading-none", size)}>{value}</span>
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-gold-ink [&:lang(ne)]:text-sm [&:lang(ne)]:normal-case [&:lang(ne)]:tracking-normal">
                  {t(label)}
                </span>
              </div>
            ))}
          </div>
          {!revealed || burst ? (
            <canvas
              ref={canvasRef}
              className="scratch-canvas"
              data-done={revealed}
              aria-hidden
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                last.current = pointAt(e);
                scratch(e);
              }}
              onPointerMove={(e) => last.current && scratch(e)}
              onPointerUp={endStroke}
              onPointerCancel={endStroke}
            />
          ) : null}
          {burst && <PetalBurst />}
        </div>

        <div
          className={cn(
            "mt-6 space-y-1 transition-opacity duration-700",
            revealed ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="font-display text-2xl text-title [&:lang(ne)]:text-xl">
            {t(inv.wedding.weekday)} · {t(inv.wedding.time)}
          </p>
          <p className="text-sm text-fg-muted">{secondary}</p>
        </div>
        <p className="sr-only" aria-live="polite">
          {revealed ? `${primary}, ${t(inv.wedding.weekday)}, ${t(inv.wedding.time)}` : ""}
        </p>

        <div className="mt-6 flex justify-center">
          {revealed ? (
            <a href="/wedding.ics" download="sahana-sandesh-wedding.ics" className="btn-outline">
              {t(inv.copy.addToCalendar)}
            </a>
          ) : (
            <button type="button" className="btn-outline" onClick={reveal}>
              {t(inv.copy.revealDate)}
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
