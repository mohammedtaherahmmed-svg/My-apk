import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-xs font-medium tracking-wide text-muted", className)} {...props} />;
}
