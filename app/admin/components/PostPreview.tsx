"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

type Category = { id: number; name: string };

interface PostPreviewProps {
  image?: string;
  title?: string;
  description?: string;
  categories?: Category[];
  content?: string;
}

export default function PostPreview({
  image,
  title,
  description,
  categories = [],
  content,
}: PostPreviewProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>How your post will look</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {image && (
          <div className="rounded-lg overflow-hidden border">
            <img
              src={image || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-32 object-cover"
            />
          </div>
        )}

        {title && <h2 className="text-lg font-bold">{title}</h2>}

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <span key={cat.id} className="text-xs bg-muted px-2 py-1 rounded">
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {content && (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
