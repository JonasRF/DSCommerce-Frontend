/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const selectStyles = {
    control: (provided: any) => ({
        ...provided,
        border: "none",
        boxShadow: "none",
        "&:hover": {
            border: "none",
        },
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: "var(--dsc-color-font-placeholder)"
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: "none"
    }),
};

