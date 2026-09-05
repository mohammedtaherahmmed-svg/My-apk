import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm leading-relaxed text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-faint focus-visible:border-steel/40 focus-visible:ring-2 focus-visible:ring-accent/20",
        className,
      )}
      {...props}
    />
  );
}
