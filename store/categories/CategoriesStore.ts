import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getTrpcProxy } from "@/lib/trpc/client";
import type { Category } from "./types";

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  createCategory: (data: Omit<Category, "id" | "slug">) => Promise<void>;
  updateCategory: (id: number, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>()(
  devtools((set, get) => ({
    categories: [],
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

    createCategory: async (data) => {
      try {
        set({ loading: true, error: null });
        const trpc = getTrpcProxy();
        await trpc.categories.create.mutate({
          name: data.name,
          description: data.description || "",
        });
        await get().fetchCategories();
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
          name: data.name ?? "",
          description: data.description ?? "",
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
        await get().fetchCategories();
      } catch (err: any) {
        set({ error: err.message });
      } finally {
        set({ loading: false });
      }
    },
  }))
);
