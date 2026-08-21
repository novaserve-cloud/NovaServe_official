import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, children, ...props }, ref) => {
  const content = children || text;

  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-gray-300 dark:border-[#2C2648] bg-white dark:bg-[#12101F] text-gray-900 dark:text-white px-6 py-2.5 text-center font-bold text-sm shadow-xs transition-all duration-300 hover:border-[#FFB020] cursor-pointer select-none",
        className,
      )}
      {...props}
    >
      <span className="inline-flex items-center pl-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {content}
      </span>

      <div className="absolute inset-0 z-10 flex h-full w-full translate-x-8 items-center justify-center gap-1.5 text-black font-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{content}</span>
        <ArrowRight className="w-4 h-4" />
      </div>

      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#FFB020] transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:translate-y-0 group-hover:h-full group-hover:w-full group-hover:rounded-full group-hover:bg-[#FFB020] pointer-events-none" />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };

