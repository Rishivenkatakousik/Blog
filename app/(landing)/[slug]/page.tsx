import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

function TagBadge({ label, color }: { label: string; color: string }) {
  const colorClasses = {
    purple: "bg-purple-100 text-purple-700 hover:bg-purple-100",
    pink: "bg-pink-100 text-pink-700 hover:bg-pink-100",
    orange: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    green: "bg-green-100 text-green-700 hover:bg-green-100",
  };

  return (
    <Badge
      className={colorClasses[color as keyof typeof colorClasses]}
      variant="outline"
    >
      {label}
    </Badge>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
        >
          ← Back to all posts
        </Link>

        {/* Post Header */}
        <article>
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-medium text-gray-700">{post.author}</span> •{" "}
              {post.date}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{post.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <TagBadge key={tag.label} label={tag.label} color={tag.color} />
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 bg-gray-200">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("##")) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("###")) {
                return (
                  <h3
                    key={index}
                    className="text-xl font-semibold text-gray-900 mt-6 mb-3"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("-")) {
                const items = paragraph
                  .split("\n")
                  .filter((item) => item.startsWith("-"));
                return (
                  <ul
                    key={index}
                    className="list-disc list-inside space-y-2 mb-4"
                  >
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-700">
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                const items = paragraph
                  .split("\n")
                  .filter((item) => item.match(/^\d+\./));
                return (
                  <ol
                    key={index}
                    className="list-decimal list-inside space-y-2 mb-4"
                  >
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-700">
                        {item.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    </main>
  );
}
