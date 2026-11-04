import { Fragment, useEffect, useState } from "react";
import { invitation as inv } from "@/config/invitation";
import { digits, useLang } from "@/lib/i18n";
import { timeLeft } from "@/lib/invite-utils";
import { GoldRule, Reveal } from "./Reveal";

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

/** Numbers update instantly: a per-second animation would be the most repeated motion on the page. */
export function Countdown() {
  const { t, lang } = useLang();
  const target = new Date(inv.wedding.startsAt).getTime();
  const [now, setNow] = useState<number | null>(null); // null until mounted, keeps SSR and hydration identical

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    const onVisible = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const left = timeLeft(target, now ?? 0);
  // "today" during the wedding day, a thank-you once it is over
  const over = now !== null && now - target > 864e5;

  return (
    <section className="px-6 py-7 sm:py-10">
      <Reveal className="mx-auto max-w-2xl text-center">
        <GoldRule />
        <p className="serif-italic mt-6 text-2xl text-title [&:lang(ne)]:text-xl">
          {t(inv.copy.countdownTitle)}
        </p>
        {now !== null && left.done ? (
          <p className="mt-6 font-display text-3xl text-title [&:lang(ne)]:text-2xl">
            {t(over ? inv.copy.finished : inv.copy.started)}
          </p>
        ) : (
          <div className="mx-auto mt-6 grid max-w-md grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start">
            {UNITS.map((u, i) => (
              <Fragment key={u}>
                {i > 0 && (
                  <span
                    className="count-num pt-1 text-[clamp(2rem,9vw,3.5rem)] text-gilt"
                    aria-hidden
                  >
                    :
                  </span>
                )}
                <div className="flex min-w-0 flex-col items-center gap-2">
                  <span className="count-num text-[clamp(2.4rem,11vw,4.25rem)] text-title">
                    {now === null ? "--" : digits(String(left[u]).padStart(2, "0"), lang)}
                  </span>
                  <span className="eyebrow text-[0.7rem] tracking-[0.12em] [&:lang(ne)]:text-sm">
                    {t(inv.copy[u])}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
