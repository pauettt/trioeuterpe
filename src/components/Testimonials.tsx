import { motion } from "framer-motion";
import { Music } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María & Carlos",
    date: "Septiembre 2023",
    text: "Hicieron de nuestra ceremonia algo mágico. La entrada de la novia con el Canon de Pachelbel interpretado por ellos fue espectacular. Absolutamente recomendables.",
    repertoire: ["Canon en D - Pachelbel", "Ave María - Schubert", "Perfect - Ed Sheeran"]
  },
  {
    id: 2,
    name: "Laura & David",
    date: "Mayo 2024",
    text: "Contratamos a Trio Euterpe para el cóctel y fue un acierto total. Tienen un repertorio moderno adaptado a clásico que dejó a todos los invitados maravillados.",
    repertoire: ["Viva la Vida - Coldplay", "Hallelujah - L. Cohen", "BSO La Misión"]
  },
  {
    id: 3,
    name: "Elena & Javier",
    date: "Julio 2023",
    text: "Profesionalidad desde el minuto uno. Nos ayudaron a elegir cada pieza para nuestra boda civil y el resultado fue súper emocionante. Gracias por tanto.",
    repertoire: ["River Flows in You - Yiruma", "A Thousand Years - C. Perri"]
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-surface w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-text mb-4">Ecos y Resonancias</h2>
          <p className="text-text-muted font-sans max-w-2xl mx-auto text-lg">
            Nuestra mayor satisfacción es saber que nuestra interpretación ha dejado una huella imborrable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              {/* Sombra estilo retro offset */}
              <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-2xl transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
              
              <div className="relative bg-white border border-primary/20 p-8 rounded-2xl h-full flex flex-col transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                <div className="mb-6 flex-grow">
                  <div className="text-primary text-4xl font-serif mb-4">"</div>
                  <p className="text-text-muted italic leading-relaxed text-lg mb-6">
                    {t.text}
                  </p>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-serif text-xl text-text">{t.name}</h4>
                  <p className="text-sm text-text-muted mb-4">{t.date}</p>
                  
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Piezas Destacadas</p>
                    <ul className="text-sm text-text-muted space-y-1">
                      {t.repertoire.map((song, i) => (
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
