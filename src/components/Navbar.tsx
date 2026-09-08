import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: t('navbar.inicio'), path: "/" },
    { name: t('navbar.ceremonias'), path: "/ceremonias" },
    { name: t('navbar.cocteles'), path: "/cocteles" },
    { name: t('navbar.otros_eventos'), path: "/otros-eventos" },
  ];

  const languages = [
    { code: 'es', label: 'ES' },
    { code: 'ca', label: 'CA' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const isHome = location.pathname === "/";
  const showHeartInNav = !isHome || isScrolled;
  // Solo las páginas con una imagen de héroe oscura a pantalla completa necesitan
  // texto claro en el navbar antes de hacer scroll; el resto (incluida cualquier
  // ruta futura, como la 404) tiene fondo claro y necesita texto oscuro.
  const hasDarkHero = ["/ceremonias", "/cocteles", "/otros-eventos"].includes(location.pathname);
  const useDarkText = isScrolled || !hasDarkHero;
  const textColorBase = useDarkText ? "text-text hover:text-primary" : "text-white/90 hover:text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              {showHeartInNav && (
                <motion.div
                  layoutId="animated-logo"
                  className="w-full h-full"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{
                    layout: { type: "spring", stiffness: 200, damping: 25 },
                    default: { duration: 0.3 }
                  }}
                >
                  <img src="/favicon.svg" alt="" className="w-full h-full object-contain" />
                </motion.div>
              )}
            </div>
            <span className={`text-2xl font-serif ${useDarkText ? "text-primary-dark" : "text-white"}`}>Trío Euterpe</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {links.map((link) => {
              const textColor = isActive(link.path) ? "text-primary font-medium" : textColorBase;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative group font-sans text-sm uppercase tracking-widest transition-colors ${textColor} py-2`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-current transform origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${isActive(link.path) ? "scale-x-100" : ""}`} />
                </Link>
              );
            })}
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                aria-label={t('navbar.select_language')}
                aria-haspopup="true"
                aria-expanded={isLangMenuOpen}
                className={`flex items-center gap-1 font-sans text-sm uppercase tracking-widest transition-colors ${textColorBase}`}
              >
                <Globe size={16} />
                {i18n.language.substring(0, 2).toUpperCase()}
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[80px] z-50 flex flex-col"
                  >
                    {languages.map((lng) => (
                      <button
                        key={lng.code}
                        onClick={() => changeLanguage(lng.code)}
                        className={`px-4 py-2 text-sm font-sans tracking-widest hover:bg-primary/5 hover:text-primary transition-colors ${i18n.language.startsWith(lng.code) ? 'text-primary font-medium' : 'text-text-muted'}`}
                      >
                        {lng.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="https://wa.me/34675615089"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-sans text-xs uppercase tracking-[0.2em] px-6 py-3 border rounded-full transition-all duration-300 ${
                useDarkText
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white/50 text-white hover:bg-white hover:text-primary-dark"
              }`}
            >
              {t('navbar.contactar')}
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(true)}
            aria-label={t('navbar.open_menu')}
            aria-expanded={isMenuOpen}
          >
            <Menu size={28} className={useDarkText ? "text-text" : "text-white"} />
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
              aria-label={t('navbar.close_menu')}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-center items-center">
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
              
              {/* Mobile Language Selector */}
              <div className="flex gap-4 mt-4">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => { changeLanguage(lng.code); setIsMenuOpen(false); }}
                    className={`text-lg font-sans tracking-widest ${i18n.language.startsWith(lng.code) ? 'text-primary font-bold' : 'text-text-muted'}`}
                  >
                    {lng.label}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
