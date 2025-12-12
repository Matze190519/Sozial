import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  glowColor?: string;
  children: React.ReactNode;
  href?: string;
}

export const NeonButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, NeonButtonProps>(
  ({ className, variant = "primary", glowColor = "var(--primary)", children, href, ...props }, ref) => {
    
    const baseStyles = "relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group";
    
    const variants = {
      // Enforce text-black/text-white explicitly to avoid theme variable issues
      primary: "bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_0_40px_rgba(196,155,255,0.6)] border border-white/20 backdrop-blur-md",
      secondary: "bg-gradient-to-r from-secondary to-teal-400 text-black hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] border border-white/20 backdrop-blur-md",
      outline: "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(196,155,255,0.3)] backdrop-blur-sm"
    };

    if (href) {
      return (
        <motion.a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(baseStyles, variants[variant], className, "inline-flex items-center justify-center cursor-pointer")}
          {...(props as HTMLMotionProps<"a">)}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
          </span>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseStyles, variants[variant], className, "cursor-pointer")}
        {...(props as HTMLMotionProps<"button">)}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      </motion.button>
    );
  }
);

NeonButton.displayName = "NeonButton";
