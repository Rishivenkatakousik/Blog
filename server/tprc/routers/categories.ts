import { router, publicProcedure } from "../index";
import { z } from "zod";
import { db } from "../../db/client";
import { categories } from "../../db/schema";
import { categorySchema } from "../validators";
import { eq, sql } from "drizzle-orm";
import { slugify } from "../../utils/slugify";
import { formatError } from "../../utils/formatError";

export const categoriesRouter = router({
  create: publicProcedure.input(categorySchema).mutation(async ({ input }) => {
    try {
      const slug = slugify(input.name);
      const [category] = await db
        .insert(categories)
        .values({ ...input, slug })
        .returning();
      return category;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }),

  getAll: publicProcedure.query(async () => {
    try {
      return await db.select().from(categories);
    } catch (error) {
      throw new Error(formatError(error));
    }
  }),

  // count of categories
  count: publicProcedure.query(async () => {
    try {
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(categories);
      return Number(count);
    } catch (error) {
      throw new Error(formatError(error));
    }
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const [category] = await db
          .select()
          .from(categories)
          .where(eq(categories.slug, input.slug));
        return category;
      } catch (error) {
        throw new Error(formatError(error));
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const slug = slugify(input.name);
        const [updated] = await db
          .update(categories)
          .set({ name: input.name, description: input.description, slug })
          .where(eq(categories.id, input.id))
          .returning();
        return updated;
      } catch (error) {
        throw new Error(formatError(error));
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await db.delete(categories).where(eq(categories.id, input.id));
        return { success: true };
      } catch (error) {
        throw new Error(formatError(error));
      }
    }),
});
