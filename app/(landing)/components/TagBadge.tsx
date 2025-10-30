"use client";
import { Badge } from "@/components/ui/badge";

export function TagBadge({ label, color }: { label: string; color: string }) {
  const colorClasses = {
    purple: "bg-purple-100 text-purple-700 hover:bg-purple-100",
    pink: "bg-pink-100 text-pink-700 hover:bg-pink-100",
    orange: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    green: "bg-green-100 text-green-700 hover:bg-green-100",
  };

  return (
    <Badge
      className={colorClasses[color as keyof typeof colorClasses]}
      variant="outline"
    >
      {label}
    </Badge>
  );
}
