"use client";

import { useEffect, useState } from "react";
import { BlogGrid } from "./components/BlogGrid";
import { usePostsStore } from "@/store/posts/PostsStore";
import { Spinner } from "@/components/ui/spinner";

export default function BlogPage() {
  const { posts, recentPosts, loading, fetchPosts, error } = usePostsStore();
  const [fetchedPosts, setFetchedPosts] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchPosts();
        setFetchedPosts(res ?? []);
      } catch (e) {
        console.error("fetchPosts error:", e);
      }
    })();
  }, [fetchPosts]);

  // derive recent + all (exclude top 3) from fetchedPosts or fallback to store
  const uiRecent = fetchedPosts ? fetchedPosts.slice(0, 3) : recentPosts;
  const uiAll = fetchedPosts ? fetchedPosts.slice(3) : posts.slice(3);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading && (fetchedPosts === null || fetchedPosts.length === 0) ? (
          <div className="flex items-center justify-center py-24">
            <Spinner size={36} aria-label="Loading posts" />
          </div>
        ) : (
          <BlogGrid recentPosts={uiRecent} allPosts={uiAll} />
        )}
      </div>
    </main>
  );
}
