import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "./client";
import type { Theme, CreateThemeDto, UpdateThemeDto } from "./types";

const THEMES_API = "https://6985a5b26964f10bf253f2e3.mockapi.io/themes";

export const themeKeys = {
    all: ["themes"] as const,
    list: () => [...themeKeys.all, "list"] as const,
    detail: (id: string) => [...themeKeys.all, "detail", id] as const,
};

// GET all themes
export function useThemes() {
    return useQuery<Theme[]>({
        queryKey: themeKeys.list(),
        queryFn: () => fetcher<Theme[]>(THEMES_API),
    });
}

// GET single theme by ID
export function useTheme(id: string) {
    return useQuery<Theme>({
        queryKey: themeKeys.detail(id),
        queryFn: () => fetcher<Theme>(`${THEMES_API}/${id}`),
        enabled: !!id,
    });
}

// POST - Create new theme
export function useCreateTheme() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (theme: CreateThemeDto) => {
            const response = await fetch(THEMES_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(theme),
            });

            if (!response.ok) {
                throw new Error(`Failed to create theme: ${response.status}`);
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: themeKeys.list() });
        },
    });
}

// PUT - Update theme
export function useUpdateTheme() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateThemeDto }) => {
            const response = await fetch(`${THEMES_API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Failed to update theme: ${response.status}`);
            }

            return response.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: themeKeys.list() });
            queryClient.invalidateQueries({ queryKey: themeKeys.detail(variables.id) });
        },
    });
}

// DELETE - Delete theme
export function useDeleteTheme() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${THEMES_API}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete theme: ${response.status}`);
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: themeKeys.list() });
        },
    });
}
