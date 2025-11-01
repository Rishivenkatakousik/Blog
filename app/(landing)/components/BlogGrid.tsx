"use client";

import { BlogPostCard } from "./BlogPostCard";
import { BlogPagination } from "./Pagination";
import { useState } from "react";
import type { ApiPost } from "@/store/posts/types";
import { CTA } from "./cta";

export function BlogGrid({
  recentPosts,
  allPosts,
}: {
  recentPosts: ApiPost[];
  allPosts: ApiPost[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(allPosts.length / postsPerPage));

  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // If there are no posts at all, show a friendly message
  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg font-medium">No posts found.</p>
        <p className="text-sm text-muted-foreground">
          Check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Recent Posts */}
      {recentPosts && recentPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Recent blog posts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <BlogPostCard post={recentPosts[0]} featured />
            </div>
            <div className="flex flex-col gap-8">
              {recentPosts[1] && (
                <BlogPostCard post={recentPosts[1]} horizontal />
              )}
              {recentPosts[2] && (
                <BlogPostCard post={recentPosts[2]} horizontal />
              )}
            </div>
          </div>
        </section>
      )}

      <CTA />

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          All blog posts
        </h2>
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No posts on this page.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <BlogPostCard key={String(post.id)} post={post} />
            ))}
          </div>
        )}

        <BlogPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
}
