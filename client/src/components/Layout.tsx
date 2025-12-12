import { Link, useLocation } from "wouter";
import { NeonButton } from "@/components/ui/NeonButton";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import WhatsAppWidget from "./WhatsAppWidget";
import TrustBar from "./TrustBar";

export default function Layout({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Vision" },
    { href: "/technology", label: "Technologie" },
    { href: "/concept", label: "Konzept" },
    { href: "/autokonzept", label: "Auto" },
    { href: "/lr-partner", label: "Partner" },
    { href: "/process", label: "Ablauf" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-deep-space text-white font-sans selection:bg-neon-cyan/30 selection:text-white overflow-x-hidden">
      
      <WhatsAppWidget />
      
      {/* Navigation */}
      <nav 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-deep-space/90 backdrop-blur-md border-white/10 shadow-lg shadow-neon-cyan/5 py-3" 
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 z-50">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-electric-purple/50 shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all duration-300">
              <img src="/images/logo-lr.png" alt="Lina Voice Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-xl tracking-wide text-white leading-none">
                LINA
              </span>
              <span className="font-sans text-xs tracking-[0.2em] text-neon-cyan font-bold">
                VOICE
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Flexible spacing to prevent overlap */}
          <div className="hidden lg:flex flex-1 justify-center items-center px-4">
            <div className="flex items-center gap-4 xl:gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-all duration-300 hover:text-neon-cyan relative py-1 group uppercase tracking-wide whitespace-nowrap",
                    location === link.href 
                      ? "text-neon-cyan" 
                      : "text-gray-300"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full",
                    location === link.href ? "w-full" : ""
                  )} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0 z-50">
            <div className="flex flex-col items-end hidden xl:flex">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">24/7 Support</span>
              <a href="tel:+491715060008" className="text-sm font-bold text-white hover:text-neon-cyan transition-colors font-mono">
                +49 171 5060008
              </a>
            </div>
            <NeonButton href="tel:+4951116653654" className="px-4 xl:px-6 py-2 text-xs xl:text-sm h-9 xl:h-10 min-h-0 whitespace-nowrap">
              Live Demo
            </NeonButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white hover:text-neon-cyan transition-colors z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed top-[80px] left-0 w-full bg-deep-space border-b border-white/10 shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 h-[calc(100vh-80px)] overflow-y-auto z-[60]">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-xl font-medium py-4 border-b border-white/5",
                  location === link.href ? "text-neon-cyan" : "text-gray-300"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-auto pb-8">
               <div className="flex flex-col items-center mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">24/7 Support</span>
                <a href="tel:+491715060008" className="text-lg font-bold text-white hover:text-neon-cyan transition-colors font-mono">
                  +49 171 5060008
                </a>
              </div>
              <NeonButton 
                className="w-full justify-center"
                href="tel:+491715060008"
              >
                <Phone className="w-4 h-4 mr-2" />
                Jetzt Anrufen
              </NeonButton>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative">
        {/* TrustBar integrated into flow but visually distinct */}
        <div className="pt-24 lg:pt-32">
          <TrustBar />
          {children}
        </div>
      </main>

      {/* Footer */}
      {!hideFooter && (
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/5 pt-20 pb-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-electric-purple/50 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                  <img src="/images/logo-lr.png" alt="Lina Voice Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-playfair font-bold text-xl tracking-wide text-white leading-none">
                    LINA
                  </span>
                  <span className="font-sans text-xs tracking-[0.2em] text-neon-cyan font-bold">
                    VOICE
                  </span>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-8">
                Die fortschrittlichste KI-Sprachassistentin für den deutschen Mittelstand. 
                Entwickelt für höchste Ansprüche an Datenschutz, Latenz und Zuverlässigkeit.
              </p>
              <div className="flex gap-4">
                {/* Social Icons could go here */}
              </div>
            </div>
            
            <div>
              <h4 className="font-playfair font-bold text-lg text-white mb-6">Unternehmen</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-neon-cyan transition-colors">Über Uns</Link></li>
                <li><Link href="/karriere" className="hover:text-neon-cyan transition-colors">Karriere</Link></li>
                <li><Link href="/kontakt" className="hover:text-neon-cyan transition-colors">Kontakt</Link></li>
                <li><Link href="/faq" className="hover:text-neon-cyan transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-playfair font-bold text-lg text-white mb-6">Rechtliches</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/impressum" className="hover:text-neon-cyan transition-colors">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-neon-cyan transition-colors">Datenschutz</Link></li>
                <li><Link href="/agb" className="hover:text-neon-cyan transition-colors">AGB</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025 Lina Voice AI. Alle Rechte vorbehalten.</p>
            <p className="flex items-center gap-1">
              Made with <span className="text-red-500">❤️</span> in Mallorca & Germany.
            </p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
