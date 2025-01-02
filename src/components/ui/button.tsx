import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import Spinner from "./spinner";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size,
      asChild = false,
      children,
      loading,
      icon,
      endContent,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const x = e.clientX - button.getBoundingClientRect().left;
      const y = e.clientY - button.getBoundingClientRect().top;
      const ripples = document.createElement("span");

      ripples.style.cssText = `
        left: ${x}px; 
        top: ${y}px; 
        position: absolute; 
        transform: translate(-50%, -50%); 
        pointer-events: none; 
        border-radius: 50%; 
        animation: ripple .8s linear infinite; 
        transition: .5s;
        ${
          variant === "default"
            ? "background: #000000bd"
            : "background: rgba(255, 255, 255, 0.7)"
        }`;
      ripples.className = "ripple";
      button.appendChild(ripples);
      setTimeout(() => {
        ripples.remove();
      }, 800);

      if (onClick) {
        onClick(e);
      }
    };
    return (
      <Comp
      className={cn(
        "overflow-hidden relative",
        buttonVariants({ variant, size, className })
      )}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      <>{loading ? <Spinner color="secondary" size="sm" /> : children}</>
    </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
