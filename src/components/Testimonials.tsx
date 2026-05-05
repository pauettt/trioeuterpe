import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: "María & Carlos",
      date: t('testimonials.date_1'),
      text: t('testimonials.text_1'),
      repertoire: ["Canon en D - Pachelbel", "Ave María - Schubert", "Perfect - Ed Sheeran"]
    },
    {
      id: 2,
      name: "Laura & David",
      date: t('testimonials.date_2'),
      text: t('testimonials.text_2'),
      repertoire: ["Viva la Vida - Coldplay", "Hallelujah - L. Cohen", "BSO La Misión"]
    },
    {
      id: 3,
      name: "Elena & Javier",
      date: t('testimonials.date_3'),
      text: t('testimonials.text_3'),
      repertoire: ["River Flows in You - Yiruma", "A Thousand Years - C. Perri"]
    }
  ];

  return (
    <section className="py-24 bg-surface w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-text mb-4">{t('testimonials.title')}</h2>
          <p className="text-text-muted font-sans max-w-2xl mx-auto text-lg">
            {t('testimonials.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((tItem, index) => (
            <motion.div
              key={tItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              {/* Sombra estilo retro offset */}
              <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-2xl transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
              
              <div className="relative bg-white border border-primary/20 p-8 rounded-2xl h-full flex flex-col transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-4 text-9xl font-serif text-primary/10 select-none pointer-events-none leading-none mt-4">
                  "
                </div>
                <div className="mb-6 flex-grow relative z-10">
                  <div className="text-primary text-3xl font-serif mb-2">"</div>
                  <p className="text-text-muted italic leading-relaxed text-lg mb-6 font-serif">
                    {tItem.text}
                  </p>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-serif text-xl text-text">{tItem.name}</h4>
                  <p className="text-sm text-text-muted mb-4">{tItem.date}</p>
                  
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Piezas Destacadas</p>
                    <ul className="text-sm text-text-muted space-y-1">
                      {tItem.repertoire.map((song, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Music size={12} className="text-primary shrink-0" />
                          {song}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
