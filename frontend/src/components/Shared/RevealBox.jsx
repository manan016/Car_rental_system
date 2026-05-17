import { useReveal } from "../../hooks/useReveal";

/**
 * RevealBox Component
 * Wrapper that reveals content on viewport intersection
 */
export const RevealBox = ({ children, style, className = "" }) => {
    const ref = useReveal();
    return (
        <div ref={ref} className={`reveal ${className}`} style={style}>
            {children}
        </div>
    );
};
