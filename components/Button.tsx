import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  const variants = {
    primary: "bg-primary text-button-text",
    secondary: "bg-surface text-primary border border-primary",
    ghost: "bg-transparent text-primary",
    danger: "bg-error text-button-text",
  };

  return (
    <button
      {...props}
      className={twMerge(
        "py-sm px-lg rounded-md text-body font-body disabled:bg-primary-soft disabled:text-text-faint disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
    />
  );
}