"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import PostForm from "@/app/admin/components/PostForm";
import { usePostsStore } from "@/store/posts/PostsStore";

export default function EditPostPage() {
  const params = useParams();
  const id = Number(params?.id);
  const { posts, loading, fetchPosts } = usePostsStore();

  useEffect(() => {
    if (!posts.length) fetchPosts();
  }, [fetchPosts, posts.length]);

  const post = useMemo(() => posts.find((p) => p.id === id), [posts, id]);

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          Post not found. Make sure it exists or reload the list.
        </p>
      </div>
    );
  }

  return <PostForm initialData={post} isEditing />;
}
