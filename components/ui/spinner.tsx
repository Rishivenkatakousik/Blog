import { Loader2 } from "lucide-react";

type SpinnerProps = {
  size?: number;
  className?: string;
  "aria-label"?: string;
};

export function Spinner({ size = 18, className = "", ...rest }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={`animate-spin text-muted-foreground ${className}`}
      aria-live="polite"
      {...rest}
    />
  );
}
