interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  glass = false,
  gradient = false,
  ...props
}: CardProps) {
  const baseClasses = `rounded-[2rem] border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`;
  const bgClasses = glass
    ? "glass"
    : gradient
      ? "bg-gradient-to-br from-white/80 to-cream-50/50"
      : "bg-white/70";
  const borderClasses = glass ? "border-white/40" : "border-cream-200/60";
  const hoverClasses = hover ? "hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold-100/30 hover:border-gold-200/50" : "";

  return (
    <div className={`${baseClasses} ${bgClasses} ${borderClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}
