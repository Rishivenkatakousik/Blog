import { initTRPC } from "@trpc/server";
import { db } from "../db/client";

const t = initTRPC
  .context<{
    db: typeof db;
  }>()
  .create();

export const router = t.router;
export const publicProcedure = t.procedure;
