
interface BorderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function BorderButton({ children, onClick, className = "" }: BorderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative group px-8 py-4 bg-background text-primary font-sans font-medium uppercase tracking-widest text-sm transition-colors hover:text-primary-dark ${className}`}
    >
      <div className="absolute inset-0 border border-primary/30 group-hover:border-transparent transition-colors duration-300"></div>
      
      {/* Animated Borders */}
      <span className="absolute top-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
      <span className="absolute top-0 right-0 w-[1px] h-0 bg-primary transition-all duration-300 ease-out delay-75 group-hover:h-full"></span>
      <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out delay-150 group-hover:w-full"></span>
      <span className="absolute bottom-0 left-0 w-[1px] h-0 bg-primary transition-all duration-300 ease-out delay-200 group-hover:h-full"></span>

      <span className="relative z-10">{children}</span>
    </button>
  );
}
