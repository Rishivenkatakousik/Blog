"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getTrpcProxy } from "@/lib/trpc/client";
import type { ApiPost } from "./types";

type CreatePostInput = {
  title: string;
  content: string;
  description: string; // required by server validator
  image?: string;
  published: boolean;
  categoryIds?: number[];
};

type UpdatePostInput = CreatePostInput & { id: number };

interface PostsState {
  posts: ApiPost[];
  recentPosts: ApiPost[];
  count: number | null;
  loading: boolean;
  error: string | null;

  fetchPosts: () => Promise<ApiPost[]>;
  fetchPostsCount: () => Promise<void>;
  // fetch a single post by slug
  getBySlug: (slug: string) => Promise<ApiPost | null>;
  // fetch posts for a specific category
  getByCategory: (categoryId: number) => Promise<ApiPost[]>;
  createPost: (data: CreatePostInput) => Promise<void>;
  updatePost: (data: UpdatePostInput) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const usePostsStore = create<PostsState>()(
  devtools((set, get) => ({
    posts: [],
    recentPosts: [],
    count: null,
    loading: false,
    error: null,
    // fetch lightweight count
    fetchPostsCount: async () => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        const total = await trpc.posts.count.query();
        set({ count: total ?? 0 });
      } catch (err: any) {
        set({ error: err?.message ?? "Failed to fetch posts count" });
      } finally {
        set({ loading: false });
      }
    },
    fetchPosts: async () => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        const res = (await trpc.posts.getAll.query()) || [];

        const toIso = (d: any) =>
          d == null
            ? null
            : typeof d === "string"
            ? d
            : (d as Date).toISOString();

        const normalize = (p: any): ApiPost => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          content: p.content,
          description: p.description ?? "",
          image: p.image ?? null,
          createdAt: toIso(p.createdAt),
          updatedAt: toIso(p.updatedAt),
          published: Boolean(p.published),
          categories: p.categories ?? [],
        });

        const all = res.map(normalize);

        set({ posts: all, recentPosts: all.slice(0, 3) });

        // return normalized data so callers can await and inspect
        return all;
      } catch (err: any) {
        console.error("[PostsStore] fetchPosts error:", err);
        set({ error: err?.message ?? "Failed to load posts" });
        return [];
      } finally {
        set({ loading: false });
      }
    },

    // get single post by slug (returns normalized ApiPost or null)
    getBySlug: async (slug: string) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        const p = await trpc.posts.getBySlug.query({ slug });
        if (!p) return null;

        const toIso = (d: any) =>
          d == null
            ? null
            : typeof d === "string"
            ? d
            : (d as Date).toISOString();

        const normalized: ApiPost = {
          id: p.id,
          title: p.title,
          slug: p.slug,
          content: p.content,
          description: p.description ?? "",
          image: p.image ?? null,
          createdAt: toIso(p.createdAt),
          updatedAt: toIso(p.updatedAt),
          published: Boolean(p.published),
          categories: p.categories ?? [],
        };

        return normalized;
      } catch (err: any) {
        console.error("[PostsStore] getBySlug error:", err);
        set({ error: err?.message ?? "Failed to load post" });
        return null;
      } finally {
        set({ loading: false });
      }
    },

    // get posts by category id (returns normalized array)
    getByCategory: async (categoryId: number) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        const res =
          (await trpc.posts.getByCategory.query({ categoryId })) || [];

        const toIso = (d: any) =>
          d == null
            ? null
            : typeof d === "string"
            ? d
            : (d as Date).toISOString();

        const normalize = (p: any): ApiPost => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          content: p.content,
          description: p.description ?? "",
          image: p.image ?? null,
          createdAt: toIso(p.createdAt),
          updatedAt: toIso(p.updatedAt),
          published: Boolean(p.published),
          categories: p.categories ?? [],
        });

        const all = res.map(normalize);
        return all;
      } catch (err: any) {
        console.error("[PostsStore] getByCategory error:", err);
        set({ error: err?.message ?? "Failed to load posts by category" });
        return [];
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
          description: data.description,
          image: data.image,
          published: data.published,
          categoryIds: data.categoryIds,
        });
        await Promise.all([get().fetchPosts(), get().fetchPostsCount()]);
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
          description: data.description,
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
        await Promise.all([get().fetchPosts(), get().fetchPostsCount()]);
      } catch (err: any) {
        set({ error: err?.message ?? "Failed to delete post" });
      } finally {
        set({ loading: false });
      }
    },
  }))
);
