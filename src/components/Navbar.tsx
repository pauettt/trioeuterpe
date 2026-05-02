import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Ceremonias", path: "/ceremonias" },
    { name: "Cócteles y Aperitivos", path: "/cocteles" },
    { name: "Otros Eventos", path: "/otros-eventos" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/Logo.jpeg" alt="Logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-serif text-primary-dark">Trío Euterpe</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {links.map((link) => {
              const isHome = location.pathname === "/";
              const textColor = isActive(link.path)
                ? "text-primary font-medium"
                : isScrolled
                  ? "text-text hover:text-primary"
                  : isHome
                    ? "text-text hover:text-primary"
                    : "text-white/90 hover:text-white";

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-sans text-sm uppercase tracking-widest transition-colors ${textColor}`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <a
              href="https://wa.me/34675615089"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-sans text-xs uppercase tracking-[0.2em] px-6 py-3 border rounded-full transition-all duration-300 ${
                isScrolled || location.pathname === "/"
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white/50 text-white hover:bg-white hover:text-primary-dark"
              }`}
            >
              Contactar
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} className={!isScrolled && location.pathname !== "/" ? "text-white" : "text-text"} />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-8 right-8 text-text"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-center">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-serif text-3xl ${
                    isActive(link.path) ? "text-primary" : "text-text"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
