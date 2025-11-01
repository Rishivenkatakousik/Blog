"use client";
import { Badge } from "@/components/ui/badge";

export function TagBadge({ label }: { label: string }) {
  const categoryColorClasses: Record<string, string> = {
    Fashion: "bg-pink-100 text-pink-700 hover:bg-pink-200",
    Food: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    Design: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    Research: "bg-green-100 text-green-700 hover:bg-green-200",
    Presentation: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    Software: "bg-teal-100 text-teal-700 hover:bg-teal-200",
    Podcasts: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    Leadership: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    Management: "bg-red-100 text-red-700 hover:bg-red-200",
    Frameworks: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200",
  };

  const className =
    categoryColorClasses[label] ??
    "bg-purple-100 text-purple-700 hover:bg-purple-200";

  return (
    <Badge className={className} variant="outline">
      {label}
    </Badge>
  );
}
