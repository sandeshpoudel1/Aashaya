import { useEffect, useRef, useState } from "react";
import { invitation as inv } from "@/config/invitation";
import { useLang } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/invite-utils";
import { art } from "./assets";
import { Corners, GoldRule, Reveal, ScriptHeading } from "./Reveal";

type State = "closed" | "opening" | "open";

const OPEN_MS = 1050;

/** Painted envelope: pocket, then a flap whose back face is the lining. Opening flips the flap up. */
export function Letter() {
  const { t } = useLang();
  const [state, setState] = useState<State>("closed");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const open = () => {
    if (state !== "closed") return;
    const show = () => {
      setState("open");
      requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
    };
    if (prefersReducedMotion()) return show();
    setState("opening");
    timer.current = setTimeout(show, OPEN_MS);
  };

  return (
    <section id="letter" className="px-6 py-7 sm:py-10">
      <Reveal className="mx-auto max-w-xl text-center">
        <ScriptHeading title={t(inv.copy.letterTitle)} />

        {state !== "open" ? (
          <div className="mt-6">
            <button
              type="button"
              onClick={open}
              aria-expanded={false}
              aria-label={t(inv.copy.openLetter)}
              data-state={state}
              className="envelope relative mx-auto block aspect-[3/2] w-full max-w-md"
            >
              <img
                src={art.envelopePocket}
                alt=""
                className="envelope-body absolute inset-0 size-full drop-shadow-[0_28px_30px_rgb(0_0_0/0.55)]"
              />
              <span className="envelope-flap absolute inset-0">
                <img
                  src={art.envelopeFlap}
                  alt=""
                  className="envelope-face absolute inset-0 size-full"
                />
                <img
                  src={art.envelopeLining}
                  alt=""
                  className="envelope-face envelope-face--back absolute inset-0 size-full"
                />
              </span>
              <img
                src={art.seal}
                alt=""
                width={200}
                height={200}
                className="envelope-seal absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg sm:size-24"
              />
            </button>
            <p className="serif-italic mt-7 text-lg text-fg-muted [&:lang(ne)]:text-base">
              {t(inv.copy.openLetter)}
            </p>
          </div>
        ) : (
          <article className="paper letter-card relative mx-auto mt-6 px-8 py-9 text-center sm:px-14">
            <Corners />
            <img
              src={art.ganesh}
              alt=""
              width={160}
              height={160}
              className="on-paper mx-auto size-14"
            />
            <h3
              ref={titleRef}
              tabIndex={-1}
              className="mt-6 font-display text-2xl text-maroon outline-none [&:lang(ne)]:text-xl"
            >
              {t(inv.letter.salutation)}
            </h3>
            <div className="mt-6 space-y-4 text-[1.05rem] leading-[1.8] text-ink [&:lang(ne)]:leading-[1.95]">
              {inv.letter.paragraphs.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </div>
            <GoldRule className="mt-6" />
            <p className="mt-6 text-ink-muted">{t(inv.letter.signoff)}</p>
            <p className="mt-2 font-display text-3xl leading-snug text-sindoor [&:lang(ne)]:text-2xl [&:lang(ne)]:leading-normal">
              {t(inv.letter.signature)}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{t(inv.families.bride.home)}</p>
          </article>
        )}
      </Reveal>
    </section>
  );
}
