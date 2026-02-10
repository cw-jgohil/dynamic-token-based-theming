import { useRef, useEffect } from "react";

export function useDebounce() {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debounce = (fn: () => void, delay: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            fn();
        }, delay);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debounce;
}
