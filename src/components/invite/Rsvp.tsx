import { useEffect, useRef, useState } from "react";
import { invitation as inv } from "@/config/invitation";
import { useLang, type Bi } from "@/lib/i18n";
import { Corners, Reveal, ScriptHeading } from "./Reveal";

const field =
  "mt-2 block w-full min-h-12 rounded-md border border-gold-ink/60 bg-paper/80 px-4 py-3 text-base text-ink outline-none transition-colors focus:border-maroon focus:ring-2 focus:ring-maroon";
const label = "block text-sm font-medium text-ink-muted";

/** Fills {placeholders} in a config template. */
const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (m, key: string) => values[key] ?? m);

export function Rsvp() {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const number = inv.rsvp.whatsapp;

  // move focus with the state change so keyboard and screen-reader guests don't land on <body>
  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  const message = () => {
    const m = inv.copy.rsvpMessage;
    const line = (b: Bi, values: Record<string, string> = {}) => fill(t(b), values);
    const couple = `${t(inv.couple.bride.short)} ${lang === "ne" ? "र" : "&"} ${t(inv.couple.groom.short)}`;
    const msg = note.trim().slice(0, 500);
    return [
      line(m.greeting, { couple }),
      line(m.name, { name: name.trim().slice(0, 100) }),
      attending ? line(m.attending) : line(m.declining),
      msg && line(m.note, { note: msg }),
    ]
      .filter(Boolean)
      .join("\n");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      nameRef.current?.focus(); // aria-describedby then reads the error
      return;
    }
    setError(false);
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message())}`,
      "_blank",
      "noopener",
    );
    setSent(true);
  };

  return (
    <section className="px-6 py-7 sm:py-10">
      <Reveal className="mx-auto max-w-lg">
        <ScriptHeading title={t(inv.copy.rsvpTitle)} />
        <div className="paper relative mt-6 px-6 py-12 sm:px-10">
          <Corners size="size-10 sm:size-12" />
          {!number ? (
            <p className="text-center text-ink-muted">{t(inv.copy.rsvpPending)}</p>
          ) : sent ? (
            <div className="text-center">
              <p
                ref={doneRef}
                tabIndex={-1}
                className="font-display text-2xl text-maroon outline-none [&:lang(ne)]:text-xl"
              >
                {t(inv.copy.replyReady)}
              </p>
              <button
                type="button"
                className="mt-7 inline-flex min-h-12 items-center rounded-full bg-maroon px-7 text-paper transition-transform duration-150 active:scale-[0.97]"
                onClick={() => setSent(false)}
              >
                {t(inv.copy.editReply)}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-6">
              <p className="text-center text-ink-muted">
                {t(inv.copy.rsvpIntro)}
                {inv.rsvp.deadline && (
                  <span className="mt-1 block text-sm">
                    {t(inv.copy.replyBy)}: {t(inv.rsvp.deadline)}
                  </span>
                )}
              </p>
              <div>
                <label htmlFor="rsvp-name" className={label}>
                  {t(inv.copy.nameLabel)}
                </label>
                <input
                  ref={nameRef}
                  id="rsvp-name"
                  value={name}
                  maxLength={100}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={error}
                  aria-describedby={error ? "rsvp-name-error" : undefined}
                  className={field}
                />
                {error && (
                  <p id="rsvp-name-error" role="alert" className="mt-2 text-sm text-sindoor">
                    {t(inv.copy.nameRequired)}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className={label}>{t(inv.copy.attendLabel)}</legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {[true, false].map((yes) => (
                    <label
                      key={String(yes)}
                      className="flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-gold-ink/70 px-3 text-center text-ink transition-colors has-checked:border-maroon has-checked:bg-maroon has-checked:text-paper has-focus-visible:ring-2 has-focus-visible:ring-maroon has-focus-visible:ring-offset-2"
                    >
                      <input
                        type="radio"
                        name="attending"
                        className="sr-only"
                        checked={attending === yes}
                        onChange={() => setAttending(yes)}
                      />
                      {t(yes ? inv.copy.accept : inv.copy.decline)}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="rsvp-note" className={label}>
                  {t(inv.copy.noteLabel)}
                </label>
                <textarea
                  id="rsvp-note"
                  rows={3}
                  maxLength={500}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={`${field} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-maroon px-7 text-paper shadow-md transition-[transform,background-color] duration-150 hover:bg-sindoor active:scale-[0.98]"
              >
                {t(inv.copy.sendReply)}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
