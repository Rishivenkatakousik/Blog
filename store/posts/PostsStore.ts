"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getTrpcProxy } from "@/lib/trpc/client";
import type { ApiPost } from "./types";

type CreatePostInput = {
  title: string;
  content: string;
  image?: string;
  published: boolean;
  categoryIds?: number[];
};

type UpdatePostInput = CreatePostInput & { id: number };

interface PostsState {
  posts: ApiPost[];
  recentPosts: ApiPost[];
  loading: boolean;
  error: string | null;

  fetchPosts: () => Promise<void>;
  createPost: (data: CreatePostInput) => Promise<void>;
  updatePost: (data: UpdatePostInput) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const usePostsStore = create<PostsState>()(
  devtools((set, get) => ({
    posts: [],
    recentPosts: [],
    loading: false,
    error: null,

    fetchPosts: async () => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        const all = (await trpc.posts.getAll.query()) || [];
        set({ posts: all, recentPosts: all.slice(0, 3) });
      } catch (err: any) {
        set({ error: err?.message ?? "Failed to load posts" });
      } finally {
        set({ loading: false });
      }
    },

    createPost: async (data) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        await trpc.posts.create.mutate({
          title: data.title,
          content: data.content,
          image: data.image,
          published: data.published,
          categoryIds: data.categoryIds,
        });
        await get().fetchPosts();
      } catch (err: any) {
        set({ error: err?.message ?? "Failed to create post" });
      } finally {
        set({ loading: false });
      }
    },

    updatePost: async (data) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        await trpc.posts.update.mutate({
          id: data.id,
          title: data.title,
          content: data.content,
          image: data.image,
          published: data.published,
          categoryIds: data.categoryIds,
        });
        await get().fetchPosts();
      } catch (err: any) {
        set({ error: err?.message ?? "Failed to update post" });
      } finally {
        set({ loading: false });
      }
    },

    deletePost: async (id) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        await trpc.posts.delete.mutate({ id });
        await get().fetchPosts();
      } catch (err: any) {
        set({ error: err?.message ?? "Failed to delete post" });
      } finally {
        set({ loading: false });
      }
    },
  }))
);
