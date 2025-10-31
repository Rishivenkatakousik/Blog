"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "../components/CategoryForm";
import { Trash2, Edit2 } from "lucide-react";
import { useCategoriesStore } from "@/store/categories/CategoriesStore";
import type { Category } from "@/store/categories/types";
import { Spinner } from "@/components/ui/spinner";

export default function CategoryPage() {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoriesStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddCategory = async (data: {
    name: string;
    description: string;
  }) => {
    await createCategory({
      name: data.name,
      description: data.description,
    });
    setShowForm(false);
  };

  const handleEditCategory = async (data: {
    name: string;
    description: string;
  }) => {
    if (editingId == null) return;
    await updateCategory(editingId, {
      name: data.name,
      description: data.description,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDeleteCategory = async (id: number) => {
    await deleteCategory(id);
  };

  const handleOpenEditForm = (category: Category) => {
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const editingCategory = editingId
    ? categories.find((cat) => cat.id === editingId)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your post categories</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="cursor-pointer">
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} available
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner size={16} aria-label="Loading categories" />
              Loading categories
            </div>
          )}
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No categories yet. Create one to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-start justify-between border-b pb-4 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {category.description ?? ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditForm(category)}
                      disabled={loading}
                      className="cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      disabled={loading}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <CategoryForm
          onClose={handleCloseForm}
          onSubmit={editingId ? handleEditCategory : handleAddCategory}
          initialData={
            editingCategory
              ? {
                  name: editingCategory.name,
                  description: editingCategory.description ?? "",
                }
              : undefined
          }
          isEditing={!!editingId}
        />
      )}
    </div>
  );
}
