"use client";

import { getAllPosts, getRecentPosts } from "@/lib/data";
import { BlogGrid } from "./components/BlogGrid";

export default function BlogPage() {
  // Dummy posts from your old file
  const recentPosts = getRecentPosts();
  const allPosts = getAllPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BlogGrid recentPosts={recentPosts} allPosts={allPosts} />
      </div>
    </main>
  );
}
