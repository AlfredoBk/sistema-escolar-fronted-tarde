import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
  label?: string;
  caption?: string;
  error?: string;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  variant?:
    | "default"
    | "rounded"
    | "textArea"
    | "select"
    | "radioButton"
    | "selectButton";
}

export default function Input({
  id,
  label,
  caption,
  error,
  required = false,
  variant = "default",
  wrapperClassName,
  labelClassName,
  ...props
}: Props) {
  return (
    <div className={twMerge("flex flex-col", wrapperClassName)}>
      <label
        htmlFor={id}
        className={twMerge(
          "text-text text-label font-label flex gap-1",
          labelClassName,
        )}
      >
        {label} {required && <p className="text-error">*</p>}
      </label>
      <input
        id={id}
        {...props}
        className={twMerge(
          "p-sm bg-surface border border-border-strong rounded-sm text-data text-text font-data placeholder:text-text-muted focus:border-primary focus:outline-none focus:shadow-[0px_0px_4px_2px_rgb(0_0_0/50%)]",
          variant === "rounded" && "rounded-full",
          error && "border-error",
        )}
      />
      {(error || caption) && (
        <p
          className={twMerge(
            "text-text text-caption font-caption",
            error && "text-error",
          )}
        >
          {error || caption}
        </p>
      )}
    </div>
  );
}