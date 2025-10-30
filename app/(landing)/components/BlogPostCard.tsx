"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TagBadge } from "./TagBadge";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: { label: string; color: "purple" | "pink" | "orange" | "green" }[];
}

export function BlogPostCard({
  post,
  featured = false,
  horizontal = false,
}: {
  post: BlogPost;
  featured?: boolean;
  horizontal?: boolean;
}) {
  // const postLink = post.href || `/blog/${post.id}`;

  if (horizontal) {
    return (
      <Link href={`/${post.slug}`} className="block hover:no-underline">
        <div className="flex flex-row gap-4 h-48 overflow-hidden transition-shadow group">
          <div className="relative rounded-lg overflow-hidden bg-gray-200 w-72 h-48 shrink-0">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between p-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-700">
                  {post.author || "Author"}
                </span>{" "}
                • {post.date}
              </p>
              <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-1">
                {post.title}
                <ArrowUpRight className="h-4 w-4 transition" />
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {post.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag.label} label={tag.label} color={tag.color} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/${post.slug}`} className="block hover:no-underline">
      <div className={`flex flex-col overflow-hidden transition-shadow group`}>
        <div
          className={`relative overflow-hidden bg-gray-200 rounded-lg ${
            featured ? "h-80" : "h-60"
          }`}
        >
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between py-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium text-gray-700">
                {post.author || "Author"}
              </span>{" "}
              • {post.date}
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-1">
              {post.title}
              <ArrowUpRight className="h-4 w-4 transition" />
            </h3>
            <p className="text-sm text-gray-600 mb-4">{post.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag.label} label={tag.label} color={tag.color} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
