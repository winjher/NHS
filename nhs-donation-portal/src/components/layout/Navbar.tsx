import { useState } from "react";
import { Link } from "wouter";
import { Heart, Menu, X, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl">
            <Dog className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg leading-tight md:text-xl">Northumberland</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold md:text-xs">Humane Society</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/adopt" className="text-sm font-medium hover:text-primary transition-colors">Adopt</Link>
          <Link href="/donate" className="text-sm font-medium hover:text-primary transition-colors">Capital Campaign</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/donate">
            <Button className="rounded-full gap-2 hidden md:flex" size="lg">
              <Heart className="w-4 h-4" />
              Donate Now
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className={`md:hidden ${menuOpen ? "max-h-screen" : "max-h-0"} overflow-hidden transition-all duration-300 ease-out`}>
        <div className="px-4 pb-4 space-y-3 bg-background border-t border-border/40">
          <Link
            href="/"
            className="block rounded-2xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/adopt"
            className="block rounded-2xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition"
            onClick={() => setMenuOpen(false)}
          >
            Adopt
          </Link>
          <Link
            href="/donate"
            className="block rounded-2xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition"
            onClick={() => setMenuOpen(false)}
          >
            Capital Campaign
          </Link>
          <Link href="/donate" className="block">
            <Button className="w-full justify-center rounded-full" size="lg" onClick={() => setMenuOpen(false)}>
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
