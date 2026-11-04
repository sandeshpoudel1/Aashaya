import type { CSSProperties } from "react";
import { invitation as inv } from "@/config/invitation";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ScriptHeading, useInView } from "./Reveal";

/** A gold thread that draws itself down the page, with each moment popping on beside it. */
export function Schedule() {
  const { t } = useLang();
  const { ref, shown } = useInView<HTMLOListElement>(0.25);

  return (
    <section className="px-6 py-7 sm:py-10">
      <div className="mx-auto max-w-md">
        <ScriptHeading title={t(inv.copy.scheduleTitle)} />
        <ol ref={ref} className={cn("relative mt-10", shown && "is-shown")}>
          <span
            className="timeline-line absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gold/60"
            aria-hidden
          />
          {inv.wedding.schedule.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li key={i} className="relative grid grid-cols-2 pb-12 last:pb-2">
                <span
                  className="timeline-dot absolute left-1/2 top-2 -ml-[5px] size-2.5 bg-gold"
                  style={{ "--i": i } as CSSProperties}
                  aria-hidden
                />
                <div
                  className={cn(
                    "transition-[opacity,translate] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    left ? "col-start-1 pr-7 text-right" : "col-start-2 pl-7 text-left",
                    shown
                      ? "translate-x-0 opacity-100"
                      : left
                        ? "-translate-x-4 opacity-0"
                        : "translate-x-4 opacity-0",
                  )}
                  style={{ transitionDelay: `${600 + i * 350}ms` }}
                >
                  <p className="font-display text-3xl text-title [&:lang(ne)]:text-xl">
                    {t(item.time)}
                  </p>
                  <p className="mt-1 text-lg text-fg">{t(item.title)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
