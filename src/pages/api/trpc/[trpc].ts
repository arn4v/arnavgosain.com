import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "~/trpc/router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
  batching: {
    enabled: true,
  },
});
