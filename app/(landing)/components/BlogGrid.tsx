"use client";

import { BlogPostCard } from "./BlogPostCard";
import { BlogPagination } from "./Pagination";
import { useState, useEffect, useMemo } from "react";
import type { ApiPost } from "@/store/posts/types";
import { CTA } from "./cta";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriesStore } from "@/store/categories/CategoriesStore";
import { Input } from "@/components/ui/input";

export function BlogGrid({
  recentPosts,
  allPosts,
}: {
  recentPosts: ApiPost[];
  allPosts: ApiPost[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    categories,
    fetchCategories,
    loading: catsLoading,
  } = useCategoriesStore();

  const postsPerPage = 6;

  // derive filtered posts based on search and selected category
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allPosts.filter((post) => {
      const title = (post.title ?? "").toString().toLowerCase();
      const description = (post.description ?? "").toString().toLowerCase();
      const content = (post.content ?? "").toString().toLowerCase();

      const matchesSearch =
        q === "" ||
        title.includes(q) ||
        description.includes(q) ||
        content.includes(q);

      const matchesCategory =
        !selectedCategory ||
        (post.categories ?? []).some(
          (cat) =>
            (cat?.category?.name ?? (cat as any).name) === selectedCategory
        );

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  // reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage)
  );

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories().catch((e) =>
        console.error("fetchCategories error:", e)
      );
    }
  }, [categories, fetchCategories]);

  const allCategories = (categories ?? []).map((c) => c.name).sort();

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
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            type="text"
            placeholder="Search by title, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 "
          />

          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) =>
              setSelectedCategory(value === "all" ? null : value)
            }
            name="Select category"
          >
            <SelectTrigger
              aria-label="Filter by category"
              className="w-full sm:w-48 bg-white border-gray-300 text-gray-900"
            >
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all" className="cursor-pointer">
                All Categories
              </SelectItem>
              {catsLoading ? (
                <SelectItem value="loading">Loading…</SelectItem>
              ) : (
                allCategories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="cursor-pointer"
                  >
                    {category}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
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
