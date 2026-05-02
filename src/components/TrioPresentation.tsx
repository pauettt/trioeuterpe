import { motion } from "framer-motion";

export function TrioPresentation() {
  return (
    <section className="py-24 bg-surface w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/Los 3/Los tres estudio.JPG" 
                alt="Trio Euterpe" 
                className="absolute inset-0 w-full h-full object-cover object-[75%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-white/90 font-serif text-2xl">Elegancia, Pasión, Excelencia</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white p-8 md:p-12 rounded-2xl border border-primary/20 shadow-sm relative">
              {/* Adornos decorativos de marco en las esquinas */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/40"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/40"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-primary/40"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/40"></div>
              
              <h2 className="text-sm font-sans tracking-[0.3em] text-primary uppercase mb-4 text-center">Conócenos</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-text mb-8 leading-tight text-center">
                La excelencia musical al servicio de tus emociones
              </h3>
              
              <div className="space-y-6 text-text-muted font-sans text-base font-light leading-relaxed">
                <p>
                  Somos Trio Euterpe, una formación de cámara compuesta por músicos profesionales con amplia trayectoria y formación en los conservatorios más prestigiosos.
                </p>
                <p>
                  Nuestra pasión es llevar la elegancia y la emoción de la música en vivo a los momentos más importantes de tu vida. Desde la majestuosidad de la música clásica hasta las bandas sonoras y versiones pop más actuales.
                </p>
                <p>
                  Trabajamos cada detalle acústico, estético y emocional para ofrecer un sonido cálido, elegante y completamente a medida. Cada evento es único, y nuestra música se adapta a vosotros para crear recuerdos imborrables.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
