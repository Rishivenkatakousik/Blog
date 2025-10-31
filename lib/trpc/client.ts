import { createTRPCReact } from "@trpc/react-query";
import {
  createTRPCProxyClient,
  httpBatchLink,
  type TRPCClient,
} from "@trpc/client";
import { AppRouter } from "@/server/tprc/router";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});

// Replace the old exported instance with a lazy singleton getter
let _proxy: TRPCClient<AppRouter> | null = null;

export function getTrpcProxy() {
  if (!_proxy) {
    _proxy = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    });
  }
  return _proxy;
}
