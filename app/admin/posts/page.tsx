"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePostsStore } from "@/store/posts/PostsStore";
import { Spinner } from "@/components/ui/spinner";

export default function PostsPage() {
  const router = useRouter();
  const { posts, loading, error, fetchPosts, deletePost } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Button onClick={() => router.push("/admin/posts/create")}>
          Create Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>Your latest blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner />
              <span className="text-sm text-muted-foreground">
                Loading posts…
              </span>
            </div>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.published ? "Published" : "Draft"} ·{" "}
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/posts/${post.id}/edit`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
