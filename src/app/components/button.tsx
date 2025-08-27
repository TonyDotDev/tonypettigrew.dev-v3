interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
}

const Button = ({
  children,
  className,
  variant = "contained",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "cursor-pointer rounded px-3 py-2 font-mono text-xs capitalize transition-colors inline-flex items-center justify-center gap-2";

  const variantClasses = {
    contained: "bg-primary text-primary-foreground hover:bg-primary/90",
    outlined: "border border-primary text-primary hover:bg-primary/10",
    text: "text-primary hover:bg-primary/10",
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
