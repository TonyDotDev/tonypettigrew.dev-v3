import { forwardRef } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

type Size =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

type TypographyColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "error";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  color?: TypographyColor;
  size?: Size;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-3xl sm:text-4xl font-bold",
  h2: "text-xl sm:text-2xl font-semibold",
  h3: "text-lg sm:text-xl font-semibold",
  h4: "text-base sm:text-lg font-medium",
  h5: "text-sm sm:text-base font-medium",
  h6: "text-xs sm:text-sm font-medium",
  p: "text-sm sm:text-base leading-relaxed",
  span: "text-xs sm:text-sm",
  div: "text-sm sm:text-base",
};

const colorStyles: Record<TypographyColor, string> = {
  primary: "text-foreground-primary",
  secondary: "text-foreground-secondary",
  tertiary: "text-foreground-tertiary",
  quaternary: "text-foreground-quaternary",
  error: "text-error",
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      variant,
      children,
      className = "",
      color = "primary",
      size,
      ...props
    },
    ref,
  ) => {
    const Component = as || variant;
    const baseStyles = variantStyles[variant];
    const colorStyle = colorStyles[color];

    // If size prop is provided, override the variant's text size
    const textSizeClass = size ? `text-${size}` : "";
    const baseStylesWithoutSize = baseStyles.replace(/text-\w+/g, "").trim();
    const combinedClassName = size
      ? `${baseStylesWithoutSize} ${colorStyle} ${textSizeClass} ${className}`.trim()
      : `${baseStyles} ${colorStyle} ${className}`.trim();

    return (
      <Component ref={ref} className={combinedClassName} {...props}>
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";
