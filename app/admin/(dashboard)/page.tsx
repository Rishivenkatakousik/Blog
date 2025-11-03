"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useCategoriesStore } from "@/store/categories/CategoriesStore";
import { usePostsStore } from "@/store/posts/PostsStore";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const {
    count: catCount,
    fetchCategoriesCount,
    loading: catsLoading,
  } = useCategoriesStore();
  const {
    count: postsCount,
    fetchPostsCount,
    loading: postsLoading,
  } = usePostsStore();

  useEffect(() => {
    fetchCategoriesCount();
    fetchPostsCount();
  }, [fetchCategoriesCount, fetchPostsCount]);

  const countsLoading =
    postsLoading || catsLoading || postsCount === null || catCount === null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {countsLoading ? (
                <Spinner size={20} aria-label="Loading posts count" />
              ) : (
                postsCount
              )}
            </div>
            <p className="text-xs text-muted-foreground">All posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {countsLoading ? (
                <Spinner size={20} aria-label="Loading categories count" />
              ) : (
                catCount
              )}
            </div>
            <p className="text-xs text-muted-foreground">Active categories</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
