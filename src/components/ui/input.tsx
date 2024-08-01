import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormField } from "./form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
      useFormField();
    const StartIcon = startIcon;

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "peer flex h-10 w-full rounded-md bg-very-light-grayish-cyan px-4 py-2 text-right text-sm text-very-dark-cyan ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "ring-error focus-visible:ring-error ring-2"
              : "focus-visible:ring-strong-cyan",
            startIcon ? "pl-8" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {StartIcon && (
          <StartIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 peer-focus:text-gray-900" />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
