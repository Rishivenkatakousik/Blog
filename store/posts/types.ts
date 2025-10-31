export type ApiCategory = {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ApiPostCategoryLink = {
  postId: number;
  categoryId: number;
  category: ApiCategory;
};

export type ApiPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  published: boolean | null;
  categories: ApiPostCategoryLink[];
};

// UI types (no color in tags)
export type UiTag = {
  label: string;
};

export type UiPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: UiTag[];
};

// API -> UI mapper (no color)
export function mapApiPostToUi(p: ApiPost): UiPost {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    description: p.content.slice(0, 140),
    content: p.content,
    author: "Unknown",
    date: p.createdAt ?? "",
    image: p.image ?? "/placeholder.svg",
    tags: p.categories.map((c) => ({
      label: c.category.name,
    })),
  };
}
