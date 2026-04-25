interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <article
      className={`border border-white/5 bg-dark-50 p-6 rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300 ${className || ""}`}
    >
      {children}
    </article>
  );
}
