import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    return scrollY.onChange((latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  return (
    <div className="relative z-0 w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-background pt-28 pb-12">
      {/* Logo animado (corazón + monograma + nombre) */}
      <div className="relative flex items-center justify-center w-full max-w-md md:max-w-lg mb-8">
        {/* Título accesible para SEO/lectores de pantalla; el logo ya muestra el nombre visualmente */}
        <h1 className="sr-only">Trío Euterpe</h1>
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              layoutId="animated-logo"
              className="w-full flex items-center justify-center"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{
                layout: { type: "spring", stiffness: 200, damping: 25 },
                default: { duration: 0.3 }
              }}
            >
              <motion.img
                src="/logo.svg"
                alt="Trío Euterpe"
                className="w-full h-auto"
                initial={{ scale: 0.85 }}
                animate={{ scale: [0.85, 1.03, 1] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Eslogan desplazado abajo */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-3xl md:text-4xl font-serif text-primary-dark tracking-wide mb-4"
        >
          {t('hero.slogan')}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-sm md:text-base text-text-muted font-sans font-light tracking-[0.2em] max-w-2xl uppercase mb-10"
        >
          {t('hero.sub_slogan')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <a
            href="/ceremonias"
            className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full font-sans tracking-widest uppercase text-xs hover:scale-105 hover:shadow-[0_0_20px_rgba(181,149,47,0.3)]"
          >
            {t('hero.cta')}
          </a>
        </motion.div>
      </div>
      
      {/* Gradiente sutil en la parte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
    </div>
  );
}
