"use client";

import { BlogPostCard } from "./BlogPostCard";
import { BlogPagination } from "./Pagination";
import { useState } from "react";

export function BlogGrid({
  recentPosts,
  allPosts,
}: {
  recentPosts: any[];
  allPosts: any[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <>
      {/* Recent Posts */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Recent blog posts
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <BlogPostCard post={recentPosts[0]} featured />
          </div>
          <div className="flex flex-col gap-8">
            <BlogPostCard post={recentPosts[1]} horizontal />
            <BlogPostCard post={recentPosts[2]} horizontal />
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          All blog posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <BlogPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
}
