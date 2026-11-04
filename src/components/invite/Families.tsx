import { invitation as inv } from "@/config/invitation";
import { useLang } from "@/lib/i18n";
import { GoldRule, Reveal, ScriptHeading } from "./Reveal";

export function Families() {
  const { t, lang } = useLang();
  const people = [
    { role: inv.copy.bride, name: inv.couple.bride.name, family: inv.families.bride },
    { role: inv.copy.groom, name: inv.couple.groom.name, family: inv.families.groom },
  ] as const;
  // "…ढुंगेलकी सुपुत्री" in Nepali, "Daughter of …" in English
  const lineage = (f: (typeof people)[number]["family"]) =>
    lang === "ne" ? `${f.parents.ne}${f.relation.ne}` : `${f.relation.en} ${f.parents.en}`;

  const person = (p: (typeof people)[number]) => (
    <div className="text-center">
      <p className="eyebrow">{t(p.role)}</p>
      <p className="mt-3 font-display text-[2.6rem] leading-tight text-title [&:lang(ne)]:text-3xl [&:lang(ne)]:leading-normal">
        {t(p.name)}
      </p>
      <p className="mx-auto mt-4 max-w-[19rem] leading-relaxed text-fg-muted [&:lang(ne)]:leading-[1.9]">
        {lineage(p.family)}
      </p>
      <p className="mt-2 text-sm text-hint">{t(p.family.home)}</p>
    </div>
  );

  return (
    <section className="px-6 py-7 sm:py-10">
      <Reveal className="mx-auto max-w-5xl">
        <ScriptHeading title={t(inv.copy.familiesTitle)} />
        <div className="mt-10 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-10">
          {person(people[0])}
          <div className="flex flex-col items-center" aria-hidden>
            <GoldRule className="w-28 md:hidden" />
            <span className="my-1 font-display text-5xl italic text-gilt">&amp;</span>
            <GoldRule className="w-28 md:hidden" />
          </div>
          {person(people[1])}
        </div>
      </Reveal>
    </section>
  );
}
