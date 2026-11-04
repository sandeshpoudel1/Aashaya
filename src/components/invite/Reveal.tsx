import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { art } from "./assets";

/** Calls back once when the element scrolls into view. */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

/** Reveals its children once, staggered, when scrolled into view. Each child gets --i. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} data-reveal className={cn(className, shown && "is-shown")}>
      {Children.toArray(children).map((child, i) => (
        <div key={i} style={{ "--i": i } as CSSProperties}>
          {child}
        </div>
      ))}
    </div>
  );
}

/** Painted gold lotus divider. */
export function GoldRule({ className }: { className?: string }) {
  return (
    <img
      src={art.divider}
      alt=""
      aria-hidden
      width={480}
      height={48}
      loading="lazy"
      className={cn("mx-auto block h-auto w-[min(14rem,66%)]", className)}
    />
  );
}

/** Gold filigree in the four corners of a card. Parent must be `relative`. */
export function Corners({
  size = "size-11 sm:size-14",
  inset = "inset-2",
}: {
  size?: string;
  inset?: string;
}) {
  const turns = ["", "rotate-90", "rotate-180", "-rotate-90"];
  const spots = ["left-0 top-0", "right-0 top-0", "bottom-0 right-0", "bottom-0 left-0"];
  return (
    <div className={cn("pointer-events-none absolute", inset)} aria-hidden>
      {spots.map((spot, i) => (
        <img
          key={i}
          src={art.corner}
          alt=""
          loading="lazy"
          className={cn("absolute", size, spot, turns[i])}
        />
      ))}
    </div>
  );
}

/** Script heading with an optional small-caps line above it. */
export function ScriptHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="text-center">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="script-title">{title}</h2>
    </div>
  );
}
