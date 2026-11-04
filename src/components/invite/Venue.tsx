import { invitation as inv } from "@/config/invitation";
import { useLang } from "@/lib/i18n";
import { formatAdDate, formatBsDate } from "@/lib/invite-utils";
import { art } from "./assets";
import { Corners, GoldRule, Reveal } from "./Reveal";

/** Paper card crowned by a lit diyo. No map link, by request. */
export function Venue() {
  const { t, lang } = useLang();
  const primary = lang === "ne" ? formatBsDate(inv, lang) : formatAdDate(inv, lang);
  const secondary = lang === "ne" ? formatAdDate(inv, lang) : formatBsDate(inv, lang);

  return (
    <section className="px-6 pb-7 pt-14 sm:pb-10 sm:pt-16">
      <Reveal className="mx-auto max-w-md">
        <div className="paper relative px-7 pb-12 pt-20 text-center">
          <Corners />
          <img
            src={art.diyo}
            alt=""
            width={256}
            height={256}
            loading="lazy"
            className="absolute left-1/2 top-0 size-28 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_24px_rgb(227_155_45/0.45)]"
          />
          <p className="eyebrow">{t(inv.copy.ceremonyTitle)}</p>
          <p className="mt-3 font-display text-4xl leading-tight text-maroon [&:lang(ne)]:text-3xl [&:lang(ne)]:leading-normal">
            {t(inv.venue.name)}
          </p>
          <p className="mt-2 text-ink-muted">{t(inv.venue.address)}</p>
          <GoldRule className="my-8" />
          <p className="font-display text-2xl text-maroon [&:lang(ne)]:text-xl">{primary}</p>
          <p className="mt-1 text-ink-muted">
            {t(inv.wedding.weekday)} · {secondary}
          </p>
          <p className="mt-1 text-ink-muted">{t(inv.wedding.time)}</p>
        </div>
      </Reveal>
    </section>
  );
}
