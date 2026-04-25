import { cn } from "@/lib/utils";

interface StatPillProps {
  label: string;
  value: string;
  sub?: string;
  variant?: "default" | "gold" | "green" | "sky" | "blue";
  fullWidth?: boolean;
  valueSize?: "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-slate-50 border-slate-200",
  gold: "bg-[#0d2338]/5 border-[#0d2338]/10",
  green: "bg-emerald-50 border-emerald-100",
  sky: "bg-sky-50 border-sky-100",
  blue: "bg-blue-50 border-blue-100",
};

const valueColors = {
  default: "text-[#0d2338]",
  gold: "text-[#0d2338]",
  green: "text-emerald-600",
  sky: "text-[#00aeef]",
  blue: "text-blue-600",
};

const valueSizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
};

export function StatPill({
  label,
  value,
  sub,
  variant = "default",
  fullWidth = false,
  valueSize = "md",
}: StatPillProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all hover:shadow-sm",
        variantStyles[variant],
        fullWidth && "col-span-2"
      )}
    >
      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-2 font-mono">
        {label}
      </p>
      <p className={cn("font-mono font-bold leading-none", valueColors[variant], valueSizes[valueSize])}>
        {value}
      </p>
      {sub && (
        <p className="text-xs text-slate-500 mt-2 font-mono leading-relaxed">{sub}</p>
      )}
    </div>
  );
}
