"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
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
import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";
// import Image from "next/image"; // not used
import { useCategoriesStore } from "@/store/categories/CategoriesStore";
import { Spinner } from "@/components/ui/spinner";
import { usePostsStore } from "@/store/posts/PostsStore";

export default function PostForm() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    categories,
    loading: catsLoading,
    error: catsError,
    fetchCategories,
  } = useCategoriesStore();
  const { createPost } = usePostsStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
    categoryIds: [] as number[],
    published: false,
  });
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories on mount if not loaded
  useEffect(() => {
    if (!categories.length) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length]);

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
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showCategoryDropdown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setFormData((prev) => {
      const isSelected = prev.categoryIds.includes(categoryId);
      if (isSelected) {
        return {
          ...prev,
          categoryIds: prev.categoryIds.filter((id) => id !== categoryId),
        };
      } else if (prev.categoryIds.length < 3) {
        return {
          ...prev,
          categoryIds: [...prev.categoryIds, categoryId],
        };
      }
      return prev;
    });
    setShowCategoryDropdown(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    return newErrors;
  };

  // publish: true -> Publish; false -> Save as draft
  const handleSubmit = async (e: React.FormEvent | null, publish: boolean) => {
    if (e) e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        content: formData.content.trim(),
        categoryIds: formData.categoryIds,
        published: publish,
      };
      console.log(publish ? "Publishing post:" : "Saving draft:", payload);
      // Reset form
      setFormData({
        title: "",
        description: "",
        image: "",
        content: "",
        categoryIds: [],
        published: false,
      });
      router.push("/admin/posts");
    } catch (err) {
      // surface a generic error
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
        <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
        <p className="text-muted-foreground">Add a new blog post</p>
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
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How your post will look</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.image && (
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              {formData.title && (
                <h2 className="text-lg font-bold">{formData.title}</h2>
              )}
              {formData.description && (
                <p className="text-sm text-muted-foreground">
                  {formData.description}
                </p>
              )}
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat.id}
                      className="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
              {formData.content && (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{formData.content}</ReactMarkdown>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
