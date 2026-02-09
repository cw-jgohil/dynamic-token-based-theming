import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./client";
import type { ComponentMeta } from "./types";

const COMPONENTS_API =
    "https://6985a5b26964f10bf253f2e3.mockapi.io/components";

export const componentKeys = {
    list: ["components"] as const,
};

export function useComponents() {
    return useQuery<ComponentMeta[]>({
        queryKey: componentKeys.list,
        queryFn: () => fetcher<ComponentMeta[]>(COMPONENTS_API),
    });
}
