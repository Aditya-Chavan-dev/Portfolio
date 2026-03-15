import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', children, ...props }, ref) => {
    
    // Base classes follow Design System font rules
    const baseClasses = "font-mono text-[11px] font-normal tracking-[0.10em] uppercase rounded-sm cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed";
    
    // Variant-specific classes
    const variants = {
      primary: "text-bg-primary bg-accent border border-accent px-5 py-2.5 transition-all duration-150 ease-std hover:bg-accent-muted hover:border-accent-muted hover:-translate-y-px hover:shadow-accent active:scale-97 active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-3",
      secondary: "text-text-secondary bg-transparent border border-border px-5 py-2.5 transition-all duration-150 hover:text-accent hover:border-border-accent hover:bg-accent-faint hover:-translate-y-px active:scale-97 active:translate-y-0",
      ghost: "text-text-muted bg-transparent border-none py-2 gap-[6px] relative transition-all duration-150 hover:text-text-primary hover:gap-[10px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 after:ease-expo hover:after:w-full inline-flex items-center",
      icon: "w-9 h-9 flex items-center justify-center rounded-[6px] bg-transparent border border-border text-[14px] text-text-secondary transition-all duration-150 hover:bg-accent-faint hover:border-border-accent hover:scale-108 hover:text-accent active:scale-94"
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
