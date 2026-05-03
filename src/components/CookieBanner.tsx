import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Comprobamos si el usuario ya ha aceptado o rechazado las cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Un pequeño retraso para que no aparezca de golpe al cargar la página
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[110] p-4 sm:p-6 pointer-events-none flex justify-center"
        >
          <div className="bg-stone-900/95 backdrop-blur-md text-stone-200 p-6 rounded-2xl shadow-2xl border border-stone-800 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
            <div className="text-sm leading-relaxed text-center md:text-left">
              <h3 className="text-white font-serif text-lg mb-2">Valoramos tu privacidad</h3>
              <p className="text-stone-400">
                Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y recordar tus preferencias. 
                Puedes aceptar todas las cookies o gestionar tus preferencias.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 rounded-full border border-stone-700 text-stone-300 hover:bg-stone-800 transition-colors text-sm font-medium w-full sm:w-auto"
              >
                Solo necesarias
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 rounded-full bg-white text-stone-900 hover:bg-stone-200 transition-colors text-sm font-medium w-full sm:w-auto"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
