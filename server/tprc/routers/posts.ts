import { router, publicProcedure } from "../index";
import { z } from "zod";
import { db } from "../../db/client";
import { posts, postCategories } from "../../db/schema";
import { postSchema } from "../validators";
import { eq } from "drizzle-orm";
import { slugify } from "../../utils/slugify";
import { formatError } from "../../utils/formatError";

export const postsRouter = router({
  create: publicProcedure.input(postSchema).mutation(async ({ input }) => {
    try {
      const slug = slugify(input.title);
      const [post] = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          image: input.image,
          published: input.published,
          slug,
        })
        .returning();

      if (input.categoryIds?.length) {
        const links = input.categoryIds.map((categoryId) => ({
          postId: post.id,
          categoryId,
        }));
        await db.insert(postCategories).values(links);
      }

      return post;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }),

  getAll: publicProcedure.query(async () => {
    try {
      const result = await db.query.posts.findMany({
        with: {
          categories: {
            with: { category: true },
          },
        },
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      });
      return result;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const result = await db.query.posts.findFirst({
          where: (posts, { eq }) => eq(posts.slug, input.slug),
          with: {
            categories: {
              with: { category: true },
            },
          },
        });
        return result;
      } catch (error) {
        throw new Error(formatError(error));
      }
    }),

  getByCategory: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input }) => {
      try {
        const result = await db
          .select()
          .from(posts)
          .innerJoin(postCategories, eq(posts.id, postCategories.postId))
          .where(eq(postCategories.categoryId, input.categoryId));
        return result;
      } catch (error) {
        throw new Error(formatError(error));
      }
    }),

  update: publicProcedure
    .input(postSchema.extend({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const slug = slugify(input.title);
        const [updated] = await db
          .update(posts)
          .set({
            title: input.title,
            content: input.content,
            image: input.image,
            published: input.published,
            slug,
          })
          .where(eq(posts.id, input.id))
          .returning();

        if (input.categoryIds) {
          await db
            .delete(postCategories)
            .where(eq(postCategories.postId, input.id));
          const links = input.categoryIds.map((cid) => ({
            postId: input.id,
            categoryId: cid,
          }));
          await db.insert(postCategories).values(links);
        }

        return updated;
      } catch (error) {
        throw new Error(formatError(error));
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await db.delete(posts).where(eq(posts.id, input.id));
        return { success: true };
      } catch (error) {
        throw new Error(formatError(error));
      }
    }),
});
