"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TagBadge } from "./TagBadge";
import type { ApiPost } from "@/store/posts/types";

export function BlogPostCard({
  post,
  featured = false,
  horizontal = false,
}: {
  post: ApiPost;
  featured?: boolean;
  horizontal?: boolean;
}) {
  const date = post.createdAt ? new Date(post.createdAt).toLocaleString() : "";
  const imageSrc = post.image ?? "/placeholder.svg";
  const tags = (post.categories ?? []).map((c) => c.category.name);

  if (horizontal) {
    return (
      <Link href={`/${post.slug}`} className="block hover:no-underline">
        <div className="flex flex-col md:flex-row gap-4 overflow-hidden transition-shadow group">
          <div className="relative rounded-lg overflow-hidden bg-gray-200 w-full md:w-72 h-48 md:h-48 shrink-0">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between p-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-700">Author</span> •{" "}
                {date}
              </p>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                <span className="inline">{post.title}</span>
                <span className="inline-block ml-2 align-middle">
                  <ArrowUpRight className="h-4 w-4 inline-block transition" />
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {post.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((label) => (
                <TagBadge key={label} label={label} />
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
            src={imageSrc}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between py-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium text-gray-700">Author</span> • {date}
            </p>
            <h3 className="text-lg text-gray-900 font-semibold mb-2">
              <span className="inline">{post.title}</span>
              <span className="inline-block ml-2 align-middle">
                <ArrowUpRight className="h-4 w-4 inline-block transition" />
              </span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">{post.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((label) => (
              <TagBadge key={label} label={label} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
