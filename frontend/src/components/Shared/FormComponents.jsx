import { Colors } from "../../constants/designTokens";

/**
 * FormRow Component
 * Grid wrapper for form fields
 */
export const FormRow = ({ children }) => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {children}
        </div>
    );
};

/**
 * FormField Component
 * Form field wrapper with label
 */
export const FormField = ({ label, children }) => {
    return (
        <div>
            <label
                style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: Colors.muted,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    marginBottom: 8,
                }}
            >
                {label}
            </label>
            {children}
        </div>
    );
};
