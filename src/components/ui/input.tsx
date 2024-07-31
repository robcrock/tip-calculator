import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, ...props }, ref) => {
    const StartIcon = startIcon;

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "peer flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-right text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
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
