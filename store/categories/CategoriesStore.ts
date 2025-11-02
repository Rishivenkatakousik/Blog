import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getTrpcProxy } from "@/lib/trpc/client";
import type { Category } from "./types";

interface CategoriesState {
  categories: Category[];
  count: number | null;
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  fetchCategoriesCount: () => Promise<void>;
  createCategory: (data: {
    name: string;
    description?: string | null;
  }) => Promise<void>;
  updateCategory: (
    id: number,
    data: { name: string; description?: string | null }
  ) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>()(
  devtools((set, get) => ({
    categories: [],
    count: null,
    loading: false,
    error: null,

    fetchCategories: async () => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        const res = await trpc.categories.getAll.query();
        set({ categories: res });
      } catch (err: any) {
        set({ error: err.message });
      } finally {
        set({ loading: false });
      }
    },

    fetchCategoriesCount: async () => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        const total = await trpc.categories.count.query();
        set({ count: total ?? 0 });
      } catch (err: any) {
        set({ error: err?.message ?? "Failed to fetch categories count" });
      } finally {
        set({ loading: false });
      }
    },

    createCategory: async (data) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        await trpc.categories.create.mutate({
          name: data.name,
          description: data.description ?? undefined,
        });
        await Promise.all([
          get().fetchCategories(),
          get().fetchCategoriesCount(),
        ]);
      } catch (err: any) {
        set({ error: err.message });
      } finally {
        set({ loading: false });
      }
    },

    updateCategory: async (id, data) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        await trpc.categories.update.mutate({
          id,
          name: data.name,
          description: data.description ?? undefined,
        });
        await get().fetchCategories();
      } catch (err: any) {
        set({ error: err.message });
      } finally {
        set({ loading: false });
      }
    },

    deleteCategory: async (id) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        await trpc.categories.delete.mutate({ id });
        await Promise.all([
          get().fetchCategories(),
          get().fetchCategoriesCount(),
        ]);
      } catch (err: any) {
        set({ error: err.message });
      } finally {
        set({ loading: false });
      }
    },
  }))
);
