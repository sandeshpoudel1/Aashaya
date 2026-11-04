import { useEffect, useState, type CSSProperties } from "react";
import { petals } from "./assets";
import { prefersReducedMotion } from "@/lib/invite-utils";

type Piece = { id: number; src: string; style: CSSProperties };

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const petalAt = (i: number) => petals[i % petals.length] ?? "";

/** A continuous shower clipped to the hero after the doors open. */
export function PetalRain({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    setPieces(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        src: petalAt(i),
        style: {
          left: `${rand(2, 96)}%`,
          width: `${rand(14, 26)}px`,
          height: "auto",
          "--drift": `${rand(-80, 80)}px`,
          "--rot": `${rand(-540, 540)}deg`,
          "--dur": `${rand(8500, 14000)}ms`,
          "--delay": `${rand(-14000, 0)}ms`,
        } as CSSProperties,
      })),
    );
  }, [active]);

  if (!active || !pieces.length) return null;
  return (
    <div className="petal-rain-layer" aria-hidden>
      {pieces.map((p) => (
        <img key={p.id} src={p.src} alt="" className="petal-rain" style={p.style} />
      ))}
    </div>
  );
}

/** Burst of petals out of a point, used when the date is revealed. */
export function PetalBurst() {
  const [pieces] = useState<Piece[]>(() =>
    Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2 + rand(-0.2, 0.2);
      const dist = rand(110, 190);
      return {
        id: i,
        src: petalAt(i),
        style: {
          "--tx": `${Math.cos(angle) * dist}px`,
          "--ty": `${Math.sin(angle) * dist * 0.7 + 60}px`,
          "--rot": `${rand(-260, 260)}deg`,
          "--dur": `${rand(1300, 1900)}ms`,
          "--delay": `${rand(0, 140)}ms`,
        } as CSSProperties,
      };
    }),
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
      {pieces.map((p) => (
        <img key={p.id} src={p.src} alt="" className="petal-burst" style={p.style} />
      ))}
    </div>
  );
}
