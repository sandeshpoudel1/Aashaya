import { useEffect, useState } from "react";
import { invitation as inv } from "@/config/invitation";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const pill = "border border-gold/50 bg-page/85 shadow-sm backdrop-blur-md";

/** Language (नेपाली / English) + light/dark switch. Used floating over the hero and inline in the closing. */
export function PrefsSwitches() {
  const { lang, setLang, t } = useLang();
  const { theme, setTheme } = useTheme();
  const themeLabel = t(theme === "light" ? inv.copy.themeDark : inv.copy.themeLight);

  return (
    <div className="flex items-center gap-2">
      <div
        role="group"
        aria-label={t(inv.copy.languageGroup)}
        className={cn("flex rounded-full p-1", pill)}
      >
        {(["ne", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={cn(
              "min-h-11 min-w-[4.25rem] rounded-full px-3 text-sm transition-colors duration-200",
              lang === l ? "bg-title text-page" : "text-title",
            )}
          >
            {l === "ne" ? "नेपाली" : "English"}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={themeLabel}
        title={themeLabel}
        className={cn(
          "grid size-12 place-items-center rounded-full text-lg leading-none text-title",
          pill,
        )}
      >
        {/* text glyphs, U+FE0E keeps the sun from turning into an emoji on iOS */}
        <span aria-hidden>{theme === "light" ? "☾" : "☀︎"}</span>
      </button>
    </div>
  );
}

/** Floats over the cover and hero only, then fades away so it never sits on top of content. */
export function PrefsBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-[70] transition-[opacity,translate] duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
      <PrefsSwitches />
    </div>
  );
}
