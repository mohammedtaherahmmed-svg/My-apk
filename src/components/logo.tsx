import { cn } from "@/lib/utils";

export function DropMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" fill="none" aria-hidden="true" className={cn("text-accent", className)}>
      <path
        d="M16 2C16 2 6 16.2 6 24.2C6 30.1 10.5 35 16 35C21.5 35 26 30.1 26 24.2C26 16.2 16 2 16 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BrandLockup({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", inverted && "text-surface")}>
      <span
        className={cn(
          "grid size-11 place-items-center rounded-lg bg-surface shadow-[0_0_0_1px_rgba(12,18,32,0.08)]",
          inverted && "bg-white/10 shadow-none",
        )}
      >
        <DropMark className="h-6 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans text-sm font-semibold tracking-widest text-ink",
            inverted && "text-surface",
          )}
        >
          <span className="text-accent">MONO</span> CHROME
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-xs font-medium tracking-widest text-muted uppercase",
              inverted && "text-surface/70",
            )}
          >
            For IVD Solutions
          </span>
        )}
      </span>
    </div>
  );
}

export function Plaque({
  line1,
  line2,
  className,
}: {
  line1: string;
  line2: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md bg-linear-to-b from-plaque to-plaque-deep px-5 py-3 text-center",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_1px_2px_rgba(12,18,32,0.1)]",
        className,
      )}
    >
      <p className="font-display text-base italic leading-tight text-plaque-ink">{line1}</p>
      <p className="font-display text-lg italic leading-tight text-steel">{line2}</p>
    </div>
  );
}
