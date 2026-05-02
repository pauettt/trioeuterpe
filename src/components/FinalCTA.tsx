import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-32 relative bg-primary-dark w-full overflow-hidden flex justify-center">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lines" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 40 0" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lines)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-white mb-6"
        >
          ¿Preparados para ponerle banda sonora a vuestro evento?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 font-sans text-lg mb-12 max-w-2xl mx-auto font-light"
        >
          Hablemos sin compromiso. Cuéntanos qué tenéis en mente y nosotros nos encargaremos de crear la atmósfera musical perfecta.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="https://wa.me/34675615089" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary-dark font-sans tracking-[0.2em] uppercase text-sm px-10 py-4 rounded-full hover:bg-primary hover:text-white transition-colors duration-300 shadow-xl"
          >
            Contactar Ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
}
