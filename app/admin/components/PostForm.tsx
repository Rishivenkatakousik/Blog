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
import Image from "next/image";

// Mock categories data - replace with actual API call
const MOCK_CATEGORIES = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Business" },
  { id: 3, name: "Design" },
  { id: 4, name: "Marketing" },
  { id: 5, name: "Development" },
  { id: 6, name: "Lifestyle" },
];

export default function PostForm() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
    categoryIds: [] as number[],
  });
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(" Post Data Submitted:", {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      content: formData.content,
      categoryIds: formData.categoryIds,
      timestamp: new Date().toISOString(),
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      image: "",
      content: "",
      categoryIds: [],
    });

    // Redirect back to posts page
    router.push("/admin/posts");
  };

  const selectedCategories = MOCK_CATEGORIES.filter((cat) =>
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
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      <Image
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
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm text-left hover:bg-accent transition-colors"
                    >
                      {formData.categoryIds.length === 0
                        ? "Select categories..."
                        : `${formData.categoryIds.length} selected`}
                    </button>

                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 border border-input rounded-md bg-background shadow-lg z-10">
                        <div className="max-h-48 overflow-y-auto">
                          {MOCK_CATEGORIES.map((category) => (
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
                            className="hover:opacity-70"
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
                  <Button type="submit">Publish Post</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/posts")}
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
