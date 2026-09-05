import { STR, type Lang } from "@/lib/i18n";

export function SaveSheet({
  open,
  src,
  lang,
  onClose,
}: {
  open: boolean;
  src: string;
  lang: Lang;
  onClose: () => void;
}) {
  const t = STR[lang];
  if (!open || !src) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-2xl bg-surface p-5 shadow-[0_16px_48px_rgba(12,18,32,0.28)]">
        <p className="text-center text-sm leading-relaxed text-ink-soft">{t.holdToSave}</p>
        <img
          src={src}
          alt="QR"
          className="mt-4 w-full rounded-lg outline outline-1 -outline-offset-1 outline-black/10"
        />
        <button
          type="button"
          onClick={onClose}
          className="mt-4 flex h-11 w-full items-center justify-center rounded-md bg-ink text-sm font-medium text-surface"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}
