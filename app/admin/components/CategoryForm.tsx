"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { categorySchema } from "@/server/tprc/validators";

interface CategoryFormProps {
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
  initialData?: { name: string; description: string };
  isEditing?: boolean;
}

export function CategoryForm({
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}: CategoryFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );

  // Use Zod for client-side validation
  const runValidation = (data: { name: string; description: string }) => {
    const result = categorySchema.safeParse({
      name: data.name,
      description: data.description || undefined,
    });

    if (!result.success) {
      const flattened = result.error.flatten().fieldErrors;
      setErrors({
        name: flattened.name?.[0],
        description: flattened.description?.[0],
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: name.trim(),
      description: description.trim(),
    };

    if (!runValidation(formData)) {
      return;
    }

    // Log data to console
    console.log(
      isEditing ? "Updating category:" : "Creating category:",
      formData
    );

    onSubmit(formData);
    setName("");
    setDescription("");
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>
              {isEditing ? "Edit Category" : "Add New Category"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Update category details"
                : "Create a new category for your posts"}
            </CardDescription>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Technology"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe this category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">
                {isEditing ? "Update" : "Create"} Category
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
