import type { AppRouter } from "./router";
import { createReactQueryHooks } from "@trpc/react";

export const { useQuery, useMutation } = createReactQueryHooks<AppRouter>();
