import { useEffect, useRef } from "react";

/**
 * useReveal Hook
 * Triggers reveal animation when element enters viewport
 */
export const useReveal = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    el.classList.add("visible");
                    obs.disconnect();
                }
            },
            { threshold: 0.12 }
        );

        obs.observe(el);

        return () => obs.disconnect();
    }, []);

    return ref;
};
