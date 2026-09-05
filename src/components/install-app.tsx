import { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STR, type Lang } from "@/lib/i18n";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallApp({ lang }: { lang: Lang }) {
  const t = STR[lang];
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(display-mode: standalone)");
    const nav = window.navigator as Navigator & { standalone?: boolean };
    setStandalone(media.matches || nav.standalone === true);

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function install() {
    if (deferred) {
      await deferred.prompt();
      setDeferred(null);
      return;
    }
    window.location.assign("/?install=1&platform=android");
  }

  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <Smartphone className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-ink">{t.installTitle}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">{t.installBody}</p>
        </div>
      </div>

      {standalone ? (
        <p className="mt-4 rounded-md bg-bg px-3 py-3 text-sm text-ink-soft">{t.installed}</p>
      ) : (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button type="button" className="h-12 flex-1" onClick={() => void install()}>
            <Smartphone />
            {t.installCta}
          </Button>
          <Button type="button" variant="outline" className="h-12 flex-1" asChild>
            <a href="/?install=1&platform=android">{t.installGuide}</a>
          </Button>
        </div>
      )}

      <ol className="mt-4 space-y-2 text-sm text-ink-soft">
        <li>
          <span className="font-mono text-xs text-faint">01</span> {t.installStep1}
        </li>
        <li>
          <span className="font-mono text-xs text-faint">02</span> {t.installStep2}
        </li>
        <li>
          <span className="font-mono text-xs text-faint">03</span> {t.installStep3}
        </li>
      </ol>
    </section>
  );
}
