import { Colors } from "../../constants/designTokens";

/**
 * SectionLabel Component
 * Branded section header with underline accent
 */
export const SectionLabel = ({ children }) => {
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 12,
                fontWeight: 700,
                color: Colors.green,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 16,
            }}
        >
            <span
                style={{
                    width: 24,
                    height: 2,
                    background: Colors.green,
                    borderRadius: 1,
                    display: "inline-block",
                }}
            />
            {children}
        </div>
    );
};
