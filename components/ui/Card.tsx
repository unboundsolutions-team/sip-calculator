import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export function Card({ children, className, sticky }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow",
        sticky && "sticky top-24",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl font-bold text-[#0d2338] mb-7">
      {children}
    </h2>
  );
}
