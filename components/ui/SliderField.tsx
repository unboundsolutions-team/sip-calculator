"use client";

interface SliderFieldProps {
  label: string;
  value: number;
  displayValue: string;
  min?: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  thumbColor?: "gold" | "sky";
  compact?: boolean;
}

export function SliderField({
  label,
  value,
  displayValue,
  min = 0,
  max,
  step = 1,
  onChange,
  thumbColor = "gold",
  compact = false,
}: SliderFieldProps) {
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (!isNaN(v) && v >= 0) onChange(v);
  };

  return (
    <div className={`${compact ? "mb-0" : "mb-7"} group`}>
      <div className={`flex justify-between items-baseline ${compact ? "mb-2" : "mb-3"}`}>
        <span className="text-sm font-semibold text-[#0d2338]/80 tracking-tight">{label}</span>
        <span className="font-mono text-sm font-bold text-[#0d2338] bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-right shadow-sm">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={handleSlider}
        className={thumbColor === "sky" ? "sky-thumb" : ""}
      />
      <div className={`${compact ? "mt-2" : "mt-3"} relative`}>
        <input
          type="number"
          value={value === 0 ? 0 : value || ""}
          onChange={handleInput}
          placeholder="Enter value"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl text-[#0d2338] font-mono text-sm px-4 py-2.5 outline-none focus:border-[#0d2338]/30 focus:bg-white transition-all placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
