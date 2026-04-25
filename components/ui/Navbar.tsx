"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-18 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#0d2338] flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white font-black text-xs">UW</span>
          </div>
          <span className="font-sans font-black text-xl tracking-tight text-[#0d2338]">
            Unbound<span className="text-[#00aeef]">Wealth</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-bold transition-all",
                pathname === href
                  ? "bg-[#0d2338] text-white shadow-md shadow-[#0d2338]/20"
                  : "text-slate-500 hover:text-[#0d2338] hover:bg-slate-50"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
