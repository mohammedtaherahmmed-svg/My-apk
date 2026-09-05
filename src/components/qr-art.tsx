import { useEffect, useState } from "react";
import { drawQr, type QrDrawOptions } from "@/lib/qr";
import { cn } from "@/lib/utils";

export function QrArt({
  payload,
  color,
  logo,
  size = 320,
  className,
  caption,
}: {
  payload: string;
  color: QrDrawOptions["color"];
  logo: boolean;
  size?: number;
  className?: string;
  caption?: string;
}) {
  const [src, setSrc] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!payload) {
      setSrc("");
      return;
    }
    let cancelled = false;
    setFailed(false);
    const canvas = document.createElement("canvas");
    void drawQr(canvas, payload, { color, logo, size })
      .then(() => {
        if (!cancelled) setSrc(canvas.toDataURL("image/png"));
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          setSrc("");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [payload, color, logo, size]);

  return (
    <figure dir="ltr" className={cn("flex flex-col items-center gap-2", className)}>
      <div className="w-full max-w-xs rounded-xl bg-surface p-2.5 shadow-[0_0_0_1px_rgba(12,18,32,0.08),0_12px_32px_rgba(12,18,32,0.06)]">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-2">
          {src ? (
            <img
              src={src}
              alt={caption || "QR"}
              className="block size-full rounded-md outline outline-1 -outline-offset-1 outline-black/10"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-xs text-faint">
              {failed ? "—" : "QR"}
            </div>
          )}
        </div>
      </div>
      {caption ? (
        <figcaption className="text-center text-xs tracking-widest text-muted uppercase">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
