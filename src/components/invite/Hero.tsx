import type { CSSProperties } from "react";
import { invitation as inv } from "@/config/invitation";
import { useLang } from "@/lib/i18n";
import { formatAdDate, formatBsDate } from "@/lib/invite-utils";
import { useTheme } from "@/lib/theme";
import { PetalRain } from "./Petals";
import { art, themed } from "./assets";

const v = (name: string, value: number) => ({ [name]: value }) as CSSProperties;

/** Each name comes into focus on its own (never letter by letter: that would break Devanagari conjuncts). */
function Name({ text, w }: { text: string; w: number }) {
  return (
    <span className="name-word" style={v("--w", w)}>
      {text}
    </span>
  );
}

export function Hero({ opened }: { opened: boolean }) {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const scene = themed[theme];
  const date = lang === "ne" ? formatBsDate(inv, lang) : formatAdDate(inv, lang);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden"
    >
      <PetalRain active={opened} />
      <div className="hero-parallax absolute inset-0 -z-20">
        <picture>
          <source media="(min-width: 768px)" srcSet={scene.heroDesktop} />
          <img
            key={theme}
            src={scene.heroMobile}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="hero-art size-full object-cover object-bottom"
          />
        </picture>
      </div>
      {/* keep the type crisp over the sky, then melt into the page */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-page/55 via-transparent via-45% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-page to-transparent" />
      {/* soft glow behind the words so they stay readable over sky and mountains */}
      <div className="pointer-events-none absolute inset-x-0 top-[8svh] -z-10 h-[62svh] bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,var(--page)_15%,transparent_72%)] opacity-80" />

      <div className="hero-text relative z-10 mx-auto flex max-w-xl flex-col items-center px-8 pb-24 pt-[14svh] text-center">
        <img
          src={art.ganesh}
          alt=""
          width={160}
          height={160}
          className="gold-art size-14"
          style={v("--i", 0)}
        />
        <p
          className="serif-italic mt-4 max-w-[19rem] text-[1.05rem] leading-snug text-fg [&:lang(ne)]:text-base"
          style={v("--i", 1)}
        >
          {t(inv.copy.blessing)}
          <br />
          {t(inv.copy.together)}
        </p>
        <h1
          id="hero-title"
          tabIndex={-1}
          className="mt-5 whitespace-nowrap font-display text-[clamp(2rem,11vw,5.5rem)] font-normal leading-[1.1] text-title outline-none [&:lang(ne)]:text-[clamp(2rem,10vw,4.5rem)] [&:lang(ne)]:leading-[1.4]"
          style={v("--i", 2)}
        >
          <Name text={t(inv.couple.bride.short)} w={0} />{" "}
          <span className="name-word px-1.5 text-[0.55em] italic text-hint" style={v("--w", 1)}>
            &amp;
          </span>{" "}
          <Name text={t(inv.couple.groom.short)} w={2} />
        </h1>
        <p
          className="serif-italic mt-5 max-w-[18rem] text-lg leading-snug text-fg [&:lang(ne)]:text-base"
          style={v("--i", 3)}
        >
          {t(inv.copy.heroLine)}
        </p>
        <p className="eyebrow mt-7" style={v("--i", 4)}>
          {date} · {t(inv.venue.address).split(",").pop()?.trim()}
        </p>
      </div>
      <a
        href="#letter"
        className="absolute inset-x-6 bottom-7 z-10 mx-auto flex w-fit flex-col items-center gap-1 rounded-full px-5 py-2 text-sm text-title focus-visible:outline-2 focus-visible:outline-gold"
      >
        <span>{t(inv.copy.scrollHint)}</span>
        <span aria-hidden className="text-2xl leading-none">
          ⌄
        </span>
      </a>
    </section>
  );
}
