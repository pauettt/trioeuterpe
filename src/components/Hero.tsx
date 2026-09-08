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
    <div className="relative z-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-background pt-20">
      {/* Contenedor central (Corazón + Nombre) */}
      <div className="relative flex items-center justify-center w-full max-w-2xl aspect-square mb-8">
        {/* Logo animado de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                layoutId="animated-logo"
                className="w-full h-full flex items-center justify-center"
                initial={false}
                animate={{ opacity: 0.7 }}
                transition={{
                  layout: { type: "spring", stiffness: 200, damping: 25 },
                  default: { duration: 0.3 }
                }}
              >
                <motion.img
                  src="/logo-frame.svg"
                  alt=""
                  className="w-full h-full object-contain"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.05, 1] }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nombre del Trío dentro del corazón */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative z-10 text-center flex flex-col items-center pb-12 md:pb-20"
        >
          <span className="font-serif italic text-4xl md:text-5xl text-text/70 mb-2">Trío</span>
          <span className="font-serif text-6xl md:text-8xl text-text tracking-normal mb-8">
            Euterpe
          </span>
          
          <div className="relative inline-flex items-center justify-center">
            {/* Pentagrama decorativo a través del subtítulo */}
            <div className="absolute inset-0 flex flex-col justify-between py-[2px] md:py-[3px] w-[130%] left-1/2 -translate-x-1/2 -z-10 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-gradient-to-r from-transparent via-text-muted/40 to-transparent"></div>
              ))}
            </div>
            <span className="font-sans text-[11px] md:text-[13px] tracking-[0.1em] md:tracking-[0.15em] text-text-muted uppercase whitespace-nowrap px-2">
              Violín, Violoncello y Piano
            </span>
          </div>
        </motion.h1>
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
