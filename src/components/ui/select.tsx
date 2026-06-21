import * as React from "react";

import { cn } from "@/lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex w-full rounded-lg border border-warm-200 bg-cream px-4 py-3 text-[15px] text-warm-900 shadow-sm transition-all appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-300",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  },
);
Select.displayName = "Select";

export { Select };
