import { toast } from "sonner";
import { invitation as inv } from "@/config/invitation";
import { digits, useLang } from "@/lib/i18n";
import { formatAdDate } from "@/lib/invite-utils";
import { useTheme } from "@/lib/theme";
import { themed } from "./assets";
import { PrefsSwitches } from "./Controls";
import { GoldRule, Reveal, ScriptHeading } from "./Reveal";

const prettyPhone = (n: string) => `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;

export function Closing() {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const couple = `${t(inv.couple.groom.short)} & ${t(inv.couple.bride.short)}`;

  const share = async () => {
    const url = window.location.href;
    const text = `${t(inv.copy.title)}: ${couple}, ${formatAdDate(inv, lang)}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: couple, text, url });
      } catch {
        // guest closed the share sheet
      }
      return;
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
      "_blank",
      "noopener",
    );
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(t(inv.copy.linkCopied));
    } catch {
      toast.error(t(inv.copy.copyFailed));
    }
  };

  return (
    <section className="relative isolate overflow-hidden px-6 pb-[min(60vw,24rem)] pt-12 text-center sm:pt-16">
      <img
        key={theme}
        src={themed[theme].closing}
        alt=""
        loading="lazy"
        className="absolute inset-x-0 bottom-0 -z-10 h-auto w-full [mask-image:linear-gradient(to_top,#000_60%,transparent)]"
      />
      <Reveal className="mx-auto max-w-lg">
        <ScriptHeading title={t(inv.copy.closingTitle)} />
        <p className="serif-italic mt-3 text-xl leading-relaxed text-fg [&:lang(ne)]:text-lg [&:lang(ne)]:leading-[1.9]">
          {t(inv.copy.closingMessage)}
        </p>
        <div className="mt-8">
          <p className="eyebrow">{t(inv.copy.withLove)}</p>
          <p className="mt-2 font-display text-3xl text-title [&:lang(ne)]:text-2xl [&:lang(ne)]:leading-normal">
            {t(inv.letter.signature)}
          </p>
          <p className="mt-1 text-fg-muted">{t(inv.copy.familiesSign)}</p>
        </div>

        <GoldRule className="my-10" />

        <div>
          <p className="eyebrow">{t(inv.copy.questions)}</p>
          <ul className="mt-5 space-y-5">
            {inv.contacts.map((c) => (
              <li key={c.phones[0]}>
                <p className="text-fg">
                  {t(c.name)} <span className="text-fg-muted">({t(c.role)})</span>
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {c.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:+977${p}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-gold/60 bg-page/60 px-4 tabular-nums text-title transition-[transform,background-color] duration-150 hover:bg-gold/15 active:scale-[0.97]"
                    >
                      {digits(prettyPhone(p), lang)}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn-maroon" onClick={share}>
            {t(inv.copy.share)}
          </button>
          <button type="button" className="btn-outline" onClick={copy}>
            {t(inv.copy.copyLink)}
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <PrefsSwitches />
        </div>
      </Reveal>
    </section>
  );
}
