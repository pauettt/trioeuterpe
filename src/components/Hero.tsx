import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Hero() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => setIsScrolled(latest > 400));
  }, [scrollY]);

  return (
    <div className="relative z-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-background pt-20">
      {/* Contenedor central (Corazón + Nombre) */}
      <div className="relative flex items-center justify-center w-full max-w-2xl aspect-square mb-8">
        {/* Corazón animado de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                layoutId="animated-heart"
                className="w-full h-full flex items-center justify-center"
                initial={false}
                animate={{ color: "#991b1b", opacity: 0.15 }}
                transition={{ 
                  layout: { type: "spring", stiffness: 200, damping: 25 },
                  default: { duration: 0.3 }
                }}
              >
                <motion.svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.05, 1] }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </motion.svg>
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
          <span className="font-serif text-6xl md:text-8xl text-text tracking-normal">Euterpe</span>
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
          Ponemos música a tus momentos especiales.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-sm md:text-base text-text-muted font-sans font-light tracking-[0.2em] max-w-2xl uppercase mb-10"
        >
          Celébralo con música y será recordado para siempre
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <a
            href="/ceremonias"
            className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full font-sans tracking-widest uppercase text-xs shadow-sm hover:shadow-md"
          >
            Descubre nuestro repertorio
          </a>
        </motion.div>
      </div>
      
      {/* Gradiente sutil en la parte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
    </div>
  );
}
