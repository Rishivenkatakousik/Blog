import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/tprc/router";
import { db } from "@/server/db/client";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({ db }), // ✅ passes Drizzle instance to tRPC
  });
};

export { handler as GET, handler as POST };
