"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TagBadge } from "../(landing)/components/TagBadge";
import { Spinner } from "@/components/ui/spinner";
import { usePostsStore } from "@/store/posts/PostsStore";
import type { ApiPost } from "@/store/posts/types";

export default function BlogPostPageClient() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const { getBySlug, loading, fetchPosts } = usePostsStore();

  const [post, setPost] = useState<ApiPost | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      return;
    }

    (async () => {
      try {
        // try to fetch from API by slug
        const p = await getBySlug(slug);
        setPost(p);
      } catch (e) {
        console.error("getBySlug error:", e);
        setPost(null);
      }
    })();
  }, [slug, getBySlug]);

  if (loading && post === undefined) {
    return (
      <div className="py-12 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <p className="text-lg font-medium">Post not found.</p>
          <p className="text-sm text-muted-foreground">
            It may have been removed or is still loading.
          </p>
          <div className="mt-6">
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const date = post.createdAt ? new Date(post.createdAt).toLocaleString() : "";
  const imageSrc = post.image ?? "/placeholder.svg";
  const tags = (post.categories ?? []).map((c) => ({
    label: c.category.name,
    color: "purple",
  }));

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
        >
          ← Back to all posts
        </Link>

        <article>
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-medium text-gray-700">Unknown</span> •{" "}
              {date}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{post.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <TagBadge key={tag.label} label={tag.label} />
              ))}
            </div>
          </div>

          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 bg-gray-200">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("##")) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("###")) {
                return (
                  <h3
                    key={index}
                    className="text-xl font-semibold text-gray-900 mt-6 mb-3"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("-")) {
                const items = paragraph
                  .split("\n")
                  .filter((item) => item.startsWith("-"));
                return (
                  <ul
                    key={index}
                    className="list-disc list-inside space-y-2 mb-4"
                  >
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-700">
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                const items = paragraph
                  .split("\n")
                  .filter((item) => item.match(/^\d+\./));
                return (
                  <ol
                    key={index}
                    className="list-decimal list-inside space-y-2 mb-4"
                  >
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-700">
                        {item.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    </main>
  );
}
