"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/discover", label: "Descoperă" },
  { href: "/dashboard/saved", label: "Salvate" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/resources", label: "Resurse" },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-bark-100">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-lg bg-leaf-400 flex items-center justify-center">
            <Leaf size={14} className="text-white" />
          </span>
          <span className="font-display font-extrabold text-bark-900 text-[15px] tracking-tight">
            FundLeaf
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm transition-colors",
                path.startsWith(l.href)
                  ? "bg-bark-100 text-bark-900 font-medium"
                  : "text-bark-600 hover:text-bark-900 hover:bg-bark-50"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link href="/discover" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bark-100 text-bark-600 transition-colors">
            <Search size={16} />
          </Link>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bark-100 text-bark-600 transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          <Link
            href="/auth/login"
            className="ml-1 px-3.5 py-1.5 rounded-full bg-leaf-400 text-white text-sm font-medium hover:bg-leaf-600 transition-colors"
          >
            Intră în cont
          </Link>
        </div>
      </div>
    </header>
  );
}
