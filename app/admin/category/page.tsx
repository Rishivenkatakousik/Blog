"use client";

import { useState } from "react";
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

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Technology",
      description: "Latest tech trends and innovations",
    },
    {
      id: "2",
      name: "Design",
      description: "UI/UX design principles and inspiration",
    },
    {
      id: "3",
      name: "Business",
      description: "Business strategies and insights",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddCategory = (data: { name: string; description: string }) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...data,
    };
    setCategories([...categories, newCategory]);
    console.log("Category added successfully:", newCategory);
  };

  const handleEditCategory = (data: { name: string; description: string }) => {
    if (editingId) {
      const updatedCategories = categories.map((cat) =>
        cat.id === editingId ? { ...cat, ...data } : cat
      );
      setCategories(updatedCategories);
      console.log("Category updated successfully:", { id: editingId, ...data });
      setEditingId(null);
    }
  };

  const handleDeleteCategory = (id: string) => {
    const deletedCategory = categories.find((cat) => cat.id === id);
    setCategories(categories.filter((cat) => cat.id !== id));
    console.log("Category deleted:", deletedCategory);
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
        <Button onClick={() => setShowForm(true)}>Add Category</Button>
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
                      {category.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditForm(category)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
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
                  description: editingCategory.description,
                }
              : undefined
          }
          isEditing={!!editingId}
        />
      )}
    </div>
  );
}
