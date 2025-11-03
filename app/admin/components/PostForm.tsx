"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useCategoriesStore } from "@/store/categories/CategoriesStore";
import { Spinner } from "@/components/ui/spinner";
import { usePostsStore } from "@/store/posts/PostsStore";
import type { ApiPost } from "@/store/posts/types";
import PostPreview from "./PostPreview";
import { postSchema } from "@/server/tprc/validators";
import { ZodError } from "zod";

interface PostFormProps {
  initialData?: ApiPost;
  isEditing?: boolean;
}

export default function PostForm({
  initialData,
  isEditing = false,
}: PostFormProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const {
    categories,
    loading: catsLoading,
    fetchCategories,
  } = useCategoriesStore();
  const { createPost, updatePost } = usePostsStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
    categoryIds: [] as number[],
    published: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories on mount if not loaded
  useEffect(() => {
    if (!categories.length) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length]);

  // populate when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        image: initialData.image ?? "",
        content: initialData.content ?? "",
        categoryIds: (initialData.categories ?? []).map(
          (c) => c.categoryId ?? c.category.id ?? 0
        ),
        published: Boolean(initialData.published),
      });
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    };
    if (showCategoryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showCategoryDropdown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCategoryToggle = (categoryId: number) => {
    setFormData((prev) => {
      const isSelected = prev.categoryIds.includes(categoryId);
      if (isSelected)
        return {
          ...prev,
          categoryIds: prev.categoryIds.filter((id) => id !== categoryId),
        };
      if (prev.categoryIds.length >= 3) return prev;
      return { ...prev, categoryIds: [...prev.categoryIds, categoryId] };
    });
    setShowCategoryDropdown(false);
  };

  const validateForm = () => {
    try {
      // validate with zod (will throw if invalid)
      postSchema.parse({
        title: formData.title,
        content: formData.content,
        description: formData.description,
        image: formData.image || undefined,
        published: formData.published,
        categoryIds: formData.categoryIds,
      });
      return {};
    } catch (err) {
      const newErrors: Record<string, string> = {};
      if (err instanceof ZodError) {
        for (const issue of err.issues) {
          const key = String(issue.path[0] ?? "root");
          // prefer first error message per field
          if (!newErrors[key]) newErrors[key] = issue.message;
        }
      } else {
        newErrors.root = "Validation failed";
      }
      return newErrors;
    }
  };

  const handleSubmit = async (e: React.FormEvent | null, publish: boolean) => {
    if (e) e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      if (isEditing && initialData) {
        await updatePost({
          id: initialData.id,
          title: formData.title.trim(),
          content: formData.content.trim(),
          description: formData.description.trim(),
          image: formData.image.trim(),
          published: publish,
          categoryIds: formData.categoryIds,
        });
      } else {
        await createPost({
          title: formData.title.trim(),
          content: formData.content.trim(),
          description: formData.description.trim(),
          image: formData.image.trim(),
          published: publish,
          categoryIds: formData.categoryIds,
        });
      }

      // Reset form after successful create
      setFormData({
        title: "",
        description: "",
        image: "",
        content: "",
        categoryIds: [],
        published: false,
      });

      // navigate back to posts list
      router.push("/admin/posts");
    } catch (err) {
      // In case createPost throws in future or network error
      setErrors((prev) => ({ ...prev, root: "Failed to save post" }));
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCategories = categories.filter((cat) =>
    formData.categoryIds.includes(cat.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Post" : "Create Post"}
        </h1>
        <p className="text-muted-foreground">Add or update a blog post</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>
                Fill in the post information below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => handleSubmit(e, true)}
                className="space-y-6"
              >
                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter post description (short summary)"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="image"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                    className={errors.image ? "border-red-500" : ""}
                  />
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image}</p>
                  )}
                  {formData.image && (
                    <div className="mt-2 rounded-lg overflow-hidden border">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content (Markdown)
                  </label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Enter post content in markdown format..."
                    value={formData.content}
                    onChange={handleChange}
                    rows={10}
                    className={errors.content ? "border-red-500" : ""}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500">{errors.content}</p>
                  )}
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Categories (Max 3)
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setShowCategoryDropdown(!showCategoryDropdown)
                      }
                      disabled={catsLoading}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm text-left hover:bg-accent transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {catsLoading ? (
                        <span className="inline-flex items-center gap-2">
                          <Spinner size={16} aria-label="Loading categories" />
                          Loading categories…
                        </span>
                      ) : formData.categoryIds.length === 0 ? (
                        "Select categories..."
                      ) : (
                        `${formData.categoryIds.length} selected`
                      )}
                    </button>
                    {showCategoryDropdown && !catsLoading && (
                      <div className="absolute top-full left-0 right-0 mt-1 border border-input rounded-md bg-background shadow-lg z-10">
                        <div className="max-h-48 overflow-y-auto">
                          {categories.map((category) => (
                            <label
                              key={category.id}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-accent cursor-pointer border-b last:border-b-0"
                            >
                              <input
                                type="checkbox"
                                checked={formData.categoryIds.includes(
                                  category.id
                                )}
                                onChange={() =>
                                  handleCategoryToggle(category.id)
                                }
                                disabled={
                                  formData.categoryIds.length >= 3 &&
                                  !formData.categoryIds.includes(category.id)
                                }
                                className="rounded"
                              />
                              <span className="text-sm">{category.name}</span>
                            </label>
                          ))}
                          {categories.length === 0 && !catsLoading && (
                            <div className="px-3 py-2 text-sm text-muted-foreground">
                              No categories found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Selected categories display */}
                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCategories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm"
                        >
                          <span>{category.name}</span>
                          <button
                            type="button"
                            onClick={() => handleCategoryToggle(category.id)}
                            className="hover:opacity-70 cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSubmit(null, false)}
                    className="cursor-pointer"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Spinner size={16} />
                        Saving…
                      </span>
                    ) : (
                      "Save Draft"
                    )}
                  </Button>
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Spinner size={16} />
                        Publishing…
                      </span>
                    ) : (
                      "Publish Post"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/posts")}
                    className="cursor-pointer"
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>

                {errors.root && (
                  <p className="text-sm text-red-600 mt-2">{errors.root}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <PostPreview
            image={formData.image}
            title={formData.title}
            description={formData.description}
            categories={selectedCategories}
            content={formData.content}
          />
        </div>
      </div>
    </div>
  );
}
