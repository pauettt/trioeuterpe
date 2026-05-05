import { motion } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import { useTranslation } from "react-i18next";

export function OtrosEventos() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="w-full">
      {/* Hero Centralizado */}
      <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center pt-20">
        <img 
          src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop" 
          alt="Otros Eventos" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            {t('otros_eventos.hero_title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/90 font-sans text-xl md:text-2xl font-light"
          >
            {t('otros_eventos.hero_subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Intro General */}
      <section className="py-24 bg-background text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif text-text mb-8">{t('otros_eventos.intro_title')}</h2>
            <p className="text-text-muted font-sans text-lg leading-relaxed font-light mb-6">
              {t('otros_eventos.intro_p1')}
            </p>
            <p className="text-text-muted font-sans text-lg leading-relaxed font-light">
              {t('otros_eventos.intro_p2')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden group"
            >
              <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop" alt="Violín clásico" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-serif text-white mb-2">{t('otros_eventos.card_1_title')}</h3>
                <p className="text-white/80 font-sans font-light">{t('otros_eventos.card_1_desc')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square rounded-3xl overflow-hidden group"
            >
              <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop" alt="Cine" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-serif text-white mb-2">{t('otros_eventos.card_2_title')}</h3>
                <p className="text-white/80 font-sans font-light">{t('otros_eventos.card_2_desc')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
    </PageTransition>
  );
}
